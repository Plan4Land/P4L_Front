import react, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
  useEffect(() => {
    const validateToken = async () => {
      const valid = isAccessTokenValid();

      if (!valid) {
        try {
          await refreshToken(); // 리프레시 토큰 재발급
          setIsAuthenticated(true);
        } catch (error) {
          console.log("토큰 재발급 실패:", error);
          logout();
          navigate("/login");
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    validateToken();
  }, []);

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
