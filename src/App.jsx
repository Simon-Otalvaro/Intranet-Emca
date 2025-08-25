import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ComDashboard from "./Pages/Comunicaciones/ComDashboard";
import Menu from "./components/Menu/Menu";
import Home from "./Pages/Home/Home";
import Nosotros from "./Pages/Nosotros/Nosotros";
import Utilidades from "./Pages/Utilidades/Utilidades";
import Eventos from "./Pages/Eventos/Eventos";
import PrivateRoute from "./components/Routes/PrivateRoutes"; 
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <div>
        <hr className="hr-line" />
      </div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/utilidades" element={<Utilidades />} />
        <Route path="/eventos" element={<Eventos />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/comunicaciones"
          element={
            <PrivateRoute>
              <ComDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
