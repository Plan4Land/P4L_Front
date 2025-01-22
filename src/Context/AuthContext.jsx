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
      localStorage.removeItem("user");
    }
  }, [user]);

  // const login = (userData) => setUser(userData.data);
  const login = (userData) => {
    const { id, nickname, imgPath } = userData.data;
    setUser({ id, nickname, imgPath });
  };
  const logout = () => setUser(null);

  const updateUser = (updatedData) => {
    setUser((pervUser) => ({
      ...pervUser,
      ...updatedData,
    }));
  };

  // 토큰 검증
  const TokenValidator = () => {
    const location = useLocation();

    useEffect(() => {
      const validateToken = async () => {
        // 토큰 검증 건너뛰는 페이지 등록
        const excludedPaths = ['/', '/login', '/signup', '/signup/terms', '/ktxinquiry/**', '/tourlist/**', '/planninglist/**'];

        if (excludedPaths.includes(location.pathname)) {
          return;
        }
  
        const valid = isAccessTokenValid();
  
        if (!valid) {
          try {
            await refreshToken(); // 리프레시 토큰 재발급
            setIsAuthenticated(true);
          } catch (error) {
            console.log("토큰 재발급 실패:", error);
            logout();
          }
        } else {
          setIsAuthenticated(true);
        }
      };
  
      validateToken();
    }, [location]);

    return null;
  };
  

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
