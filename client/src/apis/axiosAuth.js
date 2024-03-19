// import axiosClient from './axiosClient';
import axios from 'axios';
import userSlice from '../redux/slice/userSlice';
import jwtDecode from 'jwt-decode';
import { logout } from '../redux/slice/userSlice';
import wishlistSlice from '../redux/slice/wishlistSLice';
const env = process.env.NODE_ENV;
const baseUrl = env === 'development' ? process.env.REACT_APP_API_LOCAL : process.env.REACT_APP_API_URL;
let isRefreshing = false;
let refreshPromise = null;
async function getRefreshToken(dispatch) {
    try {
        const result = await axios.post(
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/user/refreshtoken'
                : `${process.env.REACT_APP_API_URL}/user/refreshtoken`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            },
        );
        return result.data;
    } catch (error) {
        if (error.response.status === 401) {
            alert('Session has expired, please log in again');
            dispatch(logout({ id: null }))
                .unwrap()
                .then(() => {
                    dispatch(wishlistSlice.actions.clearWishlist());
                });
        }
        throw error;
    } finally {
        isRefreshing = false;
    }
}
async function retryRefreshToken(dispatch, id) {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = getRefreshToken(dispatch, id);
    }
    return refreshPromise;
}
function createaAxiosAuth({ accessToken, id }, dispatch) {
    // Trước khi gọi refreshToken
    const axiosAuth = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    axiosAuth.interceptors.request.use(
        async (config) => {
            // Customize config before sending request
            const decode = jwtDecode(accessToken);
            if (decode.exp < Date.now() / 1000) {
                // const newLatestToken = await getRefreshToken(dispatch,id);
                const newLatestToken = await retryRefreshToken(dispatch, id);
                config.headers.Authorization = 'Bearer ' + newLatestToken?.data?.accessToken;
                dispatch(userSlice.actions.refreshToken(newLatestToken));
            } else {
                config.headers.Authorization = 'Bearer ' + accessToken;
            }
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        },
    );
    axiosAuth.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }
            return response;
        },
        (error) => {
            // Do something with response error
            return Promise.reject(error);
        },
    );
    return axiosAuth;
}

export default createaAxiosAuth;
