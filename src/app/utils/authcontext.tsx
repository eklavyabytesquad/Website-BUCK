import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const BASE_URL = 'https://buckz.onrender.com';

// Define the shape of the user data
interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface InvestorDetails {
  id: number;
  firm_name: string;
  focus_industry: string;
  geo: string;
  stage: string;
  avg_cheque_size: string;
  investor: number;
}

interface AuthContextType {
  userInfo: UserInfo | null;
  investorDetails: InvestorDetails | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  investorDetails: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [investorDetails, setInvestorDetails] = useState<InvestorDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Login request
      const loginResponse = await axios.post(`${BASE_URL}/api/login/`, {
        username,
        password
      });

      // Store tokens
      if (loginResponse.data.access) {
        localStorage.setItem('access_token', loginResponse.data.access);
        
        // Fetch user dashboard data
        const dashboardResponse = await axios.get(`${BASE_URL}/api/userDashboard/`, {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.access}`,
            'Content-Type': 'application/json'
          }
        });

        // Set user and investor details
        setUserInfo(dashboardResponse.data.user_info);
        setInvestorDetails(dashboardResponse.data.investor_details);
        
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    setUserInfo(null);
    setInvestorDetails(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const dashboardResponse = await axios.get(`${BASE_URL}/api/userDashboard/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setUserInfo(dashboardResponse.data.user_info);
        setInvestorDetails(dashboardResponse.data.investor_details);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Context value
  const contextValue = {
    userInfo,
    investorDetails,
    login,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};