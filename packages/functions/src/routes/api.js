import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';
import * as notificationsController from '@functions/controllers/notificationsController';
import * as settingsController from '@functions/controllers/settingsController';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);
  router.get('/notifications', notificationsController.getListNotifications);
  router.post('/notifications', notificationsController.addNewNotification);
  router.get('/settings', settingsController.getSetting);
  router.put('/settings', settingsController.updateSettingByDocId);
  router.post('/settings', settingsController.setTheDefaultSettings);

  return router;
}
