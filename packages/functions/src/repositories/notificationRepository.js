import {Firestore} from '@google-cloud/firestore';
import {writeBatch, doc} from 'firebase/firestore';
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
