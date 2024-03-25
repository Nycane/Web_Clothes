import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Toast from '../../components/Toastify/Toastify';
import { delay } from '../../utils/myUtils';
const initialState = { listProducts: [], total: 0,totalDiscount:0, isCoupoun: "",isLoading:false};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            let findProduct = state.listProducts.findIndex((e) => e.id === action.payload.id && e.size === action.payload.size && e.color === action.payload.color);
            if (findProduct !== -1) {
                action.payload.quantity > 1
                    ? (state.listProducts[findProduct].quantity += action.payload.quantity)
                    : (state.listProducts[findProduct].quantity += 1);
            } else {
                state.listProducts.push(action.payload);
            }
            state.total = state.listProducts.reduce((init, e) => {
                return (init +=( e.price_discount>0?e.price_discount:e.price) * e.quantity);
            }, 0);
        },
        remove(state, action) {
            if(action.payload==="reset"){
                state.listProducts.splice(0,state.listProducts.length);
                state.isCoupoun="";
                state.totalDiscount=0;
            }else{
                state.listProducts.splice(action.payload, 1);
            }
            state.total = state.listProducts.reduce((init, e) => {
                return (init +=( e.price_discount>0?e.price_discount:e.price) * e.quantity);
            }, 0);
        },
        update(state, action) {
            if (action.payload.type === 'increment') {
                state.listProducts.find((e) => (e.id === action.payload.id && e.color=== action.payload.color && e.size ===action.payload.size ? e.quantity++ : ''));
            } else {
                state.listProducts.find((e) => (e.id === action.payload.id && e.color=== action.payload.color && e.size ===action.payload.size ? e.quantity-- : ''));
            }
            state.total = state.listProducts.reduce((init, e) => {
                return (init +=( e.price_discount>0?e.price_discount:e.price) * e.quantity);
            }, 0);
        },
        totalDiscount(state,action){
           if(state.isCoupoun){
            state.totalDiscount=state.total -( state.total * 0.1)
           }else{
            state.totalDiscount=0
           }
        },
        setCoupoun(state, action) {
            state.isCoupoun = action.payload;
        },
       
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading= true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
        });
    },
});
const addToCart = createAsyncThunk('cart/addToCart',async(payload,{dispatch})=>{
    await delay(700);
    dispatch(cartSlice.actions.add(payload))
    Toast('success',"Add To Cart Success ")
})

const buyNow = createAsyncThunk('cart/buyNow',async(payload,{dispatch})=>{
    dispatch(cartSlice.actions.add(payload))
})
export {addToCart,buyNow}
export default cartSlice;
