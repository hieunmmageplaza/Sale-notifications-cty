const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.development.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  const notifications = db.collection('notifications').doc('test1');
  const doc = await notifications.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
})();
