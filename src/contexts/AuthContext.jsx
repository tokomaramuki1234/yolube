import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// 管理者パスワード（環境変数から取得）
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'default_password';

// セッション有効期限（24時間）
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初回ロード時にセッションチェック
  useEffect(() => {
    checkSession();
  }, []);

  // セッションチェック
  const checkSession = () => {
    try {
      const session = localStorage.getItem('adminSession');
      if (session) {
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();

        // セッションが有効期限内かチェック
        if (sessionData.expiresAt > now) {
          setIsAuthenticated(true);
        } else {
          // 期限切れの場合はセッションを削除
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ログイン処理
  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      const now = new Date().getTime();
      const session = {
        authenticated: true,
        loginTime: now,
        expiresAt: now + SESSION_DURATION
      };

      localStorage.setItem('adminSession', JSON.stringify(session));
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, message: 'パスワードが正しくありません' };
    }
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
