import { useAuth } from '@/hooks/UseAuth'
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
