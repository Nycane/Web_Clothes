import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../apis/userApi';
import Toast from '../../components/Toastify';
import apiService from '../../utils/apiService';
import { delay } from '../../utils/myUtils';

const initialState = { listProducts: [], isFetch: true, isLoading: false };

const wishlistSlice = createSlice({
    name: 'wishlist',
    reducers: {
        clearWishlist(state, action) {
            state.listProducts = [];
            state.isFetch = true;
        },
    },
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getWishList.fulfilled, (state, action) => {
            state.listProducts = action.payload.data;
            state.isFetch = false;
            state.isLoading = false;
        });
        builder.addCase(removeWishList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeWishList.fulfilled, (state, action) => {
            state.isFetch = true;
        });
        builder.addCase(addWishList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addWishList.fulfilled, (state, action) => {
            state.isFetch = true;
            state.isLoading = false;
        });
        builder.addCase(addWishList.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

const addWishList = createAsyncThunk('wishlist/add', async (data, { dispatch }) => {
    try {
        await delay(500);
        const result = await userApi.addWishlist(data, dispatch).then(() => {
            Toast('success', 'Add Wishlist Success');
        });
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
        await delay(500);
        const result = await userApi.removeWishlist(data, dispatch);
        Toast('success', 'Remove Wishlist Success');
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});
export { addWishList, getWishList, removeWishList };
export default wishlistSlice;
