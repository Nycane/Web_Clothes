import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../apis/productApi';
import orderApi from '../../apis/orderApi';
import Toast from '../../components/Toastify';
import apiService from '../../utils/apiService';
const initialState = {
    // listOrders: [],
    orders: [],
    orderDetail: [],
    shipping: '',
    info: {},
    isSuccess: false,
    isLoading: true,
};
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResultPayment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getResultPayment.fulfilled, (state, action) => {
            if (action?.payload?.data?.rspCode === '00') {
                state.orderDetail = action.payload.data;
            }
        });
        builder.addCase(getOrders.pending, (state, action) => {
            state.isLoading = true;
            state.orders = action?.payload?.data;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action?.payload?.data;
        });
        builder.addCase(getOrderDetailById.fulfilled, (state, action) => {
            state.orderDetail = action?.payload?.data;
        });
    },
});

const addOrder = createAsyncThunk('order/add', async (data, { dispatch }) => {
    try {
        let result = await orderApi.addOrder(data, dispatch);
        Toast('success', 'Checkout Success');
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});

const createPayment = createAsyncThunk('order/createPayment', async (data, { dispatch }) => {
    try {
        let result = await orderApi.createPayment(data, dispatch);
        if (result?.data?.vnpUrl) {
            window.location.href = result.data.vnpUrl;
        }
    } catch (error) {
        apiService.handleApi(error);
    }
});
const getResultPayment = createAsyncThunk('order/getPayment', async (data, { dispatch }) => {
    try {
        let result = await orderApi.getResultPayment(data, dispatch);
        if (result?.data.rspCode === '00') {
            Toast('success', 'Checkout Success');
        }
        return result;
    } catch (error) {
        apiService.handleApi(error)
    }
});
const getOrders = createAsyncThunk('order/getOrders', async (data, { dispatch }) => {
    let result = await orderApi.getOrders(data, dispatch);
    return result;
});
const getOrderDetailById = createAsyncThunk('order/getOrderDetailById', async (data, { dispatch }) => {
    let result = await orderApi.getOrderDetailById(data, dispatch);
    return result;
});
export { addOrder, createPayment, getResultPayment, getOrders, getOrderDetailById };
export default orderSlice;
