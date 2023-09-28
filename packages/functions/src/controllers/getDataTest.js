

const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.development.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  const collection = db.collection('setting');
  const snapshot = await collection.where('shopId', '==', '12').get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
})();
