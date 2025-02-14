import react, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Common from "../Util/Common";
import { refreshToken } from "../Util/RefreshToken";
import axios from "axios";
import AxiosApi from "../Api/AxiosApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 토큰 검증 상태관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [socialToken, setSocialToken] = useState(() => {
    const storedSocialToken = localStorage.getItem("socialToken");
    return storedSocialToken ? JSON.parse(storedSocialToken) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  }, [user]);

  // const login = (userData) => setUser(userData.data);
  const login = (userData) => {
    const { id, nickname, imgPath, role } = userData.data;
    setUser({ id, nickname, imgPath, role });
  };
  const logout = async () => {
    // 로컬 비우기
    setUser(null);
    // 소셜 연결 끊기
    const userInfo = await AxiosApi.memberInfo(user.id);
    if (userInfo.data.sso === "kakao") {
      axios
        .get(`https://kapi.kakao.com/v1/user/unlink`, {
          headers: {
            Authorization: `Bearer ${socialToken.accessToken}`,
          },
          params: {
            target_id_type: "user_id",
            target_id: userInfo.data.socialId,
          },
        })
        .then((response) => {
          console.log("카카오 계정 연결 끊기 성공", response);
        })
        .catch((error) => {
          console.log("카카오 계정 연결 끊기 실패", error);
        });
    } else if (userInfo.data.sso === "google") {
      const accessToken = socialToken.accessToken;
      axios
        .get(`https://oauth2.googleapis.com/revoke?token=${accessToken}`)
        .then((response) => {
          console.log("구글 계정 연결 끊기 성공", response);
        })
        .catch((error) => {
          console.log("구글 계정 연결 끊기 실패", error);
        });
    } else if (userInfo.data.sso === "naver") {
      const accessToken = socialToken.accessToken;
      axios
        .get("https://nid.naver.com/oauth2.0/token", {
          params: {
            access_token: accessToken,
            grant_type: "delete",
          },
        })
        .then((response) => {
          console.log("네이버 계정 연결 끊기 성공", response);
        })
        .catch((error) => {
          console.log("네이버 계정 연결 끊기 실패", error);
        });
    }
  };
  const socialLogin = (token) => {
    const { accessToken, refreshToken } = token.data;
    setSocialToken({ accessToken, refreshToken });
  };

  const updateUser = (updatedData) => {
    setUser((pervUser) => ({
      ...pervUser,
      ...updatedData,
    }));
  };

  // 토큰 검증
  // const TokenValidator = () => {
  //   console.log("TokenValidator 실행");
  //   const location = useLocation();
  //   const [isValidating, setIsValidating] = useState(false);
  //   console.log("locaiton확인:", location);
  //   useEffect(() => {
  //     console.log("TokenValidator useEffect 실행됨");
  //     const validateToken = async () => {
  //       console.log("토큰 검증 시작");
  //       // 토큰 검증 건너뛰는 페이지 등록
  //       const excludedPaths = [/^\/$/, /^\/login$/, /^\/signup$/, /^\/signup\/terms$/, /^\/ktxinquiry\/.*/, /^\/tourlist\/.*/, /^\/planninglist\/.*/];
  //       console.log("1번");
  //       if (excludedPaths.some((regex) => regex.test(location.pathname))) {
  //         console.log("2번");
  //         return;
  //       }

  //       if (isValidating) return;
  //       setIsValidating(true);

  //       const valid = isAccessTokenValid();
  //       try {
  //         if (!valid) {
  //           await refreshToken(); // 리프레시 토큰 재발급
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(true);
  //         }
  //       } catch (error) {
  //         console.log("토큰 재발급 실패:", error);
  //         logout();
  //       } finally {
  //         setIsValidating(false);
  //       }
  //     };

  //     validateToken();
  //   }, [location]);

  //   return null;
  // };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isAccessTokenValid,
        socialToken,
        socialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
