import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import modalSlice from './modalSlice';
import cartSlice from './slice/cartSlice';
import userSlice from './slice/userSlice';
import wishlistSlice from './slice/wishlistSLice';
import shopSlice from './slice/shopSlice';
import orderSlice from './slice/orderSlice';
import productSlice from './slice/productSlice';

const saveSubset = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        if (key === 'user') {
            let info = {};

            const { listComments, verifyUser, countView,isLoading, ...otherProps } = inboundState;
            // No save other properties of user to localStroagge , when retrieving user info
            const user = otherProps.info;
            if (user && user.accessToken) {
                info = { id: user.id, accessToken: user.accessToken };
            }
            return { ...otherProps, info };
        } else if (key === 'cart') {
            const { isLoading, ...otherProps } = inboundState;
            return otherProps;
        }

        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => outboundState,
);

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['cart', 'user'],
    transforms: [saveSubset],
};

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    wishlist: wishlistSlice.reducer,
    shop: shopSlice.reducer,
    order: orderSlice.reducer,
    product: productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // modal: modalSlice.reducer,
});
let persistor = persistStore(store);
export { store, persistor };
