import { motion } from 'framer-motion';

const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } 
    }
};

export default function Footer({ introDone }) {
    return (
        <footer id="contacto" className="footer">
            <div className="container">
                <motion.div 
                    className="footer-grid"
                    variants={footerVariants}
                    initial="hidden"
                    whileInView={introDone ? "visible" : "hidden"}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="footer-col">
                        <div className="footer-logo-container" style={{ marginBottom: '1.5rem' }}>
                            <img src="/LOGO INMOBILIARIA.png" alt="Inmobiliaria Del Real Logo" style={{ height: '100px', width: 'auto' }} />
                        </div>
                        <p style={{ marginBottom: '2rem' }}>Especialistas en renta, venta y compra de casas, locales y terrenos
                            en Mexicali, B.C. Renta cerca de tu futuro con nosotros.</p>
                        <div className="social-links">
                            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://www.facebook.com/Inmobiliaria.Real.BC" target="_blank" rel="noreferrer" className="social-link"><i
                                    className="fa-brands fa-facebook-f"></i></motion.a>
                            <motion.a whileHover={{ scale: 1.2, rotate: -5 }} href="https://www.instagram.com/inmobiliaria.real.del.baja.25" target="_blank" rel="noreferrer"
                                className="social-link"><i className="fa-brands fa-instagram"></i></motion.a>
                            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://wa.me/5216864680112" target="_blank" rel="noreferrer" className="social-link"><i
                                    className="fa-brands fa-whatsapp"></i></motion.a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h3>Contacto</h3>
                        <p><i className="fa-solid fa-location-dot"></i> Blvd. Lázaro Cárdenas 569, Jardines del Lago, Mexicali
                            B.C. CP 21330</p>
                        <p><i className="fa-solid fa-phone"></i> 686 468 0112</p>
                        <p><i className="fa-solid fa-envelope"></i> claudia.del.real123@gmail.com</p>
                        <p><i className="fa-solid fa-globe"></i> inmobiliariadelreal.com</p>
                    </div>

                    <div className="footer-col">
                        <h3>Horarios de Atención</h3>
                        <p><i className="fa-regular fa-clock"></i> Lunes – Viernes:<br /> 10:00 a.m. – 6:00 p.m.</p>
                        <p><i className="fa-regular fa-clock"></i> Sábado:<br /> 10:00 a.m. – 2:00 p.m.</p>
                        <p><i className="fa-solid fa-door-closed"></i> Domingo:<br /> Cerrado</p>
                    </div>
                </motion.div>

                <motion.div 
                    className="map-container"
                    variants={mapVariants}
                    initial="hidden"
                    whileInView={introDone ? "visible" : "hidden"}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <iframe
                        src="https://maps.google.com/maps?q=Blvd.+L%C3%A1zaro+C%C3%A1rdenas+569,+Jardines+del+Lago,+Mexicali+B.C.&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"></iframe>
                </motion.div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Inmobiliaria Del Real. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
