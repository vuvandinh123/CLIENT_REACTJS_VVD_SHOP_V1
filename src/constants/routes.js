// Site Routers
export const HOME = '/';
export const SEARCH = '/search';
export const PAGE = '/page/:slug';
export const CART = '/cart';
export const BLOG = '/blog';
export const USER = '/user';
export const USER_PURCHASE = '/user/purchase';
export const SHOP = '/shop/:shopId';


export const BLOG_DETAIL = '/blog/:slug';
export const PRODUCT_DETAILS = '/products/:slug';
export const CATEGORIES = '/categories';
export const CATEGORIES_DETAILS = '/categories/:slug';
export const LOGIN = '/auth/login';
export const REGISTER = '/auth/singup';
export const CHECKOUT = '/checkout';
export const FAVOURITE = '/wishlist';
export const VERIFY_EMAIL = '/auth/verify-email';
export const VERIFY_GOOGLE = '/auth/login/google';
export const VERIFY_FACEBOOK = '/auth/login/facebook';
export const FORGOT_PASSWORD = '/auth/forgot-password';
export const CHANGE_PASSWORD = '/auth/change-password';
export const SIGN_UP = '/auth/signup';
// Private router
export const ORDER_DETAILS = '/order-details';
// Admin routes
export const SELLER_DASHBOARD = '/seller';
export const SELLER_LOGIN = '/seller/login';
export const SELLER_REGISTER = '/seller/register-shop';
export const SELLER_REGISTER_SUCCESS = '/seller/register-success';
export const SELLER_PRODUCTS = '/seller/products';
export const SELLER_PRODUCTS_CREATE = '/seller/products/create';
export const SELLER_PRODUCTS_EDIT = '/seller/products/:slug/edit';
export const SELLER_PRODUCTS_SALE = '/seller/sale-products';
export const SELLER_PRODUCTS_SALE_CREATE = '/seller/sale-products/create';
export const SELLER_PRODUCTS_SALE_EDIT = '/seller/sale-products/:id/edit';
export const SELLER_PRODUCTS_SHOW = '/seller/products/:slug';
// inventory
export const SELLER_PRODUCTS_INVENTORY = '/seller/inventory';
export const SELLER_PRODUCTS_OUT_INVENTORY = '/seller/out-inventory';
export const SELLER_PRODUCTS_INVENTORY_CREATE = '/seller/inventory/create';
export const SELLER_PRODUCTS_INVENTORY_STOCK = '/seller/inventory/stocks';
export const SELLER_PROFILE_SHOP = '/seller/settings';
// orders


export const SELLER_NEW_DISCOUNT = '/seller/discounts/create';
export const SELLER_DISCOUNT = '/seller/discounts';
export const SELLER_EDIT_DISCOUNT = '/seller/discounts/:id/edit';
export const SELLER_PRODUCTS_VARIANTS = '/seller/variants';
export const SELLER_IMPORT_PRODUCT = '/seller/import-product';
export const SELLER_IMPORT_PRODUCT_CREATE = '/seller/import-product/create';
export const SELLER_CATEGORIES = '/seller/categories';
export const SELLER_CATEGORIES_CREATE = '/seller/categories/create';
export const SELLER_CATEGORIES_EDIT = '/seller/categories/:slug/edit';
export const SELLER_CATEGORIES_SHOW = '/seller/categories/:id';
export const SELLER_BRANDS = '/seller/brands';
export const SELLER_BRANDS_CREATE = '/seller/brands/create';
export const SELLER_BRANDS_SHOW = '/seller/brands/:id';
export const SELLER_BRANDS_EDIT = '/seller/brands/:id/edit';
export const SELLER_ORDERS = '/seller/orders';
export const SELLER_PAGES = '/seller/pages';
export const SELLER_PAGES_CREATE = '/seller/pages/create';
export const SELLER_MENUS = '/seller/menus';

export const SELLER_MENUS_CREATE = '/seller/menus/create';
export const SELLER_MENUS_EDIT = '/seller/menus/:id/edit';
export const SELLER_MENUS_SHOW = '/seller/menus/:id';
export const SELLER_USERS = '/seller/users';
export const SELLER_USERS_CREATE = '/seller/users/create';
export const SELLER_USERS_EDIT = '/seller/users/:id/edit';
export const SELLER_USERS_SHOW = '/seller/users/:id';
export const SELLER_SETTINGS = '/seller/settings';
export const SELLER_SETTINGS_EDIT = '/seller/settings/:id/edit';
export const SELLER_SETTINGS_SHOW = '/seller/settings/:id';
export const SELLER_SETTINGS_CREATE = '/seller/settings/create';
export const SELLER_SHIPPING = '/seller/shipping';