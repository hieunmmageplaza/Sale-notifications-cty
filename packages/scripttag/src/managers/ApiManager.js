import makeRequest from '../helpers/api/makeRequest';
import 'regenerator-runtime/runtime';

export default class ApiManager {
  constructor() {}
  getApiData = async () => {
    const apiUrl =
      'https://localhost:3000/clientApi/notifications?shopifyDomain=timotranning.myshopify.com';
    return await makeRequest({url: apiUrl});
  };
}
