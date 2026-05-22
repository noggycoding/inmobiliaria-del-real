import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import EditableText from '../admin/EditableText';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
};

const clients = [
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
];

const badgeFloat = {
    y: [0, -8, 0, 6, 0],
    rotate: [0, 1, 0, -1, 0],
};

export default function Hero({ introDone }) {
    const { content, isAdmin, openEditor } = useAdmin();
    const h = content.hero;

    return (
        <section
            id="inicio"
            className="hero"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(5,13,26,0.45) 0%, rgba(5,13,26,0.75) 60%, rgba(5,13,26,0.95) 100%), url('${h.bg}')` }}
        >
            {/* Admin: change background image button */}
            {isAdmin && (
                <div
                    className="hero-bg-edit admin-editable admin-editable-img"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditor('hero.bg', 'image'); }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    data-admin-path="hero.bg"
                >
                    <div className="admin-img-overlay">
                        <i className="fa-solid fa-image" />
                        <span>Cambiar fondo</span>
                    </div>
                </div>
            )}

            <div className="container">
                <motion.div
                    className="hero-content"
                    variants={stagger}
                    initial="hidden"
                    animate={introDone ? 'visible' : 'hidden'}
                >
                    <motion.div variants={fadeUp}>
                        <EditableText path="hero.tagline" tag="span" className="hero-tagline" />
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="hero-title">
                        <EditableText path="hero.titleStart" tag="span" />{' '}
                        <br />
                        <EditableText path="hero.titleAccent" tag="em" className="accent" />
                    </motion.h1>

                    <motion.div variants={fadeUp}>
                        <EditableText path="hero.description" tag="p" className="hero-desc" />
                    </motion.div>

                    <motion.div variants={fadeUp} className="hero-cta-row">
                        <motion.a
                            href="#propiedades"
                            className="btn btn-gold"
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <EditableText path="hero.primaryCta" tag="span" />
                            <i className="fa-solid fa-arrow-right btn-arrow" />
                        </motion.a>
                        <motion.a
                            href="#contacto"
                            className="btn btn-outline"
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <EditableText path="hero.secondaryCta" tag="span" />
                        </motion.a>
                    </motion.div>

                    {/* Trust badge */}
                    <motion.div variants={fadeUp} className="hero-trust">
                        <div className="hero-avatars">
                            {clients.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    className="hero-avatar"
                                    style={{ zIndex: clients.length - i }}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                        <div className="hero-trust-text">
                            <EditableText path="hero.trustText" tag="span" className="hero-trust-num" />
                            <span className="hero-trust-stars">
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <EditableText path="hero.trustStarsLabel" tag="span" />
                            </span>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="hero-stats">
                        {h.stats.map((s, i) => (
                            <div key={i} className="stat-item">
                                <h4>
                                    <EditableText path={`hero.stats.${i}.value`} tag="span" />
                                    {i === 0 && <i className="fa-solid fa-star" style={{ fontSize: '0.95rem', color: 'var(--color-gold-light)' }} />}
                                </h4>
                                <EditableText path={`hero.stats.${i}.label`} tag="p" />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating badge */}
            <motion.div
                className="hero-badge-float"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={introDone ? { opacity: 1, scale: 1, ...badgeFloat } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1.2, duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                aria-hidden="true"
            >
                <i className="fa-solid fa-shield-halved" />
                <EditableText path="hero.badgeText" tag="span" />
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                aria-hidden="true"
            >
                <span>Desplázate</span>
                <span className="scroll-indicator-bar" />
            </motion.div>
        </section>
    );
}
