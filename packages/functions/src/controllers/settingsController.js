import {
  getSettingByShopId,
  setTheDefaultData,
  updateSettingsData
} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function updateSettingByDocId(ctx) {
  const data = ctx.req.body;
  const docId = data.data.id;
  // eslint-disable-next-line no-unused-vars
  const {id, ...dataUpdate} = data.data;
  data.data = {...dataUpdate};
  const res = await updateSettingsData(docId, dataUpdate);
  ctx.body = {success: res.success};
}

export async function getSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const data = await getSettingByShopId(shopId);
    ctx.body = {data, success: true};
  } catch (error) {
    ctx.body = {error: 'Internal server error', success: false};
  }
}

export async function setTheDefaultSettings(ctx) {
  try {
    console.log('testtttt121325');
    const shopId = getCurrentShop(ctx);
    const defaultData = {};
    const data = await setTheDefaultData(shopId, defaultData);
    ctx.body = {data, success: true};
  } catch (error) {
    ctx.body = {error: 'Internal server error', success: false};
  }
}
