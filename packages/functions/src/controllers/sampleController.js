import {getCurrentUserShopId} from '@avada/shopify-auth/build/authentication';
import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

export async function exampleAction(ctx) {
  const shopId = getCurrentUserShopId(ctx);
  const shopData = await getShopById(shopId);
  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
  const orders = await shopify.order.list({
    status: 'open',
    limit: 30
  });

  const products = await shopify.product.get(8583537492251);

  ctx.body = {data: {products}, success: true};
}
