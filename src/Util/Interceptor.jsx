import axios from "axios";
import Common from "./Common";
import { refreshToken } from "./RefreshToken";

const apiClient = axios.create({
  baseURL: "http://localhost:8111",
  headers: {
    "Content-Type": "application/json",
  },
});

// 액세스 토큰 만료기간이 안 됐으면 true, 없거나 지났으면 false
const isAccessTokenValid = () => {
  const tokenData = Common.getAccessToken();
  const tokenExpire = Common.getAccessTokenExpiresIn();

  if (!tokenData || !tokenExpire) {
    return false;
  }

  const currentTime = Date.now();
  return currentTime < tokenExpire;
};

// 로그아웃 처리
const handleLogout = () => {
  Common.setAccessToken("");
  Common.setAccessTokenExpiresIn("");
  Common.setRefreshToken("");
  Common.setRefreshTokenExpiresIn("");
}

apiClient.interceptors.request.use(
  async (config) => {
    if (!isAccessTokenValid()) {
      try {
        const newAccessToken = await refreshToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error("액세스 토큰 갱신 실패.");
        handleLogout();
        return Promise.reject(error);
      }
    } else {
      const accessToken = Common.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;