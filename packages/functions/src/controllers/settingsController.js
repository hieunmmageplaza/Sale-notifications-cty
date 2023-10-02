import {getSettingByShopId, updateSettingsData} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function updateSettingByShopId(ctx) {
  console.log('--updateSettingByShopId--');
  const data = ctx.Data;
  const shopId = getCurrentShop(ctx);
  // console.log('shopId ' + shopId);
  const res = updateSettingsData(shopId);
}

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
