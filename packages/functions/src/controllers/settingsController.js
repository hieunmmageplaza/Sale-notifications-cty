import {getSettingByShopId} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';
// async function updateSettingByShopId111(ctx) {
//   console.log('test');
//   const collection = db.collection('setting'); // Use db here
//   try {
//     const querySnapshot = await collection.where('shopId', '==', '12').get();
//
//     await Promise.all(
//       querySnapshot.docs.map(async doc => {
//         await doc.ref.update({includedUrls: 'test2'});
//         console.log('Document successfully updated!');
//       })
//     );
//   } catch (error) {
//     console.error('Error updating document: ', error);
//   }
// }

export async function getSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    console.log('shopId ' + shopId);

    const data = await getSettingByShopId(shopId);
    ctx.body = {data, success: true};
  } catch (error) {
    ctx.body = {error: 'Internal server error', success: false};
  }
}
