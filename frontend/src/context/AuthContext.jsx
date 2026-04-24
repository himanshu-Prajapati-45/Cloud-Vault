import { createContext, useState, useContext, useEffect } from 'react';
import { loginApi, registerApi, googleAuthApi } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const storedName = localStorage.getItem('user_name') || "User";
<<<<<<< HEAD
      const storedEmail = localStorage.getItem('user_email') || "";
      const storedProvider = localStorage.getItem('auth_provider') || 'email';
      setUser({ email: storedEmail, name: storedName, auth_provider: storedProvider });
=======
      setUser({ email: "user@cloudvault.com", name: storedName });
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    }
  }, [token]);

  const login = async (email, password, name = null) => {
    const data = await loginApi(email, password);
    const userName = name || data.full_name || localStorage.getItem('user_name') || "User";
<<<<<<< HEAD
    const provider = data.auth_provider || 'email';
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_name', userName);
    localStorage.setItem('user_email', email);
    localStorage.setItem('auth_provider', provider);
    setToken(data.access_token);
    setUser({ email, id: "user-id", name: userName, auth_provider: provider });
=======
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_name', userName);
    setToken(data.access_token);
    setUser({ email, id: "user-id", name: userName });
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
  };

  const register = async (name, email, password) => {
    await registerApi(name, email, password);
<<<<<<< HEAD
=======
    // auto login after successful register with the name provided
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    await login(email, password, name);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
<<<<<<< HEAD
    localStorage.removeItem('user_email');
    localStorage.removeItem('auth_provider');
=======
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    setToken(null);
    setUser(null);
  };

  const googleLogin = async (credential) => {
    const data = await googleAuthApi(credential);
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_name', data.full_name || "User");
<<<<<<< HEAD
    localStorage.setItem('user_email', data.email || "");
    localStorage.setItem('auth_provider', 'google');
    setToken(data.access_token);
    setUser({ id: "user-id", name: data.full_name || "User", email: data.email || "", auth_provider: 'google' });
=======
    setToken(data.access_token);
    setUser({ id: "user-id", name: data.full_name || "User" });
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
