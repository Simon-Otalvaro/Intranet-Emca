import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react"; // íconos
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
      if (username === "admin") navigate("/admin");
      if (username === "comunicaciones") navigate("/comunicaciones");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <p className="login-error">{error}</p>}

        <div className="input-group">
          <User className="input-icon" size={18} />
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <Lock className="input-icon" size={18} />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Ingresar</button>
      </form>
    </div>
  );
}
