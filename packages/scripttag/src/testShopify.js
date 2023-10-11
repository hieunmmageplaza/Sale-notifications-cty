const Shopify = require('shopify-api-node');
(async () => {
  const shopify = new Shopify({
    shopName: 'timotranning',
    accessToken: 'shpua_3a5c788abd0f6c3fa322def476d9ec75'
  });
  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);

  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  // });
})();
