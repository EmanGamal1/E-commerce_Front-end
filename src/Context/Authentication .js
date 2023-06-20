import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({});

export const Authentication = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const setAuthUser = useCallback((user) => {
    setUser(user);
    localStorage.setItem("admin-user", JSON.stringify(user));
  }, []);
  const setUserToken = useCallback((token) => {
    setToken(token);
    localStorage.setItem("token", token);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setAuthUser, token, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
