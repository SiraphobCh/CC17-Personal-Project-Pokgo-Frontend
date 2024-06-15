import { createContext, useState } from 'react';
import authApi from '../apis/auth';
import { setAccessToken } from '../utils/local-storage';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>{children}</AuthContext.Provider>
  );
}
