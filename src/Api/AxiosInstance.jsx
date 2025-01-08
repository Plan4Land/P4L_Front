import axios from "axios";
import Common from "../Util/Common"

const AxiosInstance = axios.create({
  baseURL: Common.PLAN_DOMAIN,
});

// 요청 인터셉터 추가
AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Common.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const newToken = await Common.handleUnauthorized();
      if (newToken) {
        // 원래 하고자 했던 요청을 다시 시도
        error.config.headers.Authorization = `Bearer ${Common.getAccessToken()}`;
        return AxiosInstance.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);
export default AxiosInstance;