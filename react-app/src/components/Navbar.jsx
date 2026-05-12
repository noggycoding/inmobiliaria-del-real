import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    setActiveSection(section.getAttribute('id'));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container nav-container">
                <a href="#" className="logo">
                    <img src="/LOGO INMOBILIARIA.png" alt="Inmobiliaria Del Real Logo" className="nav-logo-img" />
                </a>

                <button 
                    className="mobile-menu-btn" 
                    id="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </button>

                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-links">
                    <li><a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Inicio</a></li>
                    <li><a href="#nosotros" className={activeSection === 'nosotros' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Nosotros</a></li>
                    <li><a href="#servicios" className={activeSection === 'servicios' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Servicios</a></li>
                    <li><a href="#propiedades" className={activeSection === 'propiedades' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Propiedades</a></li>
                    <li><a href="#testimonios" className={activeSection === 'testimonios' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Testimonios</a></li>
                    <li><a href="#contacto" className="btn btn-gold" style={{ padding: '0.5rem 1.2rem', color: '#fff' }} onClick={() => setIsMobileMenuOpen(false)}>Contáctanos</a></li>
                </ul>
            </div>
        </nav>
    );
}
