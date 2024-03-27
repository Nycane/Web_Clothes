import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../apis/productApi';
const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        maxPriceDf: 10000000,
        minPriceDf: 0,
        maxPrice: 10000000,
        minPrice: 0,
        valuePrice: [0,10000000],
        colors: [],
        sizes: [],
        categories: [],
        brands: [],
        selectSizes: [],
        selectColors: [],
        selectBrand: '',
        selectCategory: '',
        sort: 'default',
        isLoading: false,
        isPriceUpdate:false,
        pageNumber: 0,
        layout: 4,
    },
    reducers: {
        setLayout(state, action) {
            state.layout = action.payload;
        },
        setPageNumber(state, action) {
            state.pageNumber = action.payload;
        },
        setCategory(state, action) {
            state.selectCategory = action.payload;
        },
        setBrand(state, action) {
            state.selectBrand = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setPrice(state, action) {
            state.valuePrice = action.payload;
            state.minPrice = action.payload[0];
            state.maxPrice = action.payload[1];
        },
        setColor(state, action) {
            const isSelectColors = state.selectColors.includes(action.payload);
            if (!isSelectColors) {
                state.selectColors.push(action.payload);
            } else {
                state.selectColors = state.selectColors.filter((e) => e !== action.payload);
            }
        },
        setSize(state, action) {
            const kq = state.selectSizes.includes(action.payload);
            if (!kq) {
                state.selectSizes.push(action.payload);
            } else {
                state.selectSizes = state.selectSizes.filter((e) => e !== action.payload);
            }
        },
        resetPrice(state, action) {
            state.valuePrice = [state.minPriceDf,state.maxPriceDf]
            state.minPrice = state.minPriceDf;
            state.maxPrice = state.maxPriceDf;
        },
        clearAll(state, action) {
            state.valuePrice = [state.minPriceDf,state.maxPriceDf]
            state.maxPrice = state.maxPriceDf;
            state.minPrice = state.minPriceDf;
            state.selectColors = [];
            state.selectSizes = [];
        },
        resetDefault(state, action) {
            state.valuePrice = [state.minPriceDf,state.maxPriceDf];
            state.maxPrice = state.maxPriceDf;
            state.minPrice = state.minPriceDf;
            state.selectColors = [];
            state.selectSizes = [];
            state.layout = 4;
            state.pageNumber = 0;
            state.selectBrand = '';
            state.selectCategory = '';
            // state.sort = 'default'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVariantProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isPriceUpdate=false
            })
            .addCase(getVariantProducts.fulfilled, (state, action) => {
                console.log('variant,', action);
                state.sizes = action.payload.size.data;
                state.colors = action.payload.color.data;
                state.brands = action.payload.brand.data;
                state.categories = action.payload.category.data;
                const product = action.payload.productPrice.data
                state.valuePrice = [product.minPrice,product.maxPrice];
                state.maxPriceDf = product.maxPrice;
                state.minPriceDf = product.minPrice
                state.maxPrice = product.maxPrice;
                state.minPrice = product.minPrice;
                state.isPriceUpdate=true
                state.isLoading = false;
            });
        builder
            .addCase(filterProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.items = action.payload.data;
                state.isLoading = false;
            });
    },
});

// getVariantProducts
const getVariantProducts = createAsyncThunk('shop/getvariantProducts', async (data = {}) => {
    let result = Object.keys(data);
    const propertyFilter = result[result.length - 1];
    if (propertyFilter === 'brand') {
        const [color, size, productPrice, brand, category] = await Promise.all([
            productApi.getColorProducts(propertyFilter, data.brand),
            productApi.getsizeProducts(propertyFilter, data.brand),
            productApi.getProductPrice(propertyFilter, data.brand),
            productApi.getBrandProducts(),
            productApi.getCategoryProducts(),
        ]);
        return { size, color, productPrice, brand, category };
    } else if (propertyFilter === 'category') {
        const [color, size, productPrice, brand, category] = await Promise.all([
            productApi.getColorProducts(propertyFilter, data.category),
            productApi.getsizeProducts(propertyFilter, data.category),
            productApi.getProductPrice(propertyFilter, data.category),
            productApi.getBrandProducts(),
            productApi.getCategoryProducts(),
        ]);
        return { size, color, productPrice, brand, category };
    } else {
        const [color, size, productPrice, brand, category] = await Promise.all([
            productApi.getColorProducts(),
            productApi.getsizeProducts(),
            productApi.getProductPrice(),
            productApi.getBrandProducts(),
            productApi.getCategoryProducts(),
        ]);
        return { size, color, productPrice, brand, category };
    }
});

// filterProducts
const filterProducts = createAsyncThunk('shop/filterProducts', async (data, { getState }) => {
    const { shop } = getState();
    const result = await productApi.filterProduct(shop);
    return result;
});
export { filterProducts, getVariantProducts};
export default shopSlice;
