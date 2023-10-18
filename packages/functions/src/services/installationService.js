import {getShopByDomain} from '@functions/repositories/shopRepository';
import {initNewShopify, initShopify} from '@functions/services/shopifyService';
import {addNotifications} from '@functions/repositories/notificationRepository';
import {setTheDefaultSettings} from '@functions/controllers/settingsController';

export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shopInfo = await getShopByDomain(shopifyDomain);

    const shopId = shopInfo.id;
    const shopify = initNewShopify({
      accessToken: shopInfo.accessToken,
      shopifyDomain: shopifyDomain
    });

    const listOrders = await shopify.order.list({
      status: 'open',
      limit: 30
    });

    const notifications = await Promise.all(
      listOrders.map(async order => {
        const productInfo = await shopify.product.get(order.line_items[0].product_id);
        return {
          city: order.billing_address.city,
          country: order.billing_address.country,
          firstName: order.billing_address.first_name,
          productId: productInfo.id,
          productImage: productInfo.images[0].src,
          productName: productInfo.title,
          shopId: shopId,
          shopifyDomain: shopifyDomain,
          timestamp: order.updated_at
        };
      })
    );

    await Promise.all([
      // add default setting
      setTheDefaultSettings(shopInfo, ctx),

      // sync notification
      addNotifications(notifications),

      // install webhook
      shopify.webhook.create({
        address: 'https://localhost:3000/webhook/order/new',
        topic: 'orders/create',
        format: 'json'
      }),

      // install ScriptTag
      shopify.scriptTag.create({
        event: 'onload',
        src: 'https://localhost:3000/scripttag/index.min.js'
      })
    ]);
  } catch (e) {
    console.error(e);
  }
}
