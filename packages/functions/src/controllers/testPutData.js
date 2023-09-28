const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.development.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  const collection = db.collection('setting');
  const snapshot = await collection.where('shopId', '==', '12').get();
  const data = [];
  if (snapshot.empty) {
    console.log('No matching documents.');
    return data;
  }
  snapshot.forEach(doc => {
    data.push({
      id: doc.id,
      ...doc.data()
    });
  });
  // await Promise.all(
  //   snapshot.docs.map(async doc => {
  //     await doc.ref.update({includedUrls: 'test2'});
  //     console.log('Document successfully updated!');
  //   })
  // );
  console.log(data);
  return data;
})();
