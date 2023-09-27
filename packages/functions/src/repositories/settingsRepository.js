import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('setting');

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

export async function updateSettingsData() {
  const querySnapshot = await collection.where('shopId', '=', 12).get();
  const updatePromises = [];
  querySnapshot.forEach(doc => {
    // Create an array of update Promises
    updatePromises.push(doc.ref.update({truncateProductName: 100}));
  });

  // Wait for all update Promises to complete
  await Promise.all(updatePromises);
}
