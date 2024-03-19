import createAxiosAuth from './axiosAuth';
import axiosClient from './axiosClient';
const END_POINT_USER = '/user';
const auth = {
    async register(data) {
        const url = END_POINT_USER + '/register';
        return axiosClient.post(url, data);
    },
    async login(data) {
        const url = END_POINT_USER + '/login';
        return axiosClient.post(url, data,{ withCredentials: true });
    },
    async logout(data) {
        const url = END_POINT_USER + `/logout/${data.id}`;
        return axiosClient.delete(url,{ withCredentials: true });
    },
    async changePw(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + `/changepassword`;
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(url, data);
    },
    async updateUser(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + '/update';
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(url, data);
    },
    async commentUser(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + '/comment';
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(url, JSON.stringify(data));
    },
    async getComments(data) {
        const url = END_POINT_USER + `/comment/${data.productId}`;
        return axiosClient.get(url);
    },
    async deleteComment(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + `/comment/delete/${data.commentId}`;
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.delete(url);
    },
    async forgetPassword(data) {
        const url = END_POINT_USER + '/forget-password';
        return axiosClient.post(url, { email: data.email });
    },
    async verifyOtp(data) {
        const url = END_POINT_USER + '/forget-password/verify-otp';
        return axiosClient.post(url, { otp: data.otp ,email:data.email});
    },
    async resetPassword(data) {
        const url = END_POINT_USER + '/forget-password/reset-password';
        return axiosClient.post(url, { password: data.newPw, email: data.email });
    },
    // async sendOtp(data) {
    //     const url = END_POINT_USER + '/forget-password/send-otp';
    //     return axiosClient.post(url, { email: data });
    // },
    async updateAvatar(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + '/updateAvatar';
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(url, { image: data.image, email: data.email });
    },
    async addWishlist(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + '/wishlist';
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(url, { productId: data.productId, userId: data.id });
    },
    async getWishList(...arg) {
        const [data, dispatch] = arg;
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(`/user/getWishlist`, JSON.stringify({ userId: data.id }));
    },
    async removeWishlist(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + '/removeWishlist';
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.post(url, { productId: data.productId, userId: data.id });
    },
    async getUserInfo(...arg) {
        const [data, dispatch] = arg;
        const url = END_POINT_USER + `/getInfo/${data.id}`;
        const axiosAuth = createAxiosAuth(data, dispatch);
        return axiosAuth.get(url);
    },
    async addContact(data){;
        const url = END_POINT_USER + '/contact'
       return axiosClient.post(url,data);
    },
    async loginSocial(data) {
        const url = '/social/loginSocial';
        return axiosClient.post(url, {id: data.userId, verifycationCode: data.verifycationCode},{ withCredentials: true });
    },
};
export default auth;
