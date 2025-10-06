import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminEventos.css";

const API_URL = "http://localhost:3000/eventos";

export default function AdminEventos() {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    link: "",
    imagen: "",
  });
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const res = await axios.get(API_URL);
      setEventos(res.data);
    } catch (err) {
      console.error("Error al obtener eventos:", err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagenFile(file);
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imagen: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.titulo.trim() || !form.descripcion.trim() || !form.fechaHora) {
      alert("Completa los campos obligatorios: título, descripción y fecha.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("nombre", form.titulo);
      fd.append("descripcion", form.descripcion);
      fd.append("fechaHora", new Date(form.fechaHora).toISOString());
      if (form.lugar) fd.append("lugar", form.lugar);
      if (form.link) fd.append("link", form.link);
      if (imagenFile) fd.append("imagen", imagenFile);

      if (form.id) {
        // Actualizar evento existente
        await axios.put(`${API_URL}/${form.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Crear nuevo evento
        await axios.post(API_URL, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Evento guardado correctamente.");
      fetchEventos();
      resetForm();
    } catch (err) {
      console.error("Error guardando evento:", err);
      alert("Ocurrió un error al guardar el evento. Revisa la consola.");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      titulo: "",
      descripcion: "",
      fechaHora: "",
      lugar: "",
      link: "",
      imagen: "",
    });
    setImagenFile(null);
  };

  const handleEdit = (ev) => {
    setForm({
      id: ev.id,
      titulo: ev.nombre,
      descripcion: ev.descripcion,
      fechaHora: new Date(ev.fechaHora).toISOString().slice(0, 16),
      lugar: ev.lugar || "",
      link: ev.link || "",
      imagen: ev.imagen
        ? `http://localhost:3000/uploads/events/${ev.imagen}`
        : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este evento?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEventos();
    } catch (err) {
      console.error("Error eliminando evento:", err);
    }
  };

  return (
    <div className="admin-eventos">
      <h2>Crear Evento</h2>

      <form onSubmit={handleSubmit} className="evento-form">
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={form.fechaHora}
          onChange={(e) => setForm({ ...form, fechaHora: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Lugar"
          value={form.lugar}
          onChange={(e) => setForm({ ...form, lugar: e.target.value })}
        />
        <input
          type="url"
          placeholder="Link (opcional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImage} />

        {form.imagen && (
          <img
            src={form.imagen}
            alt="Previsualización"
            style={{ width: 150, borderRadius: 8, marginTop: 8 }}
          />
        )}

        <button type="submit">{form.id ? "Actualizar" : "Crear"} Evento</button>
        {form.id && <button onClick={resetForm}>Cancelar edición</button>}
      </form>

      <h3>Eventos actuales</h3>
      <div className="eventos-lista">
        {eventos.map((ev) => (
          <div key={ev.id} className="evento-card">
            <h4>{ev.nombre}</h4>
            <p>{ev.descripcion}</p>
            <p>
              <b>Fecha:</b>{" "}
              {new Date(ev.fechaHora).toLocaleString("es-CO", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            {ev.imagen && (
              <img
                src={`http://localhost:3000/uploads/events/${ev.imagen}`}
                alt={ev.nombre}
                style={{ width: 200, borderRadius: 8 }}
              />
            )}
            <div className="acciones">
              <button onClick={() => handleEdit(ev)}>Editar</button>
              <button onClick={() => handleDelete(ev.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
