import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../apis/productApi';
const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        max_price: 10000000,
        min_price: 1000000,
        valuePrice: [1000000, 10000000],
        colors: [],
        sizes: [],
        categories: [],
        brands: [],
        selectSizes: [],
        selectColors: [],
        selectBrand: '',
        selectCategory: '',
        sort: 'Default',
        isLoading: false,
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
        setValuePrice(state, action) {
            state.valuePrice = action.payload;
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
            state.min_price = action.payload[0];
            state.max_price = action.payload[1];
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
            state.min_price = 1000000;
            state.max_price = 10000000;
        },
        clearAll(state, action) {
            state.max_price = 10000000;
            state.min_price = 1000000;
            state.selectColors = [];
            state.selectSizes = [];
        },
        resetDefault(state, action) {
            state.max_price = 10000000;
            state.min_price = 1000000;
            state.selectColors = [];
            state.selectSizes = [];
            state.layout = 4;
            state.pageNumber = 0;
            state.valuePrice = [1000000, 10000000];
            state.selectBrand = '';
            state.selectCategory = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVariantProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getVariantProducts.fulfilled, (state, action) => {
                state.sizes = action.payload.size.data;
                state.colors = action.payload.color.data;
                state.brands = action.payload.brand.data;
                state.categories = action.payload.category.data;
                state.isLoading = false;
            });
        builder
            .addCase(filterProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                console.log("product shop",action.payload.data)
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
        const [color, size, brand, category] = await Promise.all([
            productApi.getColorProducts(propertyFilter, data.brand),
            productApi.getsizeProducts(propertyFilter, data.brand),
            productApi.getBrandProducts(),
            productApi.getCategoryProducts(),
        ]);
        return { size, color, brand, category };
    } else if (propertyFilter === 'category') {
        const [color, size, brand, category] = await Promise.all([
            productApi.getColorProducts(propertyFilter, data.category),
            productApi.getsizeProducts(propertyFilter, data.category),
            productApi.getBrandProducts(),
            productApi.getCategoryProducts(),
        ]);
        return { size, color, brand, category };
    } else {
        const [color, size, brand, category] = await Promise.all([
            productApi.getColorProducts(),
            productApi.getsizeProducts(),
            productApi.getBrandProducts(),
            productApi.getCategoryProducts(),
        ]);
        return {size, color, brand, category };
    }
});

// filterProducts
const filterProducts = createAsyncThunk('shop/filterProducts', async (data, { getState }) => {
    const { shop } = getState();
    const result = await productApi.filterProduct(shop);
    return result;
});
export { filterProducts, getVariantProducts };
export default shopSlice;
