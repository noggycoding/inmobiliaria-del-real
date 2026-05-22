import { useEffect, useState } from 'react';

export default function IntroScreen({ onFinish }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isRendered, setIsRendered] = useState(true);
    const [phase, setPhase] = useState(0); // 0=start, 1=logo in, 2=text in, 3=exit

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Stagger phases for a cinematic feel
        const t1 = setTimeout(() => setPhase(1), 100);   // logo enters
        const t2 = setTimeout(() => setPhase(2), 900);   // text enters
        const t3 = setTimeout(() => setPhase(3), 3200);  // begin exit

        const t4 = setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
            document.body.style.overflow = '';
        }, 3700);

        const t5 = setTimeout(() => setIsRendered(false), 4600);

        return () => {
            [t1, t2, t3, t4, t5].forEach(clearTimeout);
        };
    }, [onFinish]);

    if (!isRendered) return null;

    return (
        <div className={`intro-screen ${!isVisible ? 'hidden' : ''} phase-${phase}`}>

            {/* ── Deep background layers ────────── */}
            <div className="intro-bg-layer" />
            <div className="intro-orb orb-1" />
            <div className="intro-orb orb-2" />
            <div className="intro-orb orb-3" />

            {/* Subtle horizontal scan line */}
            <div className="intro-scanline" />

            {/* ── Corner brackets ───────────────── */}
            <span className="intro-corner tl" />
            <span className="intro-corner tr" />
            <span className="intro-corner bl" />
            <span className="intro-corner br" />

            {/* ── Top label ─────────────────────── */}
            <div className="intro-top-label">
                <span>Mexicali</span>
                <span className="intro-top-dot" />
                <span>Baja California</span>
                <span className="intro-top-dot" />
                <span>México</span>
            </div>

            {/* ── Center content ────────────────── */}
            <div className="intro-content">

                {/* Thin decorative lines */}
                <div className="intro-lines">
                    <span className="intro-line-left" />
                    <span className="intro-line-right" />
                </div>

                {/* Logo */}
                <div className="intro-logo-wrap">
                    <div className="intro-logo-glow" />
                    <img
                        src="LOGO INMOBILIARIA.png"
                        alt="Inmobiliaria Del Real"
                        className="intro-logo"
                    />
                </div>

                {/* Name + tagline */}
                <div className="intro-text-block">
                    <h1 className="intro-title">
                        Inmobiliaria <em>Del Real</em>
                    </h1>
                    <div className="intro-rule" />
                    <p className="intro-tagline">Renta cerca de tu futuro</p>
                </div>

                {/* Progress bar */}
                <div className="intro-progress">
                    <div className="intro-progress-track">
                        <span className="intro-progress-fill" />
                    </div>
                    <div className="intro-progress-labels">
                        <span>Preparando experiencia</span>
                        <span className="intro-progress-pct">100%</span>
                    </div>
                </div>
            </div>

            {/* ── Bottom label ──────────────────── */}
            <div className="intro-bottom-label">
                <span>Bienes Raíces</span>
                <span className="intro-top-dot" />
                <span>Renta · Venta · Compra</span>
            </div>
        </div>
    );
}
