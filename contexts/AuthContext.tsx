import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuthToken, getCurrentSession, signOut as apiSignOut } from "@/utils/api";

interface User {
  id: string;
  phone?: string;
  email?: string;
  user_metadata?: {
    name?: string;
    location?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = getAuthToken();
    
    if (!token) {
      // Check if demo mode is active
      const demoUser = localStorage.getItem("prana_demo_user");
      if (demoUser) {
        try {
          setUser(JSON.parse(demoUser));
        } catch (e) {
          localStorage.removeItem("prana_demo_user");
        }
      }
      setLoading(false);
      return;
    }

    try {
      const response = await getCurrentSession();
      if (response.user) {
        setUser(response.user);
      } else {
        // Token is invalid or expired
        apiSignOut();
        setUser(null);
      }
    } catch (error: any) {
      console.error("Auth check failed:", error);
      // Clear invalid token
      apiSignOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    apiSignOut();
    setUser(null);
    // Clear demo user
    localStorage.removeItem("prana_demo_user");
  }

  function setUserWithDemo(user: User | null) {
    setUser(user);
    // If it's a demo user, store it in localStorage
    if (user && user.id === "demo-user-123") {
      localStorage.setItem("prana_demo_user", JSON.stringify(user));
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser: setUserWithDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}