import React from 'react';
import './Footer.css';
import logo from "../../assets/images/logo-color.png"; 

export default function Footer() {
    const enlacesInstitucionales = [
        { name: "Misión y Visión", url: "/nosotros" },
        { name: "Organigrama", url: "/nosotros" }
    ];

    return (
        <footer className="emca-footer">
            <div className="footer-container">
                
                <div className="footer-section info-principal">
                    <img src={logo} alt="Logo EMCA" className="footer-logo" />
                    <p className="footer-slogan">
                        "Agua y energía, nuestro compromiso social."
                    </p>
                    <p className="footer-address">
                        Carrera 24 No. 39-54, Calarcá, Quindío
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Institucional</h3>
                    <ul className="footer-links">
                        {enlacesInstitucionales.map((link, index) => (
                            <li key={index}>
                                <a href={link.url}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="footer-section contacto">
                    <h3>Contáctanos</h3>
                    <p>
                        📞 Línea de Atención: <a href="tel:+57 (606) 7421114">+57 (606) 7421114</a>
                    </p>
                    
                    <div className="social-link-item">
                        <a href="https://www.facebook.com/emcaesp" target="_blank" rel="noopener noreferrer">
                            <img src="src/assets/images/facebook-icon.png" alt="Facebook" className="social-icon-img" />
                            <span>Facebook</span>
                        </a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} EMCA E.S.P. Todos los derechos reservados.
                </p>
                <p>
                    Sitio web desarrollado por Simón Otalvaro.
                </p>
            </div>
        </footer>
    ); 
}