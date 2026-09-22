import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';
import { isAuthenticated } from '@/shared/lib/auth';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to={`${ROUTES.LOGIN}?returnUrl=${location.pathname}`} replace />;
  }

  return <>{children}</>;
}
