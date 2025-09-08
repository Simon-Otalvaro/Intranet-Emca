import React, { useState, useEffect } from "react";
import "./AdminNoticias.css";

const STORAGE_KEY = "intranet_noticias";

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState(loadInitial);
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    shortDesc: "",
    contenido: "",
    imagen: "",
    fecha: "",
  });

  // Persistir cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));
  }, [noticias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // subir imagen -> base64
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, imagen: reader.result }));
    reader.readAsDataURL(file);
  };

  const resetForm = () =>
    setForm({ id: null, titulo: "", shortDesc: "", contenido: "", imagen: "", fecha: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.contenido.trim()) {
      alert("Completa título y contenido.");
      return;
    }

    if (form.id) {
      // actualizar por id
      setNoticias((prev) => prev.map((n) => (n.id === form.id ? { ...form } : n)));
    } else {
      // crear nuevo
      const nuevo = {
        ...form,
        id: Date.now().toString(),
        fecha: new Date().toLocaleString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        shortDesc: form.shortDesc || form.contenido.substring(0, 120),
      };
      setNoticias((prev) => [nuevo, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const item = noticias.find((n) => n.id === id);
    if (!item) return;
    setForm({ ...item }); // llena el formulario con la noticia
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar esta noticia?")) return;
    setNoticias((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="admin-noticias">
      <h1>Crear, editar o eliminar noticia:</h1>
      <form className="noticia-form" onSubmit={handleSubmit}>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título de la noticia"
        />
        <input
          name="shortDesc"
          value={form.shortDesc}
          onChange={handleChange}
          placeholder="Descripción corta"
        />
        <textarea
          name="contenido"
          value={form.contenido}
          onChange={handleChange}
          placeholder="Contenido de la noticia"
          rows={6}
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
          <button
            type="button"
            onClick={() => {
              resetForm();
            }}
          >
            Limpiar
          </button>
        </div>
      </form>

      <section className="noticias-lista">
        {noticias.length === 0 ? (
          <p>No hay noticias aún.</p>
        ) : (
          noticias.map((n) => (
            <article className="noticia-card" key={n.id}>
              {n.imagen && <img src={n.imagen} alt={n.titulo} />}
              <div className="card-body">
                <h3>{n.titulo}</h3>
                <p className="fecha">{n.fecha}</p>
                <p>{n.shortDesc}</p>
                <div className="acciones">
                  <button onClick={() => handleEdit(n.id)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(n.id)}>🗑️ Eliminar</button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
