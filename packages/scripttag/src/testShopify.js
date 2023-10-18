const Shopify = require('shopify-api-node');
(async () => {
  const shopify = new Shopify({
    shopName: 'timotranning',
    accessToken: 'shpua_3a5c788abd0f6c3fa322def476d9ec75'
  });
  // const scriptTags = await shopify.scriptTag.list();
  // console.log(scriptTags);

  const listWebhook = await shopify.webhook.list();
  console.log(listWebhook);

  // await shopify.webhook.create({
  //   address: 'https://localhost:3000/webhook/order/new',
  //   format: 'json',
  //   topic: 'orders/create'
  // });
  // webhook.address = 'https://localhost:3000/webhook/order/new';
  // webhook.topic = 'orders/create';
  // webhook.format = 'json';
  // webhook.save({
  //   update: true
  // });

  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/index.min.js'
  // });
})();
