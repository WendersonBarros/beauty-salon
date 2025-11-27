import { createContext } from "react";

export interface AuthContextType {
  accessToken: string | null;
  login: (t: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
