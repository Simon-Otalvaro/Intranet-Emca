import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsers = {
      admin: "admin123",
      comunicaciones: "comu123",
    };

    if (validUsers[username] && validUsers[username] === password) {
      setError("");
      if (username === "admin") {
        navigate("/admin");
      } else if (username === "comunicaciones") {
        navigate("/comunicaciones");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Intranet EMCA</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Ingresar
        </button>
      </form>
    </div>
  );
}
