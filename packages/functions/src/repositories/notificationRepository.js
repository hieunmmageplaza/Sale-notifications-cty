import {Firestore} from '@google-cloud/firestore';
import {writeBatch, doc} from 'firebase/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

export async function getListNewNotifications() {
  const notifications = await collection.get();
  const data = [];

  notifications.forEach(doc => {
    data.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return data;
}

export async function addNotification(notificationsData) {
  const batch = writeBatch(firestore);
  const newNotificationRef = doc(collection);
  batch.set(newNotificationRef, notificationsData);
  await batch.commit();

  console.log('Notification added:');

  return {success: true};
}

export async function addNotifications(notifications) {
  const batch = firestore.batch();

  notifications.forEach(notification => {
    batch.set(collection.doc(), notification);
  });
  await batch.commit();

  return {success: true};
}

export async function addNotificationWebhook(notifications) {
  await collection.add(notifications);
  return {success: true};
}

export async function getNotificationByDomain(shopifyDomain) {
  const docs = await collection
    .where('shopifyDomain', '==', shopifyDomain)
    .orderBy('timestamp', 'desc')
    .get();
  if (docs.empty) {
    return null;
  }
  const notifications = [];
  docs.forEach(doc => {
    notifications.push(presentDataAndFormatDate(doc));
  });
  return notifications;
}
