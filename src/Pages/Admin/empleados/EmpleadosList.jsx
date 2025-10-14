import { useEffect, useState } from "react";
import "./Empleados.css";

export default function EmpleadosList() {
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [empleadoActual, setEmpleadoActual] = useState(null);

  const [formEmpleado, setFormEmpleado] = useState({
    nombre: "",
    cedula: "",
    cargo: "",
    area: "",
    fecha_nacimiento: "",
  });

  const API_URL = "http://localhost:3000/empleados";

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async (nombre = "") => {
    try {
      setLoading(true);
      const url = nombre ? `${API_URL}?nombre=${nombre}` : API_URL;
      const res = await fetch(url);
      const data = await res.json();
      setEmpleados(data);
      setError("");
    } catch (err) {
      setError("Error al obtener empleados");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    // Filtrado en frontend
    if (valor.trim() === "") {
      fetchEmpleados();
    } else {
      const filtrados = empleados.filter((emp) =>
        emp.nombre.toLowerCase().includes(valor.toLowerCase())
      );
      setEmpleados(filtrados);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEmpleados(busqueda);
    } catch (err) {
      alert("Error al eliminar empleado");
    }
  };

  const handleAbrirModalNuevo = () => {
    setFormEmpleado({
      nombre: "",
      cedula: "",
      cargo: "",
      area: "",
      fecha_nacimiento: "",
    });
    setEditando(false);
    setShowModal(true);
  };

  const handleAbrirModalEditar = (empleado) => {
    setFormEmpleado({
      nombre: empleado.nombre,
      cedula: empleado.cedula,
      cargo: empleado.cargo,
      area: empleado.area,
      fecha_nacimiento: empleado.fecha_nacimiento.split("T")[0],
    });
    setEmpleadoActual(empleado);
    setEditando(true);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setEmpleadoActual(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const method = editando ? "PUT" : "POST";
      const url = editando
        ? `${API_URL}/${empleadoActual.id}`
        : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEmpleado),
      });

      if (!res.ok)
        throw new Error(editando ? "Error al actualizar" : "Error al crear");

      await fetchEmpleados();
      setShowModal(false);
      setEmpleadoActual(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="empleados-container">
      <h1>Gestión de Empleados:</h1>

      <div className="empleados-controls">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={handleBuscar}
        />
        <button onClick={handleAbrirModalNuevo}>➕ Nuevo Empleado</button>
      </div>

      {loading ? (
        <p>Cargando empleados...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="empleados-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Cédula</th>
              <th>Cargo</th>
              <th>Área</th>
              <th>Fecha Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  No se encontraron empleados.
                </td>
              </tr>
            ) : (
              empleados.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.nombre}</td>
                  <td>{emp.cedula}</td>
                  <td>{emp.cargo}</td>
                  <td>{emp.area}</td>
                  <td>{new Date(emp.fecha_nacimiento).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleAbrirModalEditar(emp)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleEliminar(emp.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editando ? "Editar Empleado" : "Registrar Nuevo Empleado"}</h2>
            <form onSubmit={handleGuardar}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formEmpleado.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cedula"
                placeholder="Cédula"
                value={formEmpleado.cedula}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cargo"
                placeholder="Cargo"
                value={formEmpleado.cargo}
                onChange={handleChange}
              />
              <input
                type="text"
                name="area"
                placeholder="Área"
                value={formEmpleado.area}
                onChange={handleChange}
              />
              <input
                type="date"
                name="fecha_nacimiento"
                value={formEmpleado.fecha_nacimiento}
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button type="submit" className="action-btn">
                  {editando ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" onClick={handleCerrarModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
