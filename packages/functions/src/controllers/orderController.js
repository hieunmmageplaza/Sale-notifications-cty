import {getListOrdersByShopId} from '@functions/repositories/orderRepository';

export async function getListOrders(shopId) {
  const orders = await getListOrdersByShopId(shopId);
  return orders;
}
