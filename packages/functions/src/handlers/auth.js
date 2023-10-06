import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/shopify-auth';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import settingsController, {setTheDefaultSettings} from '@functions/controllers/settingsController';
import {getShopByDomain} from '@functions/repositories/shopRepository';
import {getListOrders} from '@functions/controllers/orderController';
import {addNewNotification} from '@functions/controllers/notificationsController';
import {getProductInfoById} from '@functions/controllers/productController';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterInstall: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shopInfo = await getShopByDomain(shopifyDomain);
        const shopId = shopInfo.id;
        await setTheDefaultSettings(shopInfo, ctx);
        const listOrders = await getListOrders(shopId);
        const notificationsData = await Promise.all(
          listOrders.map(async order => {
            const productInfo = await getProductInfoById(shopId, order.line_items[0].product_id);
            return {
              city: order.billing_address.city,
              country: order.billing_address.country,
              firstName: order.billing_address.first_name,
              productId: productInfo.id,
              productImage: productInfo.images[0].src, // Assuming the product has images
              productName: productInfo.title,
              shopId: shopId,
              shopifyDomain: shopifyDomain
            };
          })
        );
        console.log(notificationsData);
        await addNewNotification(ctx, notificationsData);

        // install webhook
      } catch (e) {
        console.error(e);
      }
    },
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
