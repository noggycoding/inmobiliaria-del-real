import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        id: 1,
        title: "Renta de Casas",
        desc: "Encuentra el hogar perfecto para ti y tu familia con nuestras excelentes opciones de arrendamiento en Mexicali.",
        icon: "fa-house-user",
        bgImg: "img-svc-casas.png",
        gradient: "rgba(5,33,59,0.10) 0%, rgba(0,20,40,0.88) 100%",
        bgPos: "center top"
    },
    {
        id: 2,
        title: "Venta de Casas",
        desc: "Te acompañamos en todo el proceso de venta garantizando un trato justo, seguro y al mejor precio del mercado.",
        icon: "fa-house-flag",
        bgImg: "img-svc-casas.png",
        gradient: "rgba(30,15,0,0.10) 0%, rgba(30,15,0,0.88) 100%",
        bgPos: "center bottom"
    },
    {
        id: 3,
        title: "Departamentos",
        desc: "Opciones modernas y céntricas para quienes buscan practicidad, seguridad y comodidad en la ciudad.",
        icon: "fa-building",
        bgImg: "img-svc-departamentos.jpg",
        gradient: "rgba(5,33,59,0.10) 0%, rgba(0,25,50,0.88) 100%",
        bgPos: "center"
    },
    {
        id: 4,
        title: "Locales Comerciales",
        desc: "Los mejores espacios ubicados estratégicamente para el éxito y crecimiento de tu negocio en Mexicali.",
        icon: "fa-shop",
        bgImg: "img-svc-comercial.png",
        gradient: "rgba(20,5,40,0.10) 0%, rgba(20,5,40,0.88) 100%",
        bgPos: "center"
    },
    {
        id: 5,
        title: "Terrenos",
        desc: "Excelentes oportunidades de inversión en terrenos residenciales y comerciales con alta plusvalía en Baja California.",
        icon: "fa-map",
        bgImg: "img-svc-terrenos.jpg",
        gradient: "rgba(5,40,25,0.10) 0%, rgba(5,40,25,0.88) 100%",
        bgPos: "center"
    },
    {
        id: 6,
        title: "Asesoría Legal",
        desc: "Orientación experta en contratos, escrituras y trámites para brindarte total seguridad jurídica en cada operación.",
        icon: "fa-scale-balanced",
        bgImg: "img-svc-terrenos.jpg",
        gradient: "rgba(40,25,0,0.10) 0%, rgba(40,25,0,0.88) 100%",
        bgPos: "right center"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

export default function Services({ introDone }) {
    const trackRef = useRef(null);
    const [idx, setIdx] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);
    const [cardWidth, setCardWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) setVisibleCards(1);
            else if (window.innerWidth <= 992) setVisibleCards(2);
            else setVisibleCards(3);

            if (trackRef.current) {
                const card = trackRef.current.querySelector('.svc-card');
                if (card) {
                    const GAP = 19; // 1.2rem
                    setCardWidth(card.getBoundingClientRect().width + GAP);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const maxIdx = Math.max(0, services.length - visibleCards);
        if (idx > maxIdx) {
            setIdx(maxIdx);
        }
    }, [visibleCards, idx]);

    const maxIdx = Math.max(0, services.length - visibleCards);

    const slideLeft = () => { if (idx > 0) setIdx(idx - 1); };
    const slideRight = () => { if (idx < maxIdx) setIdx(idx + 1); };

    return (
        <section id="servicios" className="services-section">
            <div className="container">
                <motion.div 
                    className="svc-heading"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="svc-main-title">Nuestros <span className="text-gold" style={{ fontWeight: 800 }}>Servicios.</span></h2>
                        <p className="svc-main-sub">Soluciones inmobiliarias integrales en Mexicali, B.C.</p>
                    </div>
                </motion.div>
            </div>

            <div className="svc-outer">
                <button className="svc-arrow svc-arrow--prev" onClick={slideLeft} disabled={idx === 0} aria-label="Anterior">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div className="svc-track-wrap">
                    <motion.div 
                        className="svc-track" 
                        id="svc-track" 
                        ref={trackRef}
                        style={{ transform: `translateX(-${idx * cardWidth}px)` }}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView={introDone ? "visible" : "hidden"}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        {services.map((svc) => (
                            <motion.div 
                                key={svc.id}
                                className="svc-card" 
                                variants={cardVariants}
                                whileHover={{ scale: 1.02 }}
                                style={{ 
                                    background: `linear-gradient(to bottom, ${svc.gradient}), url('/${svc.bgImg}')`, 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: svc.bgPos,
                                }}
                            >
                                <div className="svc-top">
                                    <span className="svc-num">( 00{svc.id} )</span>
                                    <i className={`fa-solid ${svc.icon} svc-ico`}></i>
                                </div>
                                <div className="svc-bot">
                                    <h3 className="svc-name">{svc.title}</h3>
                                    <p className="svc-txt">{svc.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <button className="svc-arrow svc-arrow--next" onClick={slideRight} disabled={idx >= maxIdx} aria-label="Siguiente">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </section>
    );
}
