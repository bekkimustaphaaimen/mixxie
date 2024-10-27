import { useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  // On component mount, retrieve the token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken + "storedToken");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          // If you're using JWT tokens, you can check expiration
          const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
          if (tokenData.exp * 1000 < Date.now()) {
            logout();
          }
        } catch (error) {
          console.error("Error checking token expiration:", error);
        }
      }
    };

    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

