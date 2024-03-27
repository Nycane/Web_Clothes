import axiosClient from './axiosClient';
const END_POINT_PRODUCT = '/product';
const productApi = {
    async getAllProducts() {
        const url = END_POINT_PRODUCT;
        return axiosClient.get(url);
    },
    async getBestSellerProducts() {
        const url = END_POINT_PRODUCT + '/best-seller';
        return axiosClient.get(url);
    },
    async getTrendingProducts() {
        const url = END_POINT_PRODUCT + '/trending';
        return axiosClient.get(url);
    },
    async getRelatedProducts(id) {
        const url = END_POINT_PRODUCT + `/related/${id}`;
        return axiosClient.get(url);
    },
    // getColorProduct
    async getColorProducts(type = null, data = null) {
        let url = END_POINT_PRODUCT + '/color';
        if (type === 'brand') {
            url = END_POINT_PRODUCT + `/color/brand/${data}`;
        }
        if (type === 'category') {
            url = END_POINT_PRODUCT + `/color/category/${data}`;
        }
        return axiosClient.get(url);
    },
    // getsizeProduct
    async getsizeProducts(type = '', data = null) {
        let url = END_POINT_PRODUCT + '/size';
        if (type === 'brand') {
            url = END_POINT_PRODUCT + `/size/brand/${data}`;
        }
        if (type === 'category') {
            url = END_POINT_PRODUCT + `/size/category/${data}`;
        }
        return axiosClient.get(url);
    },
    async filterProduct(query) {
        let url = END_POINT_PRODUCT + `/filter`;
        if (query.sort) {
            url += `?sort=${query.sort}`;
        }
        if (query.selectCategory) {
            url += `&category=${query.selectCategory}`;
        }
        if (query.selectBrand) {
            url += `&brand=${query.selectBrand}`;
        }
        if (query.minPrice|| query.maxPrice) {
            url += `&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`;
        }
        if (query.selectColors.length > 0) {
            url += `&color=${query.selectColors.join(',')}`;
        }
        if (query.selectSizes.length > 0) {
            url += `&size=${query.selectSizes.join(',')}`;
        }
        return axiosClient.get(url);
    },
    async getProductById(id) {
        const url = END_POINT_PRODUCT + `/${id}`;
        return axiosClient.get(url);
    },
    async getProductImageById(id) {
        const url = END_POINT_PRODUCT + `/image/${id}`;
        return axiosClient.get(url);
    },
    async getProductVariantById(id) {
        const url = END_POINT_PRODUCT + `/variant/${id}`;
        return axiosClient.get(url);
    },
    async searchProduct(keyword) {
        const url = END_POINT_PRODUCT + '/search/?q=' + encodeURIComponent(keyword);
        return axiosClient.get(url);
    },
    async getBrandProducts() {
        const url = END_POINT_PRODUCT + '/brand';
        return axiosClient.get(url);
    },
    async getCategoryProducts() {
        const url = END_POINT_PRODUCT + '/category';
        return axiosClient.get(url);
    },
    async getLookBooks() {
        const url = END_POINT_PRODUCT + '/look-book';
        return axiosClient.get(url);
    },
    async getProductPrice(type,data) {
        const url = END_POINT_PRODUCT + `/price`;
        const requestData = {
            type,
            data
        }
        return axiosClient.post(url,requestData);
    },
};
export default productApi;
