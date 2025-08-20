import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Slider from "./components/Slider/Slider"; 
import "./App.css"; 

export default function App() {
  return (
    <>
      <Header />
      <div>
        <hr className="hr-line" />
      </div>
      <Menu /> 
      <div className="hero">
        <h1 className="hero-title">BIENVENIDO A INTRANET DE EMCA E.S.P</h1>
        <p className="hero-subtitle">
          Aquí encontrarás utilidades, información sobre nosotros, eventos y noticias más importantes de la empresa.
        </p>
      </div>
      <Slider />
    </>
  );
}
