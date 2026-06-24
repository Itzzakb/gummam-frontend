import React, { createContext, useContext, useState } from 'react';

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  role?: 'user' | 'agent';
}

interface AuthContextType {
  user: User | null;
  login: (role?: 'user' | 'agent') => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthDialogOpen: boolean;
  authDialogTab: 'user' | 'agent';
  openAuthDialog: (tab?: 'user' | 'agent') => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gummam_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'user' | 'agent'>('user');

  const openAuthDialog = (tab?: 'user' | 'agent') => {
    if (tab) {
      setAuthDialogTab(tab);
    }
    setIsAuthDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  const login = (role?: 'user' | 'agent') => {
    const mockUser: User = {
      name: role === 'agent' ? 'Jane Agent' : 'John Doe',
      email: role === 'agent' ? 'jane.agent@example.com' : 'john.doe@example.com',
      avatarUrl: role === 'agent' ? '/images/agent_avatar.png' : '/images/profile_avatar.png',
      role: role || 'user',
    };
    setUser(mockUser);
    localStorage.setItem('gummam_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gummam_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAuthDialogOpen,
        authDialogTab,
        openAuthDialog,
        closeAuthDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
