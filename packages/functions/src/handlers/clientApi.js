import App from 'koa';
import * as errorService from '@functions/services/errorService';
import router from '@functions/routes/webhook';

const api = new App();
api.proxy = true;

api.use(router.allowedMethods());
api.use(router.routes());

api.on('error', errorService.handleError);

export default api;