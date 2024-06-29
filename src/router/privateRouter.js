import * as ROUTES from '../constants/routes';
import * as PAGE from '../admin/pages/seller'
// import LayoutSeller from '../seller/layouts';
import Admin from '../admin';
export const privateRouter = [
    {
        path: ROUTES.SELLER_DASHBOARD,
        exact: true,
        layout: Admin,
        component: PAGE.Dashboard
    },
    {
        path: ROUTES.SELLER_LOGIN,
        component: PAGE.Login
    },
    {
        path: ROUTES.SELLER_REGISTER,
        component: PAGE.Register
    },
    {
        path: ROUTES.SELLER_REGISTER_SUCCESS,
        component: PAGE.SignupSuccess
    },
    {
        path: ROUTES.SELLER_PRODUCTS,
        layout: Admin,
        component: PAGE.ListProduct
    },
    {
        path: ROUTES.SELLER_PRODUCTS_CREATE,
        layout: Admin,
        component: PAGE.NewProduct
    },
    {
        path: ROUTES.SELLER_PRODUCTS_EDIT,
        layout: Admin,
        component: PAGE.EditProduct
    },
    {
        path: ROUTES.SELLER_PRODUCTS_VARIANTS,
        layout: Admin,
        component: PAGE.ListVariant
    },
    {
        path: ROUTES.SELLER_PRODUCTS_INVENTORY,
        layout: Admin,
        component: PAGE.ListInventory
    },
    {
        path: ROUTES.SELLER_PRODUCTS_INVENTORY_CREATE,
        layout: Admin,
        component: PAGE.NewInventory
    },
    {
        path: ROUTES.SELLER_NEW_DISCOUNT,
        layout: Admin,
        component: PAGE.NewDiscount
    },
    {
        path: ROUTES.SELLER_DISCOUNT,
        layout: Admin,
        component: PAGE.ListDiscount
    },
    {
        path: ROUTES.SELLER_EDIT_DISCOUNT,
        layout: Admin,
        component: PAGE.EditDiscount
    },
    {
        path: ROUTES.SELLER_PRODUCTS_SALE,
        layout: Admin,
        component: PAGE.SaleProduct
    },
    {
        path: ROUTES.SELLER_PRODUCTS_SALE_CREATE,
        layout: Admin,
        component: PAGE.NewSaleProduct
    },
    {
        path: ROUTES.SELLER_PRODUCTS_SALE_EDIT,
        layout: Admin,
        component: PAGE.EditSaleProduct
    },
    
    {
        path: ROUTES.SELLER_PRODUCTS_INVENTORY_STOCK,
        layout: Admin,
        component: PAGE.StockInventory
    },
    {
        path: ROUTES.SELLER_PROFILE_SHOP,
        layout: Admin,
        component: PAGE.ProfileShop
    },
    {
        path: ROUTES.SELLER_PRODUCTS_OUT_INVENTORY,
        layout: Admin,
        component: PAGE.ListOutInevnentory
    },
    {
        path: ROUTES.SELLER_ORDERS,
        layout: Admin,
        component: PAGE.ListOrders
    },
    {
        path: "/seller/users",
        layout: Admin,
        component: PAGE.ListUserFollow
    },
    {
        path: "/seller/chats",
        layout: Admin,
        component: PAGE.ChatsAdmin
    },
    {
        path: "/seller/change-password-shop",
        exact: true,
        component: PAGE.ChangePasswordShop
    },
    // {
    //     path: ROUTES.SELLER_CATEGORIES_CREATE,
    //     exact: true,
    //     component: PAGE.NewCategory
    // },
]
