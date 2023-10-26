import ApiManager from './managers/ApiManager';
import 'regenerator-runtime/runtime';
import DisplayManager from './managers/DisplayManager';

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, setting: settings} = await apiManager.getApiData();
  displayManager.initialize({notifications, settings});
})();
