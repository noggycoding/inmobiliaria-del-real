import { motion } from 'framer-motion';

const fadeUpVariant = {
    hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function Hero({ introDone }) {
    return (
        <section id="inicio" className="hero">
            <div className="container">
                <motion.div 
                    className="hero-content"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView={introDone ? "visible" : "hidden"}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <motion.span variants={fadeUpVariant} className="hero-tagline">Renta cerca de tu futuro</motion.span>
                    
                    <motion.h1 variants={fadeUpVariant} className="hero-title">
                        Encuentra el lugar ideal en <span
                            style={{ color: 'var(--color-gold-light)', fontWeight: 800, fontStyle: 'normal', fontFamily: 'var(--font-primary)' }}>Mexicali</span>
                    </motion.h1>
                    
                    <motion.p variants={fadeUpVariant} className="hero-desc">
                        Especialistas en renta, venta y compra de casas, departamentos, locales comerciales
                        y terrenos. Tu patrimonio en manos de profesionales.
                    </motion.p>

                    <motion.div variants={fadeUpVariant} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <a href="#propiedades" className="btn btn-gold">Explorar Propiedades</a>
                        <a href="#contacto" className="btn btn-outline">Hablar con un Asesor</a>
                    </motion.div>

                    <motion.div variants={staggerContainer} className="hero-stats">
                        <motion.div variants={fadeUpVariant} className="stat-item">
                            <h4>5.0 <i className="fa-solid fa-star" style={{ fontSize: '1.2rem' }}></i></h4>
                            <p>Calificación Google</p>
                        </motion.div>
                        <motion.div variants={fadeUpVariant} className="stat-item">
                            <h4>150+</h4>
                            <p>Propiedades gestionadas</p>
                        </motion.div>
                        <motion.div variants={fadeUpVariant} className="stat-item">
                            <h4>+5 años</h4>
                            <p>En Mexicali</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
