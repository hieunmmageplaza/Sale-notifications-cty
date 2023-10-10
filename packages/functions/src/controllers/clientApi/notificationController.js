import {getNotificationByDomain} from '@functions/repositories/notificationRepository';
import {getSettingByShopId} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function list(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationByDomain(shopifyDomain);
    // const setting = await getSettingByShopId(shopId);
    // const maxPopUpDisplay = setting.maxPopsDisplay;
    const timestamp = notifications.timestamp;
    const formatTimeAgo = timestamp => {
      const convertTime = new Date(timestamp);
      const currentDate = new Date();

      const difference = currentDate - convertTime;
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
      }
    };
    notifications.timestamp = formatTimeAgo(notifications.timestamp);

    return (ctx.body = {
      data: notifications
    });
  } catch (e) {
    return (ctx.body = {
      data: [],
      error: e.message
    });
  }
}
