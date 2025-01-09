import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 로그인 상태라면 자식 컴포넌트(대시보드 등)를 렌더링
  return children;
};

export default ProtectedRoute;