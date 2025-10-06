// src/components/CumpleanerosModal.jsx
import React from "react";
import "./CumpleanerosModal.css";

export default function CumpleanerosModal({ empleados, onClose }) {
  if (!empleados || empleados.length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>🎂 ¡Hoy celebramos cumpleaños!</h2>
        {empleados.map((emp, i) => (
          <div key={i} className="modal-content">
            <h3>{emp.nombre}</h3>
            <p><strong>{emp.cargo}</strong> - {emp.area}</p>
            <p className="mensaje">{emp.mensaje}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
