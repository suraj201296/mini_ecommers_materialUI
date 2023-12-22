
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const auth = { token: localStorage.getItem('token') ? true : false };
  return auth.token ? (
    <div data-testid="protected-content">
      <Outlet/>
    </div>
  ) : (
    <div data-testid="login-page">
      <Navigate to={'/login'} />
    </div>
  );
}
