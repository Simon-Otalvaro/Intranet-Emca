import "./Noticias.css";
import { Link } from "react-router-dom";
import { newsData } from "../../Data/NewsData";

export default function Noticias() {
  return (
    <div className="news-container">
      <h1>Sección de Noticias 📰</h1>
        <p className="news-intro">
         Aquí encontrarás las últimas noticias y actualizaciones relevantes para nuestra comunidad,
         mantente informado sobre anuncios y novedades importantes.
        </p>
      <div className="news-grid">
        {newsData.map((item) => (
          <Link key={item.id} to={`/noticias/${item.id}`} className="news-card">
            <img src={item.image} alt={item.title} className="news-img" />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.shortDesc}</p>
              <span className="news-date">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
