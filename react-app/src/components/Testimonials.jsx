import { motion } from 'framer-motion';

const leftContentVariants = {
    hidden: { opacity: 0, x: -50, filter: 'blur(5px)' },
    visible: { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

const rightContentVariants = {
    hidden: { opacity: 0, x: 50, filter: 'blur(5px)' },
    visible: { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
    }
};

export default function Testimonials({ introDone }) {
    return (
        <section id="testimonios" className="testimonials section-padding">
            <div className="container">
                <div className="testi-split-container">
                    {/* Left Sticky Column */}
                    <motion.div 
                        className="testi-left sticky-column"
                        variants={leftContentVariants}
                        initial="hidden"
                        whileInView={introDone ? "visible" : "hidden"}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="testi-stars">
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <h2 className="testi-title serif-title">Lo que dicen <br /><span className="text-gold underline-gold">Nuestros Clientes</span></h2>
                        <p className="testi-subtitle">La satisfacción de nuestros clientes es nuestra mejor carta de presentación. Construimos relaciones basadas en confianza, honestidad y resultados.</p>
                        
                        <div className="testi-stats">
                            <div className="stat-box">
                                <h4 className="serif-title text-gold">100+</h4>
                                <p>Clientes felices</p>
                            </div>
                            <div className="stat-box">
                                <h4 className="serif-title text-gold">10+</h4>
                                <p>Años de experiencia</p>
                            </div>
                            <div className="stat-box">
                                <h4 className="serif-title text-gold">5.0</h4>
                                <p>Calificación Google</p>
                            </div>
                        </div>

                        <div className="testi-actions">
                            <a href="#contacto" className="btn btn-outline">VER MÁS RESEÑAS</a>
                            <a href="#contacto" className="btn btn-gold">CONTÁCTANOS</a>
                        </div>
                    </motion.div>

                    {/* Right Scrolling/Stacking Column */}
                    <motion.div 
                        className="testi-right stack-column"
                        variants={rightContentVariants}
                        initial="hidden"
                        whileInView={introDone ? "visible" : "hidden"}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        {/* Review 1 */}
                        <motion.div whileHover={{ scale: 1.02 }} className="testimonial-card sticky-card" style={{ top: '100px' }}>
                            <div className="card-top">
                                <div className="stars">
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                </div>
                                <i className="fa-solid fa-quote-right quote-icon"></i>
                            </div>
                            <p className="testimonial-text">"Excelente lugar para comprar tu casa, muy amables y siempre son claros y muy profesionales. La atención de Claudia fue excepcional en todo el proceso."</p>
                            <div className="testimonial-line"></div>
                            <div className="testimonial-author-box">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Rosa Pérez" />
                                <div className="author-info">
                                    <h4 className="author-name serif-title">Rosa Pérez</h4>
                                    <span className="author-label">CLIENTE SATISFECHA</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Review 2 */}
                        <motion.div whileHover={{ scale: 1.02 }} className="testimonial-card sticky-card" style={{ top: '130px' }}>
                            <div className="card-top">
                                <div className="stars">
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                </div>
                                <i className="fa-solid fa-quote-right quote-icon"></i>
                            </div>
                            <p className="testimonial-text">"Muy bonito lugar. Me atendieron de buena manera al pedir informes de renta de departamentos. Definitivamente la mejor opción en Mexicali."</p>
                            <div className="testimonial-line"></div>
                            <div className="testimonial-author-box">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Christopher Rincón" />
                                <div className="author-info">
                                    <h4 className="author-name serif-title">Christopher Rincón</h4>
                                    <span className="author-label">CLIENTE SATISFECHO</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Review 3 */}
                        <motion.div whileHover={{ scale: 1.02 }} className="testimonial-card sticky-card" style={{ top: '160px' }}>
                            <div className="card-top">
                                <div className="stars">
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                </div>
                                <i className="fa-solid fa-quote-right quote-icon"></i>
                            </div>
                            <p className="testimonial-text">"¡Me encanta! 100% recomendado. El trato es directo, sin letras pequeñas y siempre están disponibles para resolver cualquier duda que tengas durante el trámite."</p>
                            <div className="testimonial-line"></div>
                            <div className="testimonial-author-box">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Fer Miauuu" />
                                <div className="author-info">
                                    <h4 className="author-name serif-title">Fer Miauuu</h4>
                                    <span className="author-label">CLIENTE SATISFECHA</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
