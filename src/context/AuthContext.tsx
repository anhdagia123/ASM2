import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("isAdmin")
  );
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      setIsAuthenticated(true);
      navigate("/admin");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};
