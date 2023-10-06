import Shopify from 'shopify-api-node';
import {getShopById} from '@avada/shopify-auth';

export async function listenNewOrder(ctx) {
  try {
    const shopData = await getShopById(shopId);
    const orderData = ctx.req.body;
    const shopify = new Shopify({
      accessToken: shopData.accessToken,
      shopName: shopData.shopifyDomain
    });

    const notification = await getNotificationItem(shopify, orderData);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
  }
}
