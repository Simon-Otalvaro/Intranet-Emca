import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, HeartHandshake } from "lucide-react";
import "./Nosotros.css";

export default function Nosotros() {
  return (
    <div className="nosotros">
      {/* Hero Section */}
      <section className="nosotros-hero">
        <div className="overlay">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            En <strong>EMCA E.S.P</strong> trabajamos con responsabilidad y compromiso
            para garantizar servicios de calidad que contribuyan al bienestar de la comunidad.
          </motion.p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="nosotros-mv">
        <motion.div 
          className="card"
          whileHover={{ scale: 1.05 }}
        >
          <ShieldCheck size={40} color="#B4CC3D" />
          <h2>Misión</h2>
          <p>
           EMPRESAS PÚBLICAS DE CALARCÁ E.S.P. es una empresa industrial y comercial del estado, de orden municipal, con autonomía administrativa y financiera, prestadora de los servicios públicos domiciliarios de acueducto, alcantarillado y aseo en el municipio de Calarcá.
          </p>
        </motion.div>

        <motion.div 
          className="card"
          whileHover={{ scale: 1.05 }}
        >
          <Lightbulb size={40} color="#B4CC3D" />
          <h2>Visión</h2>
          <p>
          En el año 2025 seremos una empresa lider a nivel regional con innovación, eficacia y eficiencia, logrando estandares de cantidad, calidad y continuidad en la prestación de nuestros servicios, generando confianza en la comunidad y partes interesadas a través del cumplimiento de los valores organizacionales.
          </p>
        </motion.div>
      </section>

      {/* Valores */}
      <section className="nosotros-valores">
        <h2>Nuestros Valores</h2>
        <div className="valores-grid">
          {["Honestidad", "Compromiso", "Respeto", "Diligencia", "Justicia", "Confianza"].map((valor, i) => (
            <motion.div 
              key={i} 
              className="valor-item"
              whileHover={{ scale: 1.05 }}
            >
              <HeartHandshake size={24} color="#B4CC3D" />
              <span>{valor}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
