import {
  getSettingByShopId,
  setTheDefaultData,
  updateSettingsData
} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';
import {defaultSettings} from '@functions/const/defaultSetting';

export async function updateSettingByDocId(ctx) {
  const data = ctx.req.body;
  const docId = data.data.id;
  console.log(JSON.stringify(data.data, null, 2));
  const {id, ...dataUpdate} = data.data;
  data.data = {...dataUpdate};
  const res = await updateSettingsData(docId, dataUpdate);

  ctx.body = {success: res.success};
}

export async function getSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    console.log('++++++' + shopId);

    const data = await getSettingByShopId(shopId);
    ctx.body = {data, success: true};
  } catch (error) {
    ctx.body = {error: 'Internal server error', success: false};
  }
}

export async function setTheDefaultSettings(shopInfo) {
  try {
    const shopId = shopInfo.id;
    const defaultData = {...defaultSettings, shopId: shopId};
    await setTheDefaultData(defaultData);
    console.log('setTheDefaultData done');
  } catch (error) {
    error.log(error.message);
  }
}
