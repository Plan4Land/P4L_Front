import react, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Common from "../Util/Common";
import { refreshToken } from "../Util/RefreshToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 토큰 검증 상태관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
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
  const logout = () => setUser(null);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
