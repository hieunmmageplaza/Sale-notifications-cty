import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const apiUrl = '';
    const {notifications, settings} = await makeRequest(apiUrl);
    return {notifications, settings};
  };
}
