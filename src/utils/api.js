let host = '192.168.185.2:8088'
let url_base = `http://${host}/shopping`;
let v1 = `${url_base}/api/v1`;

export default {
  BASE: url_base,
  CATEGORY_LIST: `${v1}/catalog/category/condition`,
  CATEGORY_SUMMARY: `${v1}/catalog/category/product/8`,
  CATEGORY_INFO: `${v1}/catalog/product`,
  COMMODITY_INFO: `${v1}/catalog/product/details`,
  COMMODITY_COMMENT_LIST: `${v1}/catalog/product/reviews`,
  COMMODITY_COMMENT_ADD: `${v1}/catalog/product/add/review`,
  COMMODITY_HOT_LIST: `${v1}/catalog/product`,
  CART_LIST: `${v1}/cart`,
  CART_ADD: `${v1}/cart/add`,
  CART_REMOVE: `${v1}/cart/items/remove`,
  CART_REMOVE_ALL: `${v1}/cart/items/removeall`,
  CART_UPDATE: `${v1}/cart/items/update`,
  USER_LOGIN: `${v1}/login`,
}