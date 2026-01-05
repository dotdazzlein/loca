import { createContext, useContext, useEffect, useState, type SetStateAction } from 'react';
import api from '../lib/api';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  image?: string;
  provider?: 'google' | 'email' | 'x' | 'phone';
  createdAt?: string;
  gender: string;
}

interface UserContextType {
  user: User | null;
  setUser: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  signinModal: boolean;
  setSigninModal: React.Dispatch<SetStateAction<boolean>>
  onboarding: boolean;
  setOnboarding: React.Dispatch<SetStateAction<boolean>>;
  editProfile: boolean;
  setEditProfile: React.Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // components states
  const [signinModal, setSigninModal] = useState<boolean>(false)
  const [onboarding, setOnboarding] = useState<boolean>(true)
  const [editProfile, setEditProfile] = useState<boolean>(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/me`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };


  const value: UserContextType = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
    signinModal, setSigninModal,
    onboarding, setOnboarding,
    editProfile, setEditProfile
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

