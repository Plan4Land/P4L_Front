import Common from "./Common";
import axios from "axios";

export const refreshToken = async () => {
  const refreshToken = Common.getRefreshToken();
  const refreshTokenExpire = Common.getRefreshTokenExpiresIn();

  if (!refreshToken || !refreshTokenExpire) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  // 리프레시 토큰 만료 시간 비교
  const isRefreshTokenExpired = Date.now() > refreshTokenExpire;
  if (isRefreshTokenExpired) {
    throw new Error("리프레시 토큰이 만료되었습니다.");
  }

  try {
    // 리프레시 토큰을 이용한 액세스 토큰 재발급 요청
    const response = await axios.post(`${Common.PLAN_DOMAIN}/auth/token/refresh`, {
      refreshToken: Common.getRefreshToken(),
    });

    const newTokenData = response.data;

    // 새로 받은 액세스 토큰 저장 (리프레시 토큰은 그대로 유지)
    Common.setAccessToken(newTokenData.accessToken);
    Common.setAccessTokenExpiresIn(newTokenData.accessTokenExpiresIn);

    return newTokenData;
  } catch (error) {
    console.error("액세스 토큰 재발급 실패:", error);

    if (error.response) {
      console.error("서버 응답:", error.response.data);
    }

    throw error; // 호출한 쪽에서 처리할 수 있도록 에러 던짐
  }
};
