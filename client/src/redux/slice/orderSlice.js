import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from '../../apis/orderApi';
import { delay } from '../../utils/myUtils';
import Toast from '../../components/Toastify';
import apiService from '../../utils/apiService';
const initialState = {
    // listOrders: [],
    orders: [],
    orderDetail: [],
    shipping: '',
    info: {},
    isSuccess: false,
    isLoading: false,
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
                state.isLoading = false;
            }
        });
        builder.addCase(addOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOrders.pending, (state, action) => {
            state.isLoading = true;
            state.orders = action?.payload?.data;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action?.payload?.data;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getOrderDetailById.pending, (state, action) => {
            state.orderDetail = action?.payload?.data;
            state.isLoading = true;
        });
        builder.addCase(getOrderDetailById.fulfilled, (state, action) => {
            state.orderDetail = action?.payload?.data;
            state.isLoading = false;
        });
        // Create Payment
        builder.addCase(createPayment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createPayment.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(createPayment.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

const addOrder = createAsyncThunk('order/add', async (data, { dispatch }) => {
    try {
        await delay(500);
        let result = await orderApi.addOrder(data, dispatch);
        Toast('success', 'Checkout Success');
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});

const createPayment = createAsyncThunk('order/createPayment', async (data, { dispatch }) => {
    try {
        await delay(500);
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
        apiService.handleApi(error);
    }
});
const getOrders = createAsyncThunk('order/getOrders', async (data, { dispatch }) => {
    await delay(500);
    let result = await orderApi.getOrders(data, dispatch);
    return result;
});
const getOrderDetailById = createAsyncThunk('order/getOrderDetailById', async (data, { dispatch }) => {
    await delay(500);
    let result = await orderApi.getOrderDetailById(data, dispatch);
    return result;
});
export { addOrder, createPayment, getOrderDetailById, getOrders, getResultPayment };
export default orderSlice;
