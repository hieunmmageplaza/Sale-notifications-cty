const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.development.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

export async function getListNotifications(ctx) {
  try {
    const notificationsRef = db.collection('notifications');
    const notifications = await notificationsRef.get();
    const data = [];

    notifications.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });

    ctx.body = {data, success: true};
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    ctx.body = {error: 'Internal server error', success: false};
  }
}
