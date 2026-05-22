import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const leftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const cardStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const cardSlide = {
    hidden: { opacity: 0, x: 80, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const statFloat = (delay) => ({
    y: [0, -5, 0, 4, 0],
    transition: { duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' },
});

function StarRating({ rating }) {
    return (
        <div className="testi-card-rating">
            {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i < Math.floor(rating) ? 'filled' : ''}`} />
            ))}
            <span className="testi-card-rating-num">{rating.toFixed(1)}</span>
        </div>
    );
}

export default function Testimonials({ introDone }) {
    const { content } = useAdmin();
    const t = content.testimonials;

    return (
        <section id="testimonios" className="testimonials">
            <div className="container">
                <motion.div
                    className="testi-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="eyebrow-line">
                        <EditableText path="testimonials.eyebrow" tag="span" />
                    </span>
                    <h2 className="testi-main-title">
                        <EditableText path="testimonials.titleStart" tag="span" />{' '}
                        <EditableText path="testimonials.titleEm" tag="em" />
                    </h2>
                    <EditableText path="testimonials.subtitle" tag="p" className="section-subtitle" />
                </motion.div>

                <div className="testi-layout">
                    {/* Left column */}
                    <motion.div
                        className="testi-left"
                        variants={leftVariants}
                        initial="hidden"
                        whileInView={introDone ? 'visible' : 'hidden'}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="testi-stats">
                            {t.stats.map((s, i) => (
                                <motion.div
                                    key={s.lbl}
                                    className="testi-stat-card"
                                    animate={{ y: statFloat(i * 0.8).y }}
                                    transition={statFloat(i * 0.8).transition}
                                >
                                    <div className="testi-stat-icon"><i className={`fa-solid ${s.icon}`} /></div>
                                    <div className="testi-stat-content">
                                        <EditableText path={`testimonials.stats.${i}.val`} tag="h4" />
                                        <EditableText path={`testimonials.stats.${i}.lbl`} tag="p" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="testi-google-badge">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png" alt="Google" className="testi-google-logo" />
                            <div>
                                <div className="testi-google-stars">
                                    <i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" />
                                </div>
                                <span>Calificación perfecta en Google Maps</span>
                            </div>
                        </div>

                        <div className="testi-actions">
                            <a href="#contacto" className="btn btn-gold">Contáctanos <i className="fa-solid fa-arrow-right btn-arrow" /></a>
                            <a href="#" className="btn btn-outline">Ver en Google <i className="fa-solid fa-external-link" /></a>
                        </div>
                    </motion.div>

                    {/* Right: Cards sliding in */}
                    <motion.div
                        className="testi-cards"
                        variants={cardStagger}
                        initial="hidden"
                        whileInView={introDone ? 'visible' : 'hidden'}
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {t.items.map((item, i) => (
                            <motion.article
                                key={item.id}
                                className="testi-card"
                                variants={cardSlide}
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                            >
                                <div className="testi-card-top">
                                    <StarRating rating={item.rating} />
                                    <span className="testi-card-date">
                                        <i className="fa-regular fa-calendar" />
                                        <EditableText path={`testimonials.items.${i}.date`} tag="span" />
                                    </span>
                                </div>

                                <blockquote className="testi-card-quote">
                                    <i className="fa-solid fa-quote-left testi-card-quote-icon" />
                                    <EditableText path={`testimonials.items.${i}.text`} tag="span" />
                                </blockquote>

                                <div className="testi-card-bottom">
                                    <div className="testi-card-author">
                                        <EditableImage path={`testimonials.items.${i}.img`} alt={item.author} />
                                        <div>
                                            <EditableText path={`testimonials.items.${i}.author`} tag="h4" />
                                            <EditableText path={`testimonials.items.${i}.label`} tag="span" />
                                        </div>
                                    </div>
                                    <div className="testi-card-verified">
                                        <i className="fa-solid fa-circle-check" /> Verificado
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
