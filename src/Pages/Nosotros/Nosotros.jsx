import "./Nosotros.css";

export default function Nosotros() {
  return (
    <div className="nosotros">
      {/* Hero Section */}
      <section className="nosotros-hero">
        <h1>Nosotros</h1>
        <p>
          En <strong>EMCA E.S.P</strong> trabajamos con responsabilidad y compromiso para 
          garantizar servicios de calidad que contribuyan al bienestar de la comunidad 
          y al desarrollo sostenible de la región.
        </p>
      </section>

      {/* Misión y Visión */}
      <section className="nosotros-mv">
        <div className="card">
          <h2>Misión</h2>
          <p>
            Ofrecer servicios públicos eficientes, sostenibles y de calidad, promoviendo 
            el uso responsable de los recursos en beneficio de la comunidad.
          </p>
        </div>
        <div className="card">
          <h2>Visión</h2>
          <p>
            Ser reconocidos como una empresa líder en gestión responsable, innovación y 
            sostenibilidad, contribuyendo al progreso de nuestra región.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="nosotros-valores">
        <h2>Nuestros Valores</h2>
        <ul>
          <li>✔ Transparencia</li>
          <li>✔ Compromiso</li>
          <li>✔ Responsabilidad social</li>
          <li>✔ Innovación</li>
          <li>✔ Excelencia</li>
        </ul>
      </section>
    </div>
  );
}
