import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const mapVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
};

const quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Propiedades', href: '#propiedades' },
    { label: 'Testimonios', href: '#testimonios' },
];

const socials = [
    { icon: 'fa-brands fa-facebook-f', href: 'https://www.facebook.com/Inmobiliaria.Real.BC', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/inmobiliaria.real.del.baja.25', label: 'Instagram' },
    { icon: 'fa-brands fa-whatsapp', href: 'https://wa.me/5216864680112', label: 'WhatsApp' },
];

export default function Footer({ introDone }) {
    const { content } = useAdmin();
    const c = content.contact;
    const waLink = `https://wa.me/${c.whatsapp}`;
    const telLink = `tel:${c.phone?.replace(/\s/g, '')}`;
    const mailLink = `mailto:${c.email}`;

    return (
        <footer id="contacto" className="footer">
            {/* CTA Banner */}
            <motion.div
                className="footer-cta-banner"
                initial={{ opacity: 0, y: 30 }}
                whileInView={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="container footer-cta-inner">
                    <div className="footer-cta-text">
                        <span className="eyebrow">Hablemos</span>
                        <EditableText path="contact.ctaTitle" tag="h3" />
                        <EditableText path="contact.ctaSubtitle" tag="p" />
                    </div>
                    <div className="footer-cta-actions">
                        <motion.a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-gold"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.1rem' }} />
                            WhatsApp
                        </motion.a>
                        <motion.a
                            href={telLink}
                            className="btn btn-outline"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <i className="fa-solid fa-phone" />
                            Llamar
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            <div className="container">
                {/* Main grid */}
                <motion.div
                    className="footer-grid"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView={introDone ? 'visible' : 'hidden'}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Brand */}
                    <div className="footer-col footer-col-brand">
                        <div className="footer-logo-wrap">
                            <EditableImage path="logo.src" alt={content.logo.name} className="footer-logo-img" />
                        </div>
                        <p className="footer-brand-desc">
                            Especialistas en renta, venta y compra de casas, locales y terrenos en Mexicali, B.C. Renta cerca de tu futuro con nosotros.
                        </p>
                        <div className="social-links">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="social-link"
                                    aria-label={s.label}
                                    whileHover={{ scale: 1.15, y: -3, rotate: 4 }}
                                    whileTap={{ scale: 0.92 }}
                                >
                                    <i className={s.icon} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3>Navegación</h3>
                        <ul className="footer-links-list">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}>
                                        <i className="fa-solid fa-chevron-right" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3>Contacto</h3>
                        <ul className="footer-contact-list">
                            <li>
                                <i className="fa-solid fa-location-dot" />
                                <EditableText path="contact.address" tag="span" />
                            </li>
                            <li>
                                <i className="fa-solid fa-phone" />
                                <a href={telLink}>
                                    <EditableText path="contact.phone" tag="span" />
                                </a>
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope" />
                                <a href={mailLink}>
                                    <EditableText path="contact.email" tag="span" />
                                </a>
                            </li>
                            <li>
                                <i className="fa-solid fa-globe" />
                                <EditableText path="contact.website" tag="span" />
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="footer-col">
                        <h3>Horarios</h3>
                        <ul className="footer-hours-list">
                            <li>
                                <span className="hours-day">Lunes – Viernes</span>
                                <span className="hours-time">10:00 a.m. – 6:00 p.m.</span>
                            </li>
                            <li>
                                <span className="hours-day">Sábado</span>
                                <span className="hours-time">10:00 a.m. – 2:00 p.m.</span>
                            </li>
                            <li>
                                <span className="hours-day">Domingo</span>
                                <span className="hours-time hours-closed">Cerrado</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Map */}
                <motion.div
                    className="map-container"
                    variants={mapVariants}
                    initial="hidden"
                    whileInView={introDone ? 'visible' : 'hidden'}
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <iframe
                        src="https://maps.google.com/maps?q=Blvd.+L%C3%A1zaro+C%C3%A1rdenas+569,+Jardines+del+Lago,+Mexicali+B.C.&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Inmobiliaria Del Real"
                    />
                </motion.div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Inmobiliaria Del Real. Todos los derechos reservados.</p>
                    <p className="footer-credits">
                        Diseñado en Mexicali, B.C. con
                        <i className="fa-solid fa-heart" style={{ color: 'var(--color-gold-base)', fontSize: '0.7rem', margin: '0 6px' }} />
                    </p>
                </div>
            </div>
        </footer>
    );
}
