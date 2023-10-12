import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const apiUrl =
      'https://localhost:3000/clientApi/notifications?shopifyDomain=timotranning.myshopify.com';
    const {notifications, settings} = await makeRequest(apiUrl);
    return {notifications, settings};
  };
}
