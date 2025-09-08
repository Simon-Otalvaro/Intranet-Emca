import React, { useState, useEffect } from "react";
import "./AdminEventos.css";

const STORAGE_KEY = "intranet_eventos";

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export default function AdminEventos() {
  const [eventos, setEventos] = useState(loadInitial);
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    link: "",
    imagen: "",
    creado: "",
  });

  // Persistir en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
  }, [eventos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, imagen: reader.result }));
    reader.readAsDataURL(file);
  };

  const resetForm = () =>
    setForm({
      id: null,
      titulo: "",
      descripcion: "",
      fechaHora: "",
      lugar: "",
      link: "",
      imagen: "",
      creado: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.descripcion.trim() || !form.fechaHora) {
      alert("Completa los campos obligatorios (Título, descripción y fecha).");
      return;
    }

    if (form.id) {
      // actualizar
      setEventos((prev) => prev.map((ev) => (ev.id === form.id ? { ...form } : ev)));
    } else {
      // crear
      const nuevo = {
        ...form,
        id: Date.now().toString(),
        creado: new Date().toLocaleString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setEventos((prev) =>
        [...prev, nuevo].sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
      );
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const item = eventos.find((ev) => ev.id === id);
    if (!item) return;
    setForm({ ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar este evento?")) return;
    setEventos((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <div className="admin-eventos">
      <h1>Gestión de Eventos</h1>
      <form className="evento-form" onSubmit={handleSubmit}>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título del evento"
          required
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción del evento"
          rows={4}
          required
        />
        <input
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={handleChange}
          required
        />
        <input
          name="lugar"
          value={form.lugar}
          onChange={handleChange}
          placeholder="Lugar del evento"
        />
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link de inscripción (ej: Google Form)"
        />
        <input type="file" accept="image/*" onChange={handleImage} />
        {form.imagen && (
          <img
            src={form.imagen}
            alt="preview"
            style={{ maxWidth: 200, borderRadius: 8, marginTop: 8 }}
          />
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="submit">{form.id ? "Actualizar" : "Crear"}</button>
          <button type="button" onClick={resetForm}>
            Limpiar
          </button>
        </div>
      </form>

      <section className="eventos-lista">
        {eventos.length === 0 ? (
          <p>No hay eventos aún.</p>
        ) : (
          eventos.map((ev) => (
            <article className="evento-card" key={ev.id}>
              {ev.imagen && <img src={ev.imagen} alt={ev.titulo} />}
              <div className="card-body">
                <h3>{ev.titulo}</h3>
                <p className="fecha">
                  📅 {new Date(ev.fechaHora).toLocaleString("es-CO", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
                <p>{ev.descripcion}</p>
                {ev.lugar && <p>📍 <strong>{ev.lugar}</strong></p>}
                {ev.link && (
                  <p>
                    🔗 <a href={ev.link} target="_blank" rel="noreferrer">
                      Inscribirse aquí
                    </a>
                  </p>
                )}
                <div className="acciones">
                  <button onClick={() => handleEdit(ev.id)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(ev.id)}>🗑️ Eliminar</button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
