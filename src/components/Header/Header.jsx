import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <span className="brand">Intranet</span>
        <a href="/">Inicio</a>
        <a href="/nosotros">Nosotros</a>
      </nav>
    </header>
  );
}
