import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(5px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: "easeOut" } 
    }
};

export default function Properties({ introDone }) {
    return (
        <section id="propiedades" className="properties section-padding">
            <div className="container">
                <motion.div 
                    className="props-header text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="props-pretitle"><span className="line"></span> PROPIEDADES <span className="line"></span></span>
                    <h2 className="props-title serif-title">Dest<span className="text-gold">acadas</span></h2>
                    <p className="props-subtitle">Explora algunas de nuestras mejores propiedades disponibles actualmente en el mercado.</p>
                </motion.div>

                <motion.div 
                    className="properties-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView={introDone ? "visible" : "hidden"}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    {/* Property 1 */}
                    <motion.div variants={cardVariants} className="property-card">
                        <div className="property-img-wrapper">
                            <span className="property-badge">EN VENTA</span>
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                                alt="Casa Residencial Moderna" />
                        </div>
                        <div className="property-details">
                            <h3 className="property-title">Residencia de Lujo San Pedro</h3>
                            <p className="property-location"><i className="fa-solid fa-location-dot"></i> San Pedro Residencial, Mexicali</p>
                            <div className="property-line"></div>
                            <div className="property-features">
                                <span className="prop-feature"><i className="fa-solid fa-bed"></i> 4 Hab</span>
                                <span className="prop-feature"><i className="fa-solid fa-bath"></i> 3 Baños</span>
                                <span className="prop-feature"><i className="fa-solid fa-ruler-combined"></i> 320 m²</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Property 2 */}
                    <motion.div variants={cardVariants} className="property-card">
                        <div className="property-img-wrapper">
                            <span className="property-badge badge-dark">EN RENTA</span>
                            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                                alt="Departamento Moderno" />
                        </div>
                        <div className="property-details">
                            <h3 className="property-title">Departamento UABC Central</h3>
                            <p className="property-location"><i className="fa-solid fa-location-dot"></i> Zona UABC Central, Mexicali</p>
                            <div className="property-line"></div>
                            <div className="property-features">
                                <span className="prop-feature"><i className="fa-solid fa-bed"></i> 2 Hab</span>
                                <span className="prop-feature"><i className="fa-solid fa-bath"></i> 1 Baño</span>
                                <span className="prop-feature"><i className="fa-solid fa-car"></i> 1 Estac.</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Property 3 */}
                    <motion.div variants={cardVariants} className="property-card">
                        <div className="property-img-wrapper">
                            <span className="property-badge">EN VENTA</span>
                            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80"
                                alt="Local Comercial" />
                        </div>
                        <div className="property-details">
                            <h3 className="property-title">Local Comercial Blvd. L.C.</h3>
                            <p className="property-location"><i className="fa-solid fa-location-dot"></i> Blvd. Lázaro Cárdenas, Mexicali</p>
                            <div className="property-line"></div>
                            <div className="property-features">
                                <span className="prop-feature"><i className="fa-solid fa-building"></i> Espacio Abierto</span>
                                <span className="prop-feature"><i className="fa-solid fa-ruler-combined"></i> 180 m²</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="props-btn-wrap text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    viewport={{ once: false, amount: 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    <a href="#contacto" className="btn btn-outline props-btn">VER TODAS LAS PROPIEDADES <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i></a>
                </motion.div>
            </div>
        </section>
    );
}
