import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { setAccessToken as storeSetAccessToken } from "./tokenStore";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (token: string) => {
    setAccessToken(token);
    storeSetAccessToken(token);
    navigate("/admin", { replace: true });
  };

  const logout = () => {
    setAccessToken(null);
    storeSetAccessToken(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
