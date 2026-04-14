import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Protected({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const loc = useLocation();
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  if (admin && !isAdmin()) return <Navigate to="/" replace />;
  return <>{children}</>;
}
