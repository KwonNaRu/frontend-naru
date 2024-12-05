import axios from 'axios'
import { Store } from '@reduxjs/toolkit'

let store: Store | null = null;

export const injectStore = (_store: Store) => {
    store = _store;
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키를 포함해 요청을 보냄
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        (store as Store).dispatch({ type: 'common/setIsLoading', payload: false });
        return response
    },
    (error) => {
        // if (error.response.status === 401) {}
        (store as Store).dispatch({ type: 'common/setIsLoading', payload: false });
        return Promise.reject(error);
    }
)

export default axiosInstance;