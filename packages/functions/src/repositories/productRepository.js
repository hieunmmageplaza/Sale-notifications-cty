import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

export async function getProductInfo(shopId, productId) {
  const shopData = await getShopById(shopId);
  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
  console.log('getProductInfo  ' + getProductInfo);
  return await shopify.product.get(productId);
}
