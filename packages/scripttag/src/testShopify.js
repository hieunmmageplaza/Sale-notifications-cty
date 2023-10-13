const Shopify = require('shopify-api-node');
(async () => {
  const shopify = new Shopify({
    shopName: 'timotranning',
    accessToken: 'shpua_3a5c788abd0f6c3fa322def476d9ec75'
  });
  // const scriptTags = await shopify.scriptTag.list();
  // console.log(scriptTags);

  // const webhook = new Shopify.rest.Webhook();
  // webhook.address = 'https://localhost:3000/webhook/order/new';
  // webhook.topic = 'orders/create';
  // webhook.format = 'json';
  // webhook.save({
  //   update: true
  // });
  // console.log(webhook);

  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/index.min.js'
  // });
})();
