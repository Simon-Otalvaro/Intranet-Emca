import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home";
import Nosotros from "./pages/Nosotros/Nosotros";
import Utilidades from "./pages/Utilidades/Utilidades";
import Eventos from "./pages/Eventos/Eventos";
import "./App.css";

export default function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}
