import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, HeartHandshake, Users } from "lucide-react";
import "./Nosotros.css";

export default function Nosotros() {
  const valores = ["Honestidad", "Compromiso", "Respeto", "Diligencia", "Justicia", "Confianza"];

  return (
    <div className="nosotros">

      {/* Hero */}
      <section className="nosotros-hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Sobre Nosotros</h1>
          <p>
            En <strong>EMCA E.S.P</strong> trabajamos con responsabilidad y compromiso
            para garantizar servicios de calidad que contribuyan al bienestar de la comunidad.
          </p>
        </motion.div>
      </section>

      {/* Misión y Visión */}
      <section className="nosotros-mv">
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <ShieldCheck size={48} color="#3b82f6" />
          <h2>Misión</h2>
          <p>
            EMPRESAS PÚBLICAS DE CALARCÁ E.S.P. es una empresa industrial y comercial del estado,
            de orden municipal, con autonomía administrativa y financiera, prestadora de los servicios públicos domiciliarios de acueducto, alcantarillado y aseo en el municipio de Calarcá.
          </p>
        </motion.div>

        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <Lightbulb size={48} color="#3b82f6" />
          <h2>Visión</h2>
          <p>
            Aspiramos siempre ser una empresa líder a nivel regional con innovación, eficacia y eficiencia,
            logrando estándares de cantidad, calidad y continuidad en la prestación de nuestros servicios,
            generando confianza en la comunidad y partes interesadas.
          </p>
        </motion.div>
      </section>

      {/* Valores */}
      <section className="nosotros-valores">
        <h2>Nuestros Valores</h2>
        <div className="valores-grid">
          {valores.map((valor, i) => (
            <motion.div
              key={i}
              className="valor-item"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            >
              <HeartHandshake size={28} color="#3b82f6" />
              <span>{valor}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
