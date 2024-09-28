import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
});

// 필요에 따라 인터셉터를 추가할 수 있습니다.
// 예를 들어, 요청 또는 응답을 로깅하거나 오류 처리를 추가하는 등의 작업이 가능합니다.

// 요청 인터셉터 예시
axiosInstance.interceptors.request.use((config) => {
  // 요청 전에 추가적인 설정을 할 수 있습니다.
  return config;
}, (error) => {
  // 요청 에러 처리를 합니다.
  return Promise.reject(error);
});

// 응답 인터셉터 예시
axiosInstance.interceptors.response.use((response) => {
  // 응답 데이터를 가공할 수 있습니다.
  return response;
}, (error) => {
  // 응답 에러 처리를 합니다.
  return Promise.reject(error);
});

export default axiosInstance;
