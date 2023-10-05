import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

export async function getListOrdersByShopId(ctx, shopId) {
  const shopData = await getShopById(shopId);
  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
  const orders = await shopify.order.list({
    status: 'open',
    limit: 30
  });

  return orders;
}
