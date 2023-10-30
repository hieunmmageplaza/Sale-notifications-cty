const Shopify = require('shopify-api-node');
(async () => {
  const shopify = new Shopify({
    shopName: 'timotranning',
    accessToken: 'shpua_848ee829ad5c012a4a16f5051be7e716'
  });
  // const listWebhook = await shopify.webhook.list();
  // console.log(listWebhook);

  await shopify.webhook.create({
    address: 'https://localhost:3000/webhook/order/new',
    topic: 'orders/create',
    format: 'json'
  });
})();
