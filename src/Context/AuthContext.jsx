import react, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);