import Shopify from 'shopify-api-node';

export function initNewShopify({accessToken, shopifyDomain}) {
  return new Shopify({
    accessToken: accessToken,
    shopName: shopifyDomain
  });
}
