import Slider from "../../components/Slider/Slider";

export default function Home() {
  return (
    <div className="hero">
      <h1 className="hero-title">BIENVENIDO A INTRANET DE EMCA E.S.P</h1>
      <p className="hero-subtitle">
        Aquí encontrarás utilidades, información sobre nosotros, eventos y las noticias más importantes de la empresa.
      </p>
      <Slider />
    </div>
  );
}
