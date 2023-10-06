import {getShopByDomain} from '@functions/repositories/shopRepository';
import {getProductInfoById} from '@functions/controllers/productController';
import {initShopify} from '@functions/services/shopifyService';
import {getShopById} from '@avada/shopify-auth';
import {addNotifications} from '@functions/repositories/notificationRepository';

export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shopInfo = await getShopByDomain(shopifyDomain);
    const shopId = shopInfo.id;

    const shopData = await getShopById(shopId);

    // await setTheDefaultSettings(shopInfo, ctx);

    const shopify = initShopify(shopData);

    const listOrders = await shopify.order.list({
      status: 'open',
      limit: 30
    });

    const notifications = await Promise.all(
      listOrders.map(async order => {
        const productInfo = await getProductInfoById(shopId, order.line_items[0].product_id);
        return {
          city: order.billing_address.city,
          country: order.billing_address.country,
          firstName: order.billing_address.first_name,
          productId: productInfo.id,
          productImage: productInfo.images[0].src, // Assuming the product has images
          productName: productInfo.title,
          shopId: shopId,
          shopifyDomain: shopifyDomain
        };
      })
    );

    await addNotifications(notifications);

    // install webhook
  } catch (e) {
    console.error(e);
  }
}
