import "./AdminDashboard.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Solo Admin debería ver este panel
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, aquí puedes gestionar toda la intranet.</p>
      </header>

      <section className="admin-actions">
        {/* Noticias */}
        <div className="action-card">
          <h2>Noticias</h2>
          <p>Crea, edita y elimina las noticias de la empresa.</p>
          <button
            className="action-btn"
            onClick={() => navigate("/admin/noticias")}
          >
            Gestionar Noticias
          </button>
        </div>

        {/* Empleados */}
        <div className="action-card">
          <h2>Empleados</h2>
          <p>Crea, edita información y elimina empleados de la empresa.</p>
          <button
            className="action-btn"
            onClick={() => navigate("/admin/empleados")}
          >
            Gestionar Empleados
          </button>
        </div>

        {/* Eventos */}
        <div className="action-card">
          <h2>Eventos</h2>
          <p>Administra los eventos de la organización.</p>
          <button
            className="action-btn"
            onClick={() => navigate("/admin/eventos")}
          >
            Gestionar Eventos
          </button>
        </div>
      </section>
    </div>
  );
}
