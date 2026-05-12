import { useEffect, useState } from 'react';

export default function IntroScreen({ onFinish }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isRendered, setIsRendered] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        const hideTimeout = setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
            document.body.style.overflow = '';
            
            const removeTimeout = setTimeout(() => {
                setIsRendered(false);
            }, 800);
            
            return () => clearTimeout(removeTimeout);
        }, 2800);

        return () => clearTimeout(hideTimeout);
    }, []);

    if (!isRendered) return null;

    return (
        <div id="intro-screen" className={`intro-screen ${isVisible ? '' : 'hidden'}`}>
            <div className="intro-bg-particles">
                <span></span><span></span><span></span>
                <span></span><span></span><span></span>
            </div>
            <div className="intro-content">
                <div className="intro-logo-wrap">
                    <img src="/LOGO INMOBILIARIA.png" alt="Inmobiliaria Del Real" className="intro-logo" />
                </div>
                <div className="intro-text-wrap">
                    <h1 className="intro-title">Inmobiliaria <span>Del Real</span></h1>
                    <p className="intro-tagline">Renta cerca de tu futuro</p>
                    <div className="intro-line"></div>
                </div>
            </div>
        </div>
    );
}
