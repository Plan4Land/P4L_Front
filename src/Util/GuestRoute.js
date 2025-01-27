import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  // 로그인 상태에서 접근하면 메인 페이지로
  if (user) {
    return <Navigate to="/" />;
  }

  // 비로그인 상태라면 자식 컴포넌트(대시보드 등)를 렌더링
  return children;
};

export default GuestRoute;