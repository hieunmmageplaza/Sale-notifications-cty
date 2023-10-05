import {Firestore} from '@google-cloud/firestore';

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

export async function addNotification() {
  await collection.add({});
  return {success: true};
}
