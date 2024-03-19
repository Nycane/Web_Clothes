// -------------------------------------------------------ROUTES-----------------------------------------------------
export const ROUTES_PATHS = {
    HOME: '/',
    CONTACT: '/contact',
    ABOUT: '/about',
    SHOP: '/shop/*',
    SHOP_BRAND: '/shop/product-brand/:brand',
    SHOP_CATEGORY: '/shop/product-category/:category',
    WISHLIST: '/wishlist',
    CART: '/cart',
    PRODUCT_DETAIL: '/product/:id',
    LOGIN: '/login',
    LOGIN_SOCIAL: 'loginSocial/:id',
    CHECKOUT: '/checkout',
    CHECKOUT_ORDER: '/checkout/order',
    ACCOUNT: '/account/*',
};
export const SHOP_PATHS ={
    SHOP:"/shop",
    SHOP_BRAND: '/product-brand/:brand',
    SHOP_CATEGORY: '/product-category/:category',
}
export const ACCOUNT_PATHS = {
    ACCOUNT: '/account',
    CHANGEPW: '/changepw',
    WISHLIST: '/wishlist',
    ORDER: '/order',
    DETAIL: '/detail',
    LOST_PASSWORD: '/lost-password',
    ORDER_DETAIL: '/order/:id',
};
// ----------------------------------------------------------IMAGE----------------------------------------------------
// SLIDER IMG
export const SLIDER_IMGS = [
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1706675220/image/slider-1_sefmdv.jpg',
        titleSmall: 'get extra 50% off',
        titleLarger: 'uiique fashion designers',
    },
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1706675230/image/slider-2_ur1mtm.jpg',
        titleSmall: 'for online oreder',
        titleLarger: 'luxury design fashion',
    },
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1706675240/image/slider-3_rvldxm.jpg',
        titleSmall: 'sale up to 60% off',
        titleLarger: 'black friday sale',
    },
]; // BRAND
export const BRAND_IMGS = [
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703149396/image/brand-2_ph5vp7.jpg',
    },
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703149421/image/brand-5_kbsr6l.jpg',
    },
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703149403/image/brand-3_jgvcjh.jpg',
    },
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703149412/image/brand-4_g2ys1i.jpg',
    },
    {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703149387/image/brand-1_mwwp16.jpg',
    },
];
// HOME IMAGE
export const HOME_IMG = {
    // BANNER
    BANNER_SALE1: [
        {
            imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703148644/image/banner-53-1_hkwgof.jpg',
            title: 'sale up to 60%',
        },
        {
            imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703148638/image/banner-54-1_halyvb.jpg',
            title: 'sale up to 50%',
        },
        {
            imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703148626/image/banner-55-1_jziowe.jpg',
            title: 'sale up to 40%',
        },
    ],
    // BANNER_CUSTOM
    BANNER_CUSTOM: {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703148791/image/banner-23_nqagru.jpg',
        title: 'News COLLECTION',
        text: '-70%',
    },

    BANNER_SALE2: [
        {
            imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703148710/image/banner-57-1_hil8kq.jpg',
            title: 'EVERYDAY FASHION',
            titleSale: '-60%',
            style: false,
        },
        {
            imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703148710/image/banner-57-1_hil8kq.jpg',
            title: 'NEW COLLECTION',
            titleSale: '-50%',
            style: true,
        },
    ],
};
// ABOUT IMAGE
export const ABOUT_IMG = {
    BANNER_CUSTOM: {
        imgSrc: "https://res.cloudinary.com/djdsp9etg/image/upload/v1708529404/image/banner-52_se0rb6.jpg",
        title: 'summer Collection',
        text: 'Quisque ut leo vel nisl posuere lobortis. Praesent imperdiet nibh at velit elementum, at imperdiet ligula tempus.',
    },
    BANNER: {
        imgSrc: "https://res.cloudinary.com/djdsp9etg/image/upload/v1708529286/image/banner-51_racqzy.jpg"
    },
    BANNER_VIDEO: {
        imgSrc: 'https://res.cloudinary.com/djdsp9etg/image/upload/v1703150612/image/banner-video3_wmmrvs.jpg',
    },
    OUR_TEAM: [
        { imgSrc: "https://res.cloudinary.com/djdsp9etg/image/upload/v1708529205/image/team-4_sjsvy1.jpg"
        },
        { imgSrc: "https://res.cloudinary.com/djdsp9etg/image/upload/v1708529197/image/team-3_lwdmsk.jpg",
    },
        { imgSrc: "https://res.cloudinary.com/djdsp9etg/image/upload/v1708529191/image/team-2_afqnpz.jpg",
    },
        { imgSrc: "https://res.cloudinary.com/djdsp9etg/image/upload/v1708529185/image/team-1_shwofs.jpg",
    },
    ],
};

// eslint-disable-next-line import/no-anonymous-default-export
// export default {
//     SLIDER_IMG,
//     HOME_IMG,
//     ROUTES_PATHS,
//     ACCOUNT_PATHS,
// };
