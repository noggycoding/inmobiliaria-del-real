import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const iconFloat = (delay) => ({
    animate: { y: [0, -4, 0], rotate: [0, 3, 0, -2, 0] },
    transition: { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay },
});

const highlights = [
    { icon: 'fa-camera', label: 'Fotos profesionales', desc: 'de cada propiedad' },
    { icon: 'fa-file-contract', label: 'Contratos claros', desc: 'sin letras pequeñas' },
    { icon: 'fa-car', label: 'Visitas gratis', desc: 'te llevamos al lugar' },
    { icon: 'fa-headset', label: 'Atención 24/7', desc: 'siempre disponibles' },
];

/* ─── Property Detail Modal with Gallery ──────────── */
function PropertyModal({ property, propertyIdx, onClose, whatsapp, isAdmin, openEditor }) {
    const [galleryIdx, setGalleryIdx] = useState(0);

    useEffect(() => {
        const prevent = (e) => {
            if (e.target.closest('.prop-modal')) e.stopPropagation();
        };
        window.addEventListener('wheel', prevent, { capture: true });
        return () => window.removeEventListener('wheel', prevent, { capture: true });
    }, []);

    if (!property) return null;
    const p = property;
    const gallery = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.img];
    const currentImg = gallery[galleryIdx] || p.img;
    const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola, me interesa la propiedad: ${p.title} (${p.location})`)}`;

    const galleryNext = () => setGalleryIdx((i) => (i + 1) % gallery.length);
    const galleryPrev = () => setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length);

    const handleEditGalleryImg = (e) => {
        if (!isAdmin) return;
        e.preventDefault();
        e.stopPropagation();
        openEditor(`properties.items.${propertyIdx}.gallery.${galleryIdx}`, 'image');
    };

    return (
        <motion.div
            className="prop-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="prop-modal"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="prop-modal-close" onClick={onClose} aria-label="Cerrar">
                    <i className="fa-solid fa-xmark" />
                </button>

                {/* Gallery image */}
                <div className="prop-modal-gallery">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={galleryIdx}
                            src={currentImg}
                            alt={p.title}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </AnimatePresence>

                    <div className="prop-modal-badges">
                        <span className={`property-badge ${p.badgeDark ? 'badge-dark' : ''}`}>{p.badge}</span>
                        <span className="property-tag">{p.tag}</span>
                    </div>

                    {/* Gallery counter */}
                    {gallery.length > 1 && (
                        <div className="prop-modal-gallery-counter">
                            <i className="fa-solid fa-image" />
                            {galleryIdx + 1} / {gallery.length}
                        </div>
                    )}

                    {/* Admin: edit current gallery image */}
                    {isAdmin && (
                        <button
                            className="prop-modal-gallery-edit"
                            onClick={handleEditGalleryImg}
                            title="Cambiar esta foto"
                        >
                            <i className="fa-solid fa-pen" />
                        </button>
                    )}

                    {/* Gallery arrows */}
                    {gallery.length > 1 && (
                        <>
                            <button className="prop-modal-gallery-arrow prop-modal-gallery-arrow-left" onClick={galleryPrev} aria-label="Anterior">
                                <i className="fa-solid fa-chevron-left" />
                            </button>
                            <button className="prop-modal-gallery-arrow prop-modal-gallery-arrow-right" onClick={galleryNext} aria-label="Siguiente">
                                <i className="fa-solid fa-chevron-right" />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail strip */}
                {gallery.length > 1 && (
                    <div className="prop-modal-thumbs">
                        {gallery.map((src, i) => (
                            <button
                                key={i}
                                className={`prop-modal-thumb ${i === galleryIdx ? 'active' : ''}`}
                                onClick={() => setGalleryIdx(i)}
                                aria-label={`Foto ${i + 1}`}
                            >
                                <img src={src} alt="" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="prop-modal-content">
                    <div className="prop-modal-price-row">
                        <span className="prop-modal-price">{p.price}</span>
                        <span className="prop-modal-price-label">{p.priceLabel}</span>
                    </div>
                    <h2 className="prop-modal-title">{p.title}</h2>
                    <p className="prop-modal-location"><i className="fa-solid fa-location-dot" />{p.location}</p>

                    <div className="prop-modal-divider" />
                    <p className="prop-modal-desc">{p.description || 'Contáctanos para más información.'}</p>

                    <div className="prop-modal-divider" />
                    <h4 className="prop-modal-subtitle">Características</h4>
                    <div className="prop-modal-features">
                        {p.features.map((f, i) => (
                            <div key={i} className="prop-modal-feature">
                                <i className={`fa-solid ${f.icon}`} />
                                <span className="prop-modal-feature-val">{f.value}</span>
                                <span className="prop-modal-feature-lbl">{f.label}</span>
                            </div>
                        ))}
                    </div>

                    {(p.antiquity || p.condition || p.parking) && (
                        <>
                            <div className="prop-modal-divider" />
                            <h4 className="prop-modal-subtitle">Detalles del inmueble</h4>
                            <div className="prop-modal-details-grid">
                                {p.antiquity && <div className="prop-modal-detail-item"><i className="fa-solid fa-calendar" /><span className="prop-modal-detail-lbl">Antigüedad</span><span className="prop-modal-detail-val">{p.antiquity}</span></div>}
                                {p.condition && <div className="prop-modal-detail-item"><i className="fa-solid fa-star" /><span className="prop-modal-detail-lbl">Condición</span><span className="prop-modal-detail-val">{p.condition}</span></div>}
                                {p.parking && <div className="prop-modal-detail-item"><i className="fa-solid fa-car" /><span className="prop-modal-detail-lbl">Estacionamiento</span><span className="prop-modal-detail-val">{p.parking}</span></div>}
                            </div>
                        </>
                    )}

                    {p.description && (
                        <>
                            <div className="prop-modal-divider" />
                            <h4 className="prop-modal-subtitle">¿Por qué esta propiedad?</h4>
                            <ul className="prop-modal-why-list">
                                {p.description.split(/[.,]/).filter(s => s.trim().length > 10).slice(0, 3).map((point, i) => (
                                    <li key={i} className="prop-modal-why-item">
                                        <i className="fa-solid fa-check" />
                                        <span>{point.trim().replace(/^(\.|\s)+/, '')}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <div className="prop-modal-divider" />
                    <div className="prop-modal-actions">
                        <a href={waLink} target="_blank" rel="noreferrer" className="prop-modal-btn prop-modal-btn-wa">
                            <i className="fa-brands fa-whatsapp" /> Solicitar información
                        </a>
                        <a href={`tel:${whatsapp?.slice(-10)}`} className="prop-modal-btn prop-modal-btn-call">
                            <i className="fa-solid fa-phone" /> Llamar
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Property Card ──────────────────────────────── */
function PropertyCard({ prop, idx, onClick }) {
    return (
        <motion.article
            className="prop-card"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={onClick}
        >
            <div className="prop-card-img">
                <span className={`property-badge ${prop.badgeDark ? 'badge-dark' : ''}`}>
                    <EditableText path={`properties.items.${idx}.badge`} tag="span" />
                </span>
                <span className="property-tag">
                    <EditableText path={`properties.items.${idx}.tag`} tag="span" />
                </span>
                <EditableImage path={`properties.items.${idx}.img`} alt={prop.title} />
                <div className="prop-card-img-overlay" />
                {prop.gallery && prop.gallery.length > 1 && (
                    <span className="prop-card-gallery-badge">
                        <i className="fa-solid fa-images" />
                        {prop.gallery.length}
                    </span>
                )}
            </div>

            <div className="prop-card-body">
                <div className="prop-card-price-row">
                    <EditableText path={`properties.items.${idx}.price`} tag="span" className="prop-card-price" />
                    <EditableText path={`properties.items.${idx}.priceLabel`} tag="span" className="prop-card-price-lbl" />
                </div>
                <EditableText path={`properties.items.${idx}.title`} tag="h3" className="prop-card-title" />
                <p className="prop-card-loc">
                    <i className="fa-solid fa-location-dot" />
                    <EditableText path={`properties.items.${idx}.location`} tag="span" />
                </p>

                <div className="prop-card-features">
                    {prop.features.slice(0, 3).map((f, fi) => (
                        <span key={fi} className="prop-card-feat">
                            <i className={`fa-solid ${f.icon}`} />
                            <EditableText path={`properties.items.${idx}.features.${fi}.value`} tag="span" />
                            <span className="prop-card-feat-lbl">
                                <EditableText path={`properties.items.${idx}.features.${fi}.label`} tag="span" />
                            </span>
                        </span>
                    ))}
                </div>

                <span className="prop-card-cta">
                    Ver detalles <i className="fa-solid fa-arrow-right" />
                </span>
            </div>
        </motion.article>
    );
}

/* ─── Main Component ─────────────────────────────── */
export default function Properties({ introDone }) {
    const { content, isAdmin, openEditor } = useAdmin();
    const p = content.properties;
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(3);
    const [selectedIdx, setSelectedIdx] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w <= 640) setPerPage(1);
            else if (w <= 1024) setPerPage(2);
            else setPerPage(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const total = p.items.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    // Clamp page to valid range without an effect
    const safePage = page >= totalPages ? 0 : page;

    const goPrev = () => setPage((i) => {
        const tp = Math.max(1, Math.ceil(p.items.length / perPage));
        return (i - 1 + tp) % tp;
    });
    const goNext = () => setPage((i) => {
        const tp = Math.max(1, Math.ceil(p.items.length / perPage));
        return (i + 1) % tp;
    });

    // Properties for current page only
    const startIdx = safePage * perPage;
    const visibleItems = p.items.slice(startIdx, startIdx + perPage);

    const selectedProp = selectedIdx !== null ? p.items[selectedIdx] : null;

    return (
        <section id="propiedades" className="properties">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="props-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="props-header-left">
                        <EditableText path="properties.eyebrow" tag="span" className="eyebrow" />
                        <h2 className="props-title">
                            <EditableText path="properties.titleStart" tag="span" />{' '}
                            <EditableText path="properties.titleEm" tag="em" />
                        </h2>
                        <EditableText path="properties.subtitle" tag="p" className="props-subtitle-left" />
                    </div>
                    <div className="props-header-right">
                        <div className="props-counter">
                            <EditableText path="properties.counterNum" tag="span" className="props-counter-num" />
                            <EditableText path="properties.counterLabel" tag="span" className="props-counter-label" />
                        </div>
                        <div className="props-controls">
                            <motion.button
                                className="props-arrow"
                                onClick={goPrev}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                aria-label="Anterior"
                            >
                                <i className="fa-solid fa-arrow-left" />
                            </motion.button>
                            <motion.button
                                className="props-arrow"
                                onClick={goNext}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                aria-label="Siguiente"
                            >
                                <i className="fa-solid fa-arrow-right" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Carousel — page-based with crossfade */}
                <div className="prop-carousel-wrap">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={safePage}
                            className="prop-carousel-page"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {visibleItems.map((prop, i) => {
                                const realIdx = startIdx + i;
                                return (
                                    <PropertyCard
                                        key={prop.id}
                                        prop={prop}
                                        idx={realIdx}
                                        onClick={() => !isAdmin && setSelectedIdx(realIdx)}
                                    />
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination dots + counter */}
                <div className="prop-carousel-dots">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`prop-carousel-dot ${i === safePage ? 'active' : ''}`}
                            onClick={() => setPage(i)}
                            aria-label={`Página ${i + 1}`}
                        />
                    ))}
                    <span className="prop-carousel-counter">
                        Página {String(safePage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                    </span>
                </div>

                {/* Highlights */}
                <motion.div
                    className="props-highlights"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {highlights.map((h, i) => (
                        <motion.div key={i} className="props-highlight-item" animate={iconFloat(i * 0.6).animate} transition={iconFloat(i * 0.6).transition}>
                            <div className="props-highlight-icon"><i className={`fa-solid ${h.icon}`} /></div>
                            <div className="props-highlight-text">
                                <span className="props-highlight-title">{h.label}</span>
                                <span className="props-highlight-desc">{h.desc}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="props-bottom-cta"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.6 }}
                >
                    <p>¿No encuentras lo que buscas? Tenemos más opciones disponibles.</p>
                    <div className="props-bottom-btns">
                        <a href="#contacto" className="btn btn-gold">
                            Ver todas las propiedades <i className="fa-solid fa-arrow-right btn-arrow" />
                        </a>
                        <a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline">
                            <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Agendar visita
                        </a>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProp && (
                    <PropertyModal
                        property={selectedProp}
                        propertyIdx={selectedIdx}
                        onClose={() => setSelectedIdx(null)}
                        whatsapp={content.contact.whatsapp}
                        isAdmin={isAdmin}
                        openEditor={openEditor}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
