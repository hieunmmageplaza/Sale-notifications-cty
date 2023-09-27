export async function getSettingByShopId(ctx) {
  const data = ['Title 1', 'Title 2', 'Title 3'].map(title => ({
    id: Math.random(),
    title
  }));
  ctx.body = {data, success: true};
}

export async function updateSettingByShopId(ctx) {

  ctx.body = {data, success: true};
}
