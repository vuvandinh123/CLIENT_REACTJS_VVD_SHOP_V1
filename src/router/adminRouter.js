import * as ROUTES from '../constants/routes';
import * as PAGE from '../admin/pages/admin'
import Admin from '../admin';
export const adminRouter = [
    {
        path: "/admin",
        exact: true,
        layout: Admin,
        component: PAGE.Dashboard
    },
    {
        path: "/admin/products",
        exact: true,
        layout: Admin,
        component: PAGE.ListProduct
    },
    {
        path: "/admin/categories",
        exact: true,
        layout: Admin,
        component: PAGE.ListCategory
    },
    {
        path: "/admin/categories/create",
        exact: true,
        layout: Admin,
        component: PAGE.NewCategory
    },
    {
        path: "/admin/categories/:slug/edit",
        exact: true,
        layout: Admin,
        component: PAGE.EditCategory
    },
    {
        path: "/admin/brands",
        exact: true,
        layout: Admin,
        component: PAGE.ListBrand
    },
    {
        path: "/admin/brands/create",
        exact: true,
        layout: Admin,
        component: PAGE.NewBrand
    },
    {
        path: "/admin/shops",
        exact: true,
        layout: Admin,
        component: PAGE.ListShop
    },
    {
        path: "/admin/shops/:id/edit",
        exact: true,
        layout: Admin,
        component: PAGE.ShowShop
    },
    {
        path: "/admin/orders",
        exact: true,
        layout: Admin,
        component: PAGE.ListOrders
    },
    {
        path: "/admin/orders/:id/show",
        exact: true,
        layout: Admin,
        component: PAGE.ShowOrder
    },
    {
        path: "/admin/users",
        exact: true,
        layout: Admin,
        component: PAGE.ListUser
    },
]
