import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../apis/productApi';
import { getDataInSession, saveDataInSession } from '../../utils/myUtils';
const recentlyViewProducts = JSON.parse(getDataInSession('recentlyViewProduts')) || [];
const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProducts: [],
        listBestSeller: [],
        listTrendings: [],
        listImages: [],
        lookBooks:[],
        listRecentlyViews: recentlyViewProducts,
        productDetail: {},
        isLoading: false,
        isFetch: false,
    },
    reducers: {
        addRecentlyViewProduct(state, action) {
            const productId = parseInt(action.payload);
            let checkExist = state.listRecentlyViews.find((e) => e?.id === productId);
            const product = state.listProducts.find((e) => e.id === productId);
            if (!checkExist) {
                if (product) {
                    state.listRecentlyViews = [product, ...state.listRecentlyViews];
                    if (state.listRecentlyViews.length > 6) {
                        state.listRecentlyViews.pop();
                    }
                    saveDataInSession('recentlyViewProduts', state.listRecentlyViews);
                }
            } else {
                if (product) {
                    let filterProduct = state.listRecentlyViews.filter((e) => e.id !== productId);
                    state.listRecentlyViews = [product, ...filterProduct];
                    saveDataInSession('recentlyViewProduts', state.listRecentlyViews);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductById.pending, (state, action) => {
            state.isLoading = true;
            state.isFetch = true;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.productDetail = action.payload.data;
            state.isLoading = false;
            state.isFetch = true;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.productDetail = {};
            state.isLoading = true;
            state.isFetch = false;
        });
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.listProducts = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getBestSellers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBestSellers.fulfilled, (state, action) => {
            state.listBestSeller = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getTrendings.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTrendings.fulfilled, (state, action) => {
            state.listTrendings = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getRelateds.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getRelateds.fulfilled, (state, action) => {
            state.listRelateds = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getImageById.fulfilled, (state, action) => {
            state.listImages = action.payload.data;
        });
        builder.addCase(getLookBooks.fulfilled, (state, action) => {
            state.lookBooks = action.payload.data;
        });
    },
});

const getProductById = createAsyncThunk('product/getProductById', async (payload) => {
    let result = await productApi.getProductVariantById(payload);
    return result;
});
const getProducts = createAsyncThunk('product/getProducts', async () => {
    let result = await productApi.getAllProducts();
    return result;
});
const getBestSellers = createAsyncThunk('product/getBestSellers', async () => {
    let result = await productApi.getBestSellerProducts();
    return result;
});
const getTrendings = createAsyncThunk('product/getTrendings', async () => {
    let result = await productApi.getTrendingProducts();
    return result;
});
const getRelateds = createAsyncThunk('product/getRelateds', async (payload) => {
    let result = await productApi.getRelatedProducts(payload);
    return result;
});
const getImageById = createAsyncThunk('product/getImageById', async (payload) => {
    let result = await productApi.getProductImageById(payload);
    return result;
});
const getLookBooks = createAsyncThunk('product/getLookBooks',async()=>{
    let result = await productApi.getLookBooks();
    return result
})
export { getProductById, getProducts, getImageById, getBestSellers, getTrendings, getRelateds,getLookBooks };
export default productSlice;
