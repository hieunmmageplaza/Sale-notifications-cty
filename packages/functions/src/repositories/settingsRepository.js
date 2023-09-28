import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('setting');

export async function updateSettingsData(shopId) {
  const res = await collection.doc(id).update();
  return {success: true};
}

export async function getSettingByShopId(shopId) {
  const docs = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (docs.empty) {
    return null;
  }
  const [doc] = docs.docs;
  return presentDataAndFormatDate(doc);
}
