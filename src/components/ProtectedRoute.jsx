// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, role = 'admin' }) {
  const location = useLocation();

  const isLoggedIn =
    role === 'admin'
      ? localStorage.getItem('adminLoggedIn') === 'true'
      : role === 'student'
      ? localStorage.getItem('studentLoggedIn') === 'true'
      : localStorage.getItem('institutionLoggedIn') === 'true';

  // Prevent back/forward after logout
  useEffect(() => {
    if (!isLoggedIn) {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href);
      };
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Navigate
        to={
          role === 'admin'
            ? '/login'
            : role === 'student'
            ? '/student-login'
            : '/institution-login'
        }
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
