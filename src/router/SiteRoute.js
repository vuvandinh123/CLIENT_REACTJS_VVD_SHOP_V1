import * as ROUTES from '../constants/routes';
import NoLayout from '../layouts/NoLayout';
import * as PAGE from '../pages'
import * as PAGE_ADMIN from '../admin/pages/seller'
import Admin from '../admin';
const publicRoute = [
    {
        path: ROUTES.HOME,
        exact: true,
        component: PAGE.HomePage
    },
    {
        path: ROUTES.CATEGORIES,
        exact: true,
        component: PAGE.CategoryPage
    },
    {
        path: ROUTES.CATEGORIES_DETAILS,
        exact: true,
        component: PAGE.Products
    },
    {
        path: ROUTES.SEARCH,
        exact: true,
        component: PAGE.SearchPage
    },
    {
        path: ROUTES.CART,
        exact: true,
        component: PAGE.CartPage
    },
    {
        path: ROUTES.BLOG,
        exact: true,
        component: PAGE.PostPage
    },
    {
        path: ROUTES.BLOG_DETAIL,
        exact: true,
        component: PAGE.PostDetailPage
    },
    {
        path: ROUTES.PRODUCT_DETAILS,
        exact: true,
        component: PAGE.ProductDetail
    },
    {
        path: ROUTES.LOGIN,
        layout: NoLayout,
        exact: true,
        component: PAGE.LoginPage
    },
    {
        path: ROUTES.REGISTER,
        exact: true,
        layout: NoLayout,
        component: PAGE.SingupPage
    },
    {
        path: ROUTES.CHECKOUT,
        exact: true,
        layout: NoLayout,
        component: PAGE.CheckoutPage
    },
    {
        path: ROUTES.ORDER_DETAILS,
        exact: true,
        component: PAGE.OrderDetailPage
    },
    {
        path: ROUTES.FAVOURITE,
        exact: true,
        component: PAGE.FavouritePage
    },
    {
        path: ROUTES.VERIFY_EMAIL,
        exact: true,
        layout: NoLayout,
        component: PAGE.VerifyEmail
    },
    {
        path: ROUTES.VERIFY_GOOGLE,
        exact: true,
        layout: NoLayout,
        component: PAGE.LoginWithGooglePage
    },
    {
        path: ROUTES.FORGOT_PASSWORD,
        exact: true,
        layout: NoLayout,
        component: PAGE.ForgotPassword
    },
    {
        path: ROUTES.CHANGE_PASSWORD,
        exact: true,
        layout: NoLayout,
        component: PAGE.ChangePassword
    },
    {
        path: ROUTES.USER + '/*',
        exact: true,
        component: PAGE.LayoutUser2
    },
    // {
    //     path: ROUTES.USER_PURCHASE,
    //     exact: true,
    //     component: PAGE.UserOrderDetailPage
    // },
    {
        path: ROUTES.SHOP,
        exact: true,
        component: PAGE.ShopPage
    },
    // {
    //     path: "/user/chats",
    //     component: PAGE.ChatPageUser2
    // },
    {
        path: "/admin/login",
        component: PAGE_ADMIN.Login,
        layout: NoLayout,
    },
    // {
    //     path: "/user/change-password",
    //     exact: true,
    //     component: PAGE.ChangePasswordUser
    // },
]

export { publicRoute }