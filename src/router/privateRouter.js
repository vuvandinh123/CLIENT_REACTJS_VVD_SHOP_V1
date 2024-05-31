import * as ROUTES from '../constants/routes';
import * as PAGE from '../admin/pages'
import LayoutAdmin from '../admin/layouts';
export const privateRouter = [
    {
        path: ROUTES.ADMIN_DASHBOARD,
        exact: true,
        layout: LayoutAdmin,
        component: PAGE.Dashboard
    },
    {
        path: ROUTES.ADMIN_LOGIN,
        component: PAGE.Login
    },
    {
        path: ROUTES.ADMIN_REGISTER,
        component: PAGE.Register
    },
    {
        path: ROUTES.ADMIN_REGISTER_SUCCESS,
        component: PAGE.SignupSuccess
    },
    {
        path: ROUTES.ADMIN_PRODUCTS,
        layout: LayoutAdmin,
        component: PAGE.ListProduct
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_CREATE,
        layout: LayoutAdmin,
        component: PAGE.NewProduct
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_EDIT,
        layout: LayoutAdmin,
        component: PAGE.EditProduct
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_VARIANTS,
        layout: LayoutAdmin,
        component: PAGE.ListVariant
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_INVENTORY,
        layout: LayoutAdmin,
        component: PAGE.ListInventory
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_INVENTORY_CREATE,
        layout: LayoutAdmin,
        component: PAGE.NewInventory
    },
    {
        path: ROUTES.ADMIN_NEW_DISCOUNT,
        layout: LayoutAdmin,
        component: PAGE.NewDiscount
    },
    {
        path: ROUTES.ADMIN_DISCOUNT,
        layout: LayoutAdmin,
        component: PAGE.ListDiscount
    },
    {
        path: ROUTES.ADMIN_EDIT_DISCOUNT,
        layout: LayoutAdmin,
        component: PAGE.EditDiscount
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_SALE,
        layout: LayoutAdmin,
        component: PAGE.SaleProduct
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_SALE_CREATE,
        layout: LayoutAdmin,
        component: PAGE.NewSaleProduct
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_SALE_EDIT,
        layout: LayoutAdmin,
        component: PAGE.EditSaleProduct
    },
    {
        path: ROUTES.ADMIN_CATEGORIES,
        layout: LayoutAdmin,
        component: PAGE.ListCategory
    },
    {
        path: ROUTES.ADMIN_CATEGORIES_CREATE,
        layout: LayoutAdmin,
        component: PAGE.NewCategory
    },
    {
        path: ROUTES.ADMIN_CATEGORIES_EDIT,
        layout: LayoutAdmin,
        component: PAGE.EditCategory
    },
    {
        path: ROUTES.ADMIN_PRODUCTS_INVENTORY_STOCK,
        layout: LayoutAdmin,
        component: PAGE.StockInventory
    },
    {
        path: ROUTES.ADMIN_PROFILE_SHOP,
        layout: LayoutAdmin,
        component: PAGE.ProfileShop
    },
    // {
    //     path: ROUTES.ADMIN_CATEGORIES,
    //     exact: true,
    //     component: PAGE.ListCategory
    // },
    // {
    //     path: ROUTES.ADMIN_CATEGORIES_CREATE,
    //     exact: true,
    //     component: PAGE.NewCategory
    // },
]
