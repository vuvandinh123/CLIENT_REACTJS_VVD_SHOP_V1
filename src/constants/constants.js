/**
 * Validate common
 */
export const POST_CHECK_EMAIL_EXITS = "/check-email-exits"
/**
 * AUTH USER
 */

// cart
export const GET_CART = "carts"
// favourite
export const GET_FAVOURITE = "/favourites"
// nations
export const GET_NATIONS = "/nations"
// provinces
export const GET_PROVINCES = "/provinces"
// districts
export const GET_ALL_USER_ADDRESS_ORDER = "/address-user"
// delivery
export const GET_DELIVERY = "/delivery"
// orders
export const POST_ORDER = "/orders"
// user
export const GET_USER = "/user"
// category
export const GET_CATEGORY_CLIENT_SHOP = "/categories/shop"

// -------------
export const POST_LOGIN = "auth/login"
export const POST_LOGIN_SOCIAL = "auth/login-social"
export const POST_SIGNUP = "auth/signup"
export const POST_SEND_EMAIL = "auth/send-email"
export const POST_SEND_EMAIL_FORGET_PASSWORD = "auth/send-email-forget-password"
export const POST_REFRESH_TOKEN = "auth/refresh"
export const POST_VERIFY_FORGET_PASSWORD = "auth/verify-email-forget-password"
export const POST_VERIFY_EMAIL = "auth/verify-email"
export const POST_LOGOUT = "auth/logout"
export const GET_AUTH_USER = "auth/user"
/**
 * AUTH SHOP
 */
export const POST_LOGIN_ADMIN = "auth/login"
export const POST_LOGOUT_ADMIN = "auth/logout"
export const GET_ALL_PRODUCT_BY_SHOP = "/products"
export const GET_ALL_BRAND_BY_CATEGORY_BY_SHOP = "/brands/categories/"
export const POST_UPLOAD_IMAGE = "/uploads/multiple"
export const POST_ADD_PRODUCT = "/products"
export const POST_EDIT_PRODUCT = "/products"
export const POST_ADD_SPEC = "/specs"
export const POST_ADD_INVENTORY_LOGS = "/inventory-logs"
export const PATCH_MOVE_TO_TRASH = "/products/totrash"
export const GET_COUNT_STATUS_PRODUCT = "/products/count-status"
export const GET_COUNT_STATUS_DISCOUNT = "/discount/count-status"
export const PATCH_CHANGE_STATUS_PRODUCT = "/products/change-status"
export const PATCH_DELETE_PRODUCT = "/products/deletes"
export const GET_PRODUCT_BY_ID_BY_SHOP = "/products"
export const GET_IMAGE_BY_ID_PRODUCT_BY_SHOP = "/images"
export const GET_PRODUCT_INVENTORY_BY_SHOP = "/products/inventory"
export const POST_ADD_DISCOUNT_BY_SHOP = "discount"
export const CHANGE_STATUS_DISCOUNT = "discount/change-status"
export const DELETE_DISCOUNT = "discount/del"
// get promotion
export const GET_PROMOTIONS_BY_SHOP = "/promotions";
export const POST_ADD_PROMOTION_BY_SHOP = "/promotions";
export const GET_ALL_PRODUCT_ON_PROMOTION = "/promotions/products";
export const CHANGE_STATUS_PROMOTION = "/promotions/change-status"
export const DELETE_PROMOTION = "/promotions/del"
export const GET_COUNT_STATUS_PROMOTION = "/promotions/count-status"
// categories 
export const GET_ALL_CATEGORY_SELECT_BY_SHOP = "/categories/select"
export const GET_ALL_CATEGORY_BY_SHOP = "/categories"
export const GET_ALL_CATEGORY_STATUS_COUNT_BY_SHOP = "/categories/count-status"
export const GET_ALL_CATEGORY_SELECT_ADMIN = "/categories/select-admin"
export const POST_ADD_CATEGORY_BY_SHOP = "/categories"
export const PUT_UPDATE_CATEGORY_BY_SHOP = "/categories"
export const PATCH_CHANGE_STATUS_CATEGORY_BY_SHOP = "/categories/change-status"
export const DELETE_CATEGORY_BY_SHOP = "/categories/del"
export const GET_CATEGORY_BY_SHOP = "/categories"
export const GET_ALL_CATEGORY_WITH_PARENT_ID = "/categories/with-parent"
// shops profile
export const GET_SHOP_BY_ID_USER_BY_SHOP = "/shops"
export const POST_ADD_SHOP = "auth/add-shop"
export const POST_VERIFY_EMAIL_REGISTER_SHOP = "auth/verify-email-shop"

// order stats
export const GET_ORDER_STATS = "orders/stats"
export const GET_ORDER_ALL = "orders"
// user follow
export const GET_COUNT_USER_FOLLOWS = "follows/stats"
// order
export const PATCH_ORDER_STATUS = "orders/status"
/**
 * GET product
 */
export const GET_PRODUCTS = 'products';
export const GET_PRODUCTS_BY_ID = 'products'; // products/id
export const GET_PRODUCTS_TOP_SELLING = "products/daily-discover";
export const GET_PRODUCTS_SHOP = "products/shop";
export const GET_PRODUCTS_HOT_DEALS = "products/hot_deals";
export const POST_PRODUCT_SEARCH = "products/search/"
/**
 * GET shop
 */
export const GET_SHOP_BY_ID = 'shops';
export const GET_IS_FOLLOW_SHOP = 'shops/is-follow';
export const PATCH_TOGGLE_FOLLOW_SHOP = 'shops/follow';
/**
 * GET discount
 */
export const GET_DISCOUNT_PRODUCT_BY_ID = 'discounts/product';
export const GET_DISCOUNT_TYPE_ALL = 'discounts/type-all';
export const POST_ADD_DISCOUNT = "discounts/add";


/**
 * GET categories
 */
export const GET_CATEGORIES = "categories";
/**
 * GET post
 */
export const GET_POST = "post";