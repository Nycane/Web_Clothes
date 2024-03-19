import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../apis/userApi';
import Toast from '../../components/Toastify';
import apiService from '../../utils/apiService';

const initialState = { listProducts: [],isFetch:true };

const wishlistSlice = createSlice({
    name: 'wishlist',
    reducers: {
        clearWishlist(state, action) {
            state.listProducts = [];
            state.isFetch=true
        },
    },
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getWishList.fulfilled, (state, action) => {
            state.listProducts = action.payload.data;
            state.isFetch=false;
        });
        // builder.addCase(removeWishList.pending,(state,action)=>{
        // })
        builder.addCase(removeWishList.fulfilled, (state, action) => {
            state.isFetch=true
        });
        builder.addCase(addWishList.fulfilled,(state,action)=>{
            state.isFetch=true
        })
    },
});

const addWishList = createAsyncThunk('wishlist/add', async (data, { dispatch }) => {
    try {
        const result = await userApi.addWishlist(data, dispatch);
        Toast('success',"Add Wishlist Success");
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});

const getWishList = createAsyncThunk('wishlist/getWishList', async (data, { dispatch }) => {
    const result = await userApi.getWishList(data, dispatch);
    return result;
});

const removeWishList = createAsyncThunk('wishlist/removeWishList', async (data, { dispatch }) => {
    try {
        const result = await userApi.removeWishlist(data, dispatch);
        dispatch(getWishList())
        Toast('success',"Remove Wishlist Success");
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});
export { addWishList, getWishList, removeWishList };
export default wishlistSlice;
