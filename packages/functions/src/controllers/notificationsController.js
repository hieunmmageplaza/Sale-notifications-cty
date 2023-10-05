import {
  addNotification,
  getListNewNotifications
} from '@functions/repositories/notificationRepository';

export async function getListNotifications(ctx) {
  try {
    const data = await getListNewNotifications();
    ctx.body = {data, success: true};
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    ctx.body = {error: 'Internal server error', success: false};
  }
}

export async function addNewNotification(ctx) {
  console.log('1231');
  await addNotification();
}
