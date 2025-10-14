import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Usuario no logueado → redirige al inicio
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Usuario logueado pero sin rol permitido → redirige al inicio
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Usuario permitido → renderiza el componente
  return children;
}
