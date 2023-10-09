import {getShopByDomain} from '@functions/repositories/shopRepository';
import {initShopify} from '@functions/services/shopifyService';
import {getShopById} from '@avada/shopify-auth';
import {addNotificationWebhook} from '@functions/repositories/notificationRepository';
export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-shopify-Shop-domain');
    const orderData = ctx.req.body;

    const shopInfo = await getShopByDomain(shopifyDomain);
    const shopData = await getShopById(shopInfo.id);
    const shopify = initShopify(shopData);

    const productInfo = await shopify.product.get(orderData.line_items[0].product_id);
    const notifications = {
      city: orderData.billing_address.city,
      country: orderData.billing_address.country,
      firstName: orderData.billing_address.first_name,
      productId: productInfo.id,
      productImage: productInfo.images[0].src,
      productName: productInfo.title,
      shopId: shopInfo.id,
      shopifyDomain: shopifyDomain,
      timestamp: orderData.updated_at
    };
    await addNotificationWebhook(notifications);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
  }
}
