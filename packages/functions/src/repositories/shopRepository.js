import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import presentShop from '@functions/presenters/shopPresenter';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('shops');

/**
 * @param id
 * @returns {Promise<{Shop}>}
 */
export async function getShopById(id) {
  const doc = await collection.doc(id).get();
  return presentDataAndFormatDate(doc, presentShop);
}

export async function getShopByDomain(domain) {
  const docs = await collection
    .where('shopifyDomain', '==', domain)
    .limit(1)
    .get();
  if (docs.empty) {
    return null;
  }
  const [doc] = docs.docs;
  return presentDataAndFormatDate(doc);
}
