import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Home from "./Pages/Home/Home";
import Nosotros from "./Pages/Nosotros/Nosotros";
import Utilidades from "./Pages/Utilidades/Utilidades";
import Eventos from "./Pages/Eventos/Eventos";
import Noticias from "./Pages/Noticias/Noticias";
import NoticiaDetalle from "./Pages/Noticias/NoticiaDetalle";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ComDashboard from "./Pages/Comunicaciones/ComDashboard";
import AdminNoticias from "./Pages/Admin/AdminNoticias";
import AdminEventos from "./Pages/Admin/AdminEventos";
import PrivateRoute from "./components/Routes/PrivateRoutes";
import "./App.css";

export default function App() {
  const [cumpleaneros, setCumpleaneros] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/cumpleaneros/hoy")
      .then((res) => res.json())
      .then((data) => {
        setCumpleaneros(data);

        const hoy = new Date().toISOString().split("T")[0]; 
        const modalFecha = localStorage.getItem("modalFecha");

        // ✅ Mostrar modal solo si hay cumpleañeros y aún no se mostró hoy
        if (data.length > 0 && modalFecha !== hoy) {
          setShowModal(true);
          localStorage.setItem("modalFecha", hoy);
        }

        // ✅ Si no hay cumpleañeros, limpiamos para evitar mostrar "fantasmas"
        if (data.length === 0) {
          localStorage.removeItem("modalFecha");
        }
      })
      .catch((err) => console.error("Error cargando cumpleañeros", err));
  }, []);

  return (
    <>
      <Header />
      <div>
        <hr className="hr-line" />
      </div>
      <Menu />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/utilidades" element={<Utilidades />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<NoticiaDetalle />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/noticias"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminNoticias />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/eventos"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminEventos />
            </PrivateRoute>
          }
        />
        <Route
          path="/comunicaciones"
          element={
            <PrivateRoute allowedRoles={["comunicaciones", "admin"]}>
              <ComDashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* 🎂 Modal de felicitación */}
      {showModal && cumpleaneros.length > 0 && (
        <div className="modal-overlay">
          <div className="modal-content">
            {cumpleaneros.map((emp, idx) => (
              <div key={idx}>
                <h2>🎉 ¡Feliz Cumpleaños!</h2>
                <p><strong>{emp.nombre}</strong></p>
                <p>{emp.cargo} - {emp.area}</p>
                <p>{emp.mensaje}</p>
              </div>
            ))}
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* 🎂 Botón flotante para volver a abrir modal */}
      {cumpleaneros.length > 0 && (
        <button
          className="birthday-btn"
          onClick={() => setShowModal(true)}
        >
          🎂
        </button>
      )}
    </>
  );
}
