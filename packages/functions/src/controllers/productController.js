import {getProductInfo} from '@functions/repositories/productRepository';

export async function getProductInfoById(shopId, productId) {
  console.log('getProductInfoById  ' + productId);
  return await getProductInfo(shopId, productId);
}
