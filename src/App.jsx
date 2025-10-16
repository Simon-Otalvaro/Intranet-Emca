import { useState } from "react";
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
import EmpleadosList from "./Pages/Admin/empleados/EmpleadosList";
import Footer from "./components/Footer/Footer";

import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <div>
        <hr className="hr-line" />
      </div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/utilidades" element={<Utilidades />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<NoticiaDetalle />} />
        <Route path="/admin/empleados" element={<EmpleadosList />} />

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
      <Footer /> 
    </>
  );
}