import axios from "axios";
import Common from "../Util/Common"

const AxiosInstance = axios.create({
  baseURL: Common.PLAN_DOMAIN,
});

// 요청 인터셉터 추가
AxiosInstance.interceptors.request.use(
  async (config) => {
    console.log("요청 인터셉터")
    const accessToken = Common.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log("AxiosInstance 요청 에러: ", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

// 토큰 재발급이 끝난 후 대기 중인 요청 처리
const onRrefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// 실패한 요청 큐에 등록
const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};


// 응답 인터셉터 추가
AxiosInstance.interceptors.response.use(
  (response) => {
    console.log("응답 인터셉터");
    return response;
  },
  async (error) => {
    console.log("AxiosInstance 응답 에러: ", error);

    const originalRequest = error.config;

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await Common.handleUnauthorized();
          isRefreshing = false;
          console.log("뉴 토큰 : ", newToken)
          if (newToken) {
            onRrefreshed(newToken);
            return AxiosInstance.request(originalRequest);
          } else{
            console.error("토큰 재발급 실패, 로그아웃 처리:");
            isRefreshing = false;
            localStorage.clear();
            navigateToLogin();
          }
        } catch (e) {
          console.error("토큰 재발급 실패, 로그아웃 처리:", e);
          isRefreshing = false;
          localStorage.clear();
          navigateToLogin();
          return Promise.reject(e);
        }
      }

      // 재발급 요청중이면 대기
      return new Promise((resolve) => {
        addSubscriber((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(AxiosInstance.request(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);
export default AxiosInstance;

const navigateToLogin = () => {
  window.location.href = "/login";
}