/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import shopSlice from '../../redux/slice/shopSlice';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Category from './components/Category';
import Brand from './components/Brand';
import { SHOP_PATHS } from '../../constants';
import { Route, Routes, useLocation } from 'react-router-dom';

function Shop() {
    const dispatch = useDispatch();
    const location = useLocation()
    useEffect(() => {
        return () => {
            dispatch(shopSlice.actions.resetDefault());
        };
    }, [location.pathname]);
    return (
        <Routes>
            <Route path="/" element={<Layout/>} />
            <Route path={SHOP_PATHS.SHOP_CATEGORY} element={<Category />} />
            <Route path={SHOP_PATHS.SHOP_BRAND} element={<Brand />} />
        </Routes>
    );
}

export default Shop;
