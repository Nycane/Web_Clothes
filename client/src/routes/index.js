import { lazy } from 'react';
import LoginSocial from '../pages/Login/components/LoginSocial';
import { ROUTES_PATHS } from '../constants';

// delay lazy load
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
// lazy with delay
function lazyWithDelay(module,time=500){
    return Promise.all([module,delay(time)])
    .then(([moduleExport])=>{
        return moduleExport;
    })
}
// lazy load
const Home = lazy(() => lazyWithDelay(import('../pages/Home')));
const Contact = lazy(() => lazyWithDelay(import('../pages/Contact')));
const About = lazy(() => lazyWithDelay(import('../pages/About')));
const WishList = lazy(() => lazyWithDelay(import('../pages/WishList')));
const Shop = lazy(() => lazyWithDelay(import('../pages/Shop')));
const Cart = lazy(() => lazyWithDelay(import('../pages/Cart')));
const ProductDetail = lazy(() => lazyWithDelay(import('../pages/ProductDetail')));
const Login = lazy(() => lazyWithDelay(import('../pages/Login')));
const Checkout = lazy(() => lazyWithDelay(import('../pages/Checkout')));
const Order = lazy(() => lazyWithDelay(import('../pages/Order')));
const Account = lazy(() => lazyWithDelay(import('../pages/Account')));

const publicRoutes = [
    {
        path: ROUTES_PATHS.HOME,
        component: <Home />,
        layout: 'DefaultLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.CONTACT,
        component: <Contact />,
        layout: 'HeaderBannerLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.ABOUT,
        component: <About></About>,
        layout: 'HeaderBannerLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.WISHLIST,
        component: <WishList />,
        layout: 'HeaderBannerLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.SHOP,
        component: <Shop />,
        layout: 'HeaderBannerLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.CART,
        component: <Cart />,
        layout: 'HeaderLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.PRODUCT_DETAIL,
        component: <ProductDetail />,
        layout: 'HeaderLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.LOGIN,
        component: <Login />,
        layout: 'HeaderLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.LOGIN_SOCIAL,
        component: <LoginSocial />,
        layout: '',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.CHECKOUT,
        component: <Checkout />,
        layout: 'HeaderLayout',
        isGuard: false,
    },
    {
        path: ROUTES_PATHS.CHECKOUT_ORDER,
        component: <Order />,
        layout: 'HeaderLayout',
        isGuard: true,
    },
    {
        path: ROUTES_PATHS.ACCOUNT,
        component: <Account />,
        layout: 'HeaderBannerLayout',
        isGuard: true,
    },
];
export default publicRoutes;
