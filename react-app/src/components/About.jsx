import { motion } from 'framer-motion';

const fadeUpVariant = {
    hidden: { opacity: 0, y: 50, filter: 'blur(5px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

const slideRightVariant = {
    hidden: { opacity: 0, x: -50, filter: 'blur(5px)' },
    visible: { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

export default function About({ introDone }) {
    return (
        <section id="nosotros" className="about section-padding">
            <div className="container">
                <div className="about-grid">
                    {/* Left: Diamond Collage */}
                    <motion.div 
                        className="diamond-collage"
                        variants={slideRightVariant}
                        initial="hidden"
                        whileInView={introDone ? "visible" : "hidden"}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="diamond-grid">
                            <motion.div whileHover={{ scale: 1.05 }} className="diamond-item top-diamond">
                                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Propiedad Premium" />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="diamond-item right-diamond">
                                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Interior Casa" />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="diamond-item left-diamond">
                                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fachada Moderna" />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="diamond-item bottom-diamond">
                                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Residencia de Lujo" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: Content Card */}
                    <motion.div 
                        className="about-card-container"
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView={introDone ? "visible" : "hidden"}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="about-content-card">
                            <span className="subtitle-gold" style={{ marginBottom: '0.5rem', display: 'block', fontSize: '0.8rem' }}>SOBRE NOSOTROS</span>
                            <h2 className="section-title serif-title" style={{ fontSize: '2.8rem', marginBottom: '1rem', textAlign: 'left', left: 0, transform: 'none' }}>
                                Conoce a <span className="text-gold">Del Real</span>
                            </h2>
                            
                            <p className="about-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Somos una agencia inmobiliaria con presencia consolidada en Mexicali, B.C. Claudia Del Real y su equipo te acompañan con honestidad y experiencia desde el primer contacto hasta las llaves en tu mano. Hablamos claro, conocemos el mercado local y respondemos rápido.
                            </p>
                            
                            <ul className="about-checklist">
                                <li><i className="fa-solid fa-check text-gold"></i> Respuesta rápida en menos de 24h</li>
                                <li><i className="fa-solid fa-check text-gold"></i> Sin letras pequeñas en contratos</li>
                                <li><i className="fa-solid fa-check text-gold"></i> Conocimiento profundo de Mexicali</li>
                                <li><i className="fa-solid fa-check text-gold"></i> Trato directo y honesto</li>
                            </ul>

                            <div className="about-author-box">
                                <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Claudia Del Real" />
                                <div className="author-info">
                                    <h4 className="author-name serif-title" style={{ fontSize: '1.1rem', marginBottom: '2px' }}>Claudia Del Real</h4>
                                    <span className="author-label" style={{ fontSize: '0.7rem' }}>ASESORA INMOBILIARIA</span>
                                </div>
                            </div>

                            <motion.a 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }} 
                                href="#contacto" 
                                className="btn btn-gold btn-about-cta"
                            >
                                HABLAR CON CLAUDIA
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
