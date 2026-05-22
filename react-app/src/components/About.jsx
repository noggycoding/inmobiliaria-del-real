import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const slideLeft = {
    hidden: { opacity: 0, x: -50, rotate: -2 },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const checklistStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const checklistItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const floatVariants = [
    {
        animate: { y: [0, -5, 0, 4, 0], x: [0, 3, 0, -3, 0], rotate: [0, 0.8, 0, -0.5, 0], scale: [1, 1.04, 1, 0.98, 1] },
        transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    },
    {
        animate: { y: [0, 4, 0, -5, 0], x: [0, -3, 0, 2, 0], rotate: [0, -0.6, 0, 0.7, 0], scale: [1, 0.97, 1, 1.05, 1] },
        transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
    },
    {
        animate: { y: [0, -3, 0, 6, 0], x: [0, 2, 0, -4, 0], rotate: [0, 0.5, 0, -0.8, 0], scale: [1, 1.03, 1, 0.97, 1] },
        transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
    },
    {
        animate: { y: [0, 5, 0, -4, 0], x: [0, -2, 0, 3, 0], rotate: [0, -0.7, 0, 0.6, 0], scale: [1, 0.96, 1, 1.04, 1] },
        transition: { duration: 8.5, repeat: Infinity, ease: 'easeInOut' },
    },
];

export default function About({ introDone }) {
    const { content } = useAdmin();
    const a = content.about;

    return (
        <section id="nosotros" className="about">
            <div className="container">
                <div className="about-grid">
                    {/* Diamond collage with floating animation */}
                    <motion.div
                        className="diamond-collage"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView={introDone ? 'visible' : 'hidden'}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="diamond-grid">
                            {a.images.map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="diamond-item"
                                    animate={floatVariants[i].animate}
                                    transition={floatVariants[i].transition}
                                >
                                    <EditableImage path={`about.images.${i}`} alt={`Propiedad ${i + 1}`} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        whileInView={introDone ? 'visible' : 'hidden'}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="about-content-card">
                            <EditableText path="about.eyebrow" tag="span" className="eyebrow" />

                            <h2 className="about-title">
                                <EditableText path="about.titleStart" tag="span" />{' '}
                                <EditableText path="about.titleEm" tag="em" />
                            </h2>

                            <EditableText path="about.description" tag="p" className="about-text" />

                            <motion.ul
                                className="about-checklist"
                                variants={checklistStagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.3 }}
                            >
                                {a.checklist.map((item, i) => (
                                    <motion.li key={i} variants={checklistItem}>
                                        <i className="fa-solid fa-check" />
                                        <EditableText path={`about.checklist.${i}`} tag="span" />
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                className="about-author-box"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <EditableImage path="about.authorImg" alt={a.authorName} className="about-author-img" />
                                <div className="author-info">
                                    <EditableText path="about.authorName" tag="h4" className="author-name" />
                                    <EditableText path="about.authorLabel" tag="span" className="author-label" />
                                </div>
                            </motion.div>

                            <motion.a
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                href="#contacto"
                                className="btn btn-gold"
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <EditableText path="about.cta" tag="span" />
                                <i className="fa-solid fa-arrow-right btn-arrow" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
