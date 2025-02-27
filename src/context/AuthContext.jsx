import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){
      const decoded = jwtDecode(token);
      setUser(decoded);
    } 
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setUser(decoded);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const validateSession = () => {
    const currentTime = Date.now() / 1000;
    if (userData.exp < currentTime) return false;
    else return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, validateSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
