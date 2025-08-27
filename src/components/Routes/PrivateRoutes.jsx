import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    // No hay sesión iniciada
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles y el del usuario no está incluido
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
