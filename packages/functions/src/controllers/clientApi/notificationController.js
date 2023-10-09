import {getNotificationBydomain} from '@functions/repositories/notificationRepository';

export async function list(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    console.log(shopifyDomain);
    console.log('test1234123123');
    // const notifications = await getNotificationBydomain(shopifyDomain);
    return (ctx.body = {
      data: []
    });
  } catch (e) {
    return (ctx.body = {
      data: [],
      error: e.message
    });
  }
}
