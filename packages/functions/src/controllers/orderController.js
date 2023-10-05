import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {getListOrdersByShopId} from '@functions/repositories/orderRepository';

export async function getListOrders(ctx, shopId) {
  const orders = await getListOrdersByShopId(shopId);
  ctx.body = {data: {orders}, success: true};
}
