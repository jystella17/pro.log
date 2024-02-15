import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { setCookie, getCookie, removeCookie } from "../../cookie/cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchedToken = getCookie("access_token");
    setToken(fetchedToken);
  }, []);

  useEffect(() => {
    // const token = Cookies.get("access_token");

    setIsLoggedIn(!!token);
  }, [token]);

  return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
};
