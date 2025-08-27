import { useParams, Link } from "react-router-dom";
import { newsData } from "../../Data/NewsData";
import "./Noticias.css";

export default function NoticiaDetalle() {
  const { id } = useParams();
  const noticia = newsData.find((n) => n.id === parseInt(id));

  if (!noticia) return <p>Noticia no encontrada</p>;

  return (
    <div className="news-detail-container">
      <Link to="/noticias" className="back-link">← Volver</Link>
      <h2>{noticia.title}</h2>
      <img src={noticia.image} alt={noticia.title} className="news-detail-img" />
      <p>{noticia.fullDesc}</p>
    </div>
  );
}
