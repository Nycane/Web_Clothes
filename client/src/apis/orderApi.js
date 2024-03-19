import createAxiosAuth from './axiosAuth';
const END_POINT_ORDER = '/order';
const orderAPi = {
    async addOrder(...arg) {
        const [data, dispatch] = arg;
        const axiosAuth = createAxiosAuth(data, dispatch);
        const url = END_POINT_ORDER + '/add';
        return axiosAuth.post(url, data);
    },
    async createPayment(...arg) {
        const [data, dispatch] = arg;
        const axiosAuth = createAxiosAuth(data, dispatch);
        const url = END_POINT_ORDER + '/create_payment';
        return axiosAuth.post(url, data);
    },
    async getResultPayment(...arg) {
        const [data, dispatch] = arg;
        const axiosAuth = createAxiosAuth(data, dispatch);
        const url = END_POINT_ORDER + `/vnpay_ipn${data.search}`;
        // const url = `/order/vnpay_ipn${data.search}`;
        return axiosAuth.get(url);
    },
    async getOrders(...arg) {
        const [data, dispatch] = arg;
        const axiosAuth = createAxiosAuth(data,dispatch);
        const url = END_POINT_ORDER + `/${data.id}`;
        return axiosAuth.get(url);
    },
    async getOrderDetailById(...arg) {
        const [data, dispatch] = arg;
        const axiosAuth = createAxiosAuth(data, dispatch);
        const url = END_POINT_ORDER + `/detail/${data.orderId}?userId=${data.id}`;
        return axiosAuth.get(url);
    },
};
export default orderAPi;
