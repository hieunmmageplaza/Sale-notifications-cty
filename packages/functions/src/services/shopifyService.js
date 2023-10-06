import Shopify from 'shopify-api-node';

export function initShopify(shopData) {
  return new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
}
