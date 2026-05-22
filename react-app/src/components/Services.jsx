import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import EditableText from '../admin/EditableText';

const SLIDE_DURATION = 7000;
const TRANSITION_DURATION = 800;

const stepPulse = { scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] };

export default function Services({ introDone }) {
    const { content, isAdmin, openEditor } = useAdmin();
    const s = content.services;
    const slides = s.items;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const intervalRef = useRef(null);
    const progressRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const goToSlide = useCallback(
        (index) => {
            if (isTransitioning || index === currentIndex) return;
            setIsTransitioning(true);
            setProgress(0);
            setTimeout(() => {
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 50);
            }, TRANSITION_DURATION / 2);
        },
        [isTransitioning, currentIndex]
    );

    const goNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, [currentIndex, slides.length, goToSlide]);

    const goPrev = useCallback(() => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }, [currentIndex, slides.length, goToSlide]);

    // Auto-advance + progress
    useEffect(() => {
        if (isPaused || isAdmin) return;
        progressRef.current = setInterval(() => {
            setProgress((prev) => Math.min(prev + 100 / (SLIDE_DURATION / 50), 100));
        }, 50);
        intervalRef.current = setInterval(goNext, SLIDE_DURATION);
        return () => {
            clearInterval(intervalRef.current);
            clearInterval(progressRef.current);
        };
    }, [currentIndex, isPaused, goNext, isAdmin]);

    const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 60) {
            if (diff > 0) goNext();
            else goPrev();
        }
    };

    const currentSlide = slides[currentIndex];
    const accent = '#E5BD58'; // gold light

    const handleBgEdit = (e) => {
        if (!isAdmin) return;
        e.preventDefault(); e.stopPropagation();
        openEditor(`services.items.${currentIndex}.bgImg`, 'image');
    };

    return (
        <section id="servicios" className="services-section">
            {/* Heading */}
            <div className="container">
                <motion.div
                    className="svc-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="left">
                        <EditableText path="services.eyebrow" tag="span" className="eyebrow" />
                        <h2 className="svc-main-title">
                            <EditableText path="services.titleStart" tag="span" />{' '}
                            <EditableText path="services.titleEm" tag="em" />
                        </h2>
                        <EditableText path="services.subtitle" tag="p" className="svc-main-sub" />
                    </div>
                </motion.div>
            </div>

            {/* Elegant Carousel */}
            <div
                className="carousel-wrapper"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Background accent wash */}
                <div
                    className="carousel-bg-wash"
                    style={{ background: `radial-gradient(ellipse at 70% 50%, rgba(217, 176, 71, 0.18) 0%, transparent 70%)` }}
                />

                <div className="carousel-inner">
                    {/* Left: Text */}
                    <div className="carousel-content">
                        <div className="carousel-content-inner">
                            {/* Collection number */}
                            <div className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}>
                                <span className="carousel-num-line" />
                                <span className="carousel-num-text">
                                    {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}>
                                <EditableText path={`services.items.${currentIndex}.title`} tag="span" />
                            </h2>

                            {/* Subtitle */}
                            <p
                                className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
                            >
                                Servicio Inmobiliario · Mexicali
                            </p>

                            {/* Description */}
                            <p className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}>
                                <EditableText path={`services.items.${currentIndex}.desc`} tag="span" />
                            </p>

                            {/* Navigation */}
                            <div className="carousel-nav-arrows">
                                <button onClick={goPrev} className="carousel-arrow-btn" aria-label="Anterior">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button onClick={goNext} className="carousel-arrow-btn" aria-label="Siguiente">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="carousel-image-container">
                        <div className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}>
                            <img
                                src={currentSlide.bgImg}
                                alt={currentSlide.title}
                                className="carousel-image"
                            />
                            <div
                                className="carousel-image-overlay"
                                style={{ background: `linear-gradient(135deg, ${accent}33 0%, transparent 50%)` }}
                            />
                            {/* Admin: change image */}
                            {isAdmin && (
                                <div
                                    className="carousel-image-edit admin-editable admin-editable-img"
                                    onClick={handleBgEdit}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <div className="admin-img-overlay">
                                        <i className="fa-solid fa-image" />
                                        <span>Cambiar</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Decorative corners */}
                        <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: accent }} />
                        <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: accent }} />
                    </div>
                </div>

                {/* Progress indicators */}
                <div className="carousel-progress-bar">
                    {slides.map((slide, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
                            aria-label={`Ir a servicio ${index + 1}`}
                        >
                            <div className="carousel-progress-track">
                                <div
                                    className="carousel-progress-fill"
                                    style={{
                                        width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                                        backgroundColor: index === currentIndex ? accent : undefined,
                                    }}
                                />
                            </div>
                            <span className="carousel-progress-label">{slide.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Process steps */}
            <div className="container">
                <motion.div
                    className="svc-process"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <h3 className="svc-process-title">Nuestro Proceso</h3>
                    <div className="svc-steps">
                        {s.process.map((step, i) => (
                            <div key={step.num} className="svc-step-wrapper">
                                {i > 0 && <div className="svc-step-line" />}
                                <div className="svc-step">
                                    <motion.span className="svc-step-num" animate={stepPulse} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}>
                                        {step.num}
                                    </motion.span>
                                    <EditableText path={`services.process.${i}.title`} tag="h4" />
                                    <EditableText path={`services.process.${i}.desc`} tag="p" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
