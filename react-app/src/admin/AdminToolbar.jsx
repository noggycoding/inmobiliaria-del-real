import { useRef, useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminPanel from './AdminPanel';

const SECTIONS = [
    { id: 'inicio', label: 'Hero', icon: 'fa-house' },
    { id: 'nosotros', label: 'About', icon: 'fa-user' },
    { id: 'servicios', label: 'Servicios', icon: 'fa-briefcase' },
    { id: 'propiedades', label: 'Propiedades', icon: 'fa-building' },
    { id: 'testimonios', label: 'Reseñas', icon: 'fa-star' },
    { id: 'contacto', label: 'Footer', icon: 'fa-envelope' },
];

export default function AdminToolbar() {
    const { isAdmin, resetContent, exportContent, importContent, content } = useAdmin();
    const fileInputRef = useRef(null);
    const [saved, setSaved] = useState(false);
    const [showHighlights, setShowHighlights] = useState(true);
    const [showNav, setShowNav] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showFullPanel, setShowFullPanel] = useState(false);

    // ─── BLOCK ALL interactive elements ─────────────────────────
    useEffect(() => {
        if (!isAdmin) return;

        const isAdminUI = (el) =>
            el.closest('.admin-toolbar') ||
            el.closest('.editor-modal-backdrop') ||
            el.closest('.editor-modal') ||
            el.closest('.admin-panel') ||
            el.closest('.ap-backdrop') ||
            el.closest('.ap-container') ||
            el.closest('.ap-main') ||
            el.closest('.ap-sidebar') ||
            el.closest('.ap-nav');

        const blockAll = (e) => {
            const target = e.target;
            if (isAdminUI(target)) return;
            if (target.closest('.admin-editable')) return;
            if (target.closest('.svc-arrow')) return;

            const interactive = target.closest('a, button, input, select, textarea, [role="button"], [onclick]');
            if (interactive) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        };

        document.addEventListener('click', blockAll, true);
        document.addEventListener('mousedown', blockAll, true);
        document.addEventListener('pointerdown', blockAll, true);

        const blockSubmit = (e) => {
            if (!isAdminUI(e.target)) { e.preventDefault(); e.stopPropagation(); }
        };
        document.addEventListener('submit', blockSubmit, true);

        const blockKeyboard = (e) => {
            if (e.key === 'Enter' && !isAdminUI(e.target)) {
                const interactive = e.target.closest('a, button, [role="button"]');
                if (interactive && !interactive.closest('.admin-editable')) {
                    e.preventDefault(); e.stopPropagation();
                }
            }
        };
        document.addEventListener('keydown', blockKeyboard, true);

        return () => {
            document.removeEventListener('click', blockAll, true);
            document.removeEventListener('mousedown', blockAll, true);
            document.removeEventListener('pointerdown', blockAll, true);
            document.removeEventListener('submit', blockSubmit, true);
            document.removeEventListener('keydown', blockKeyboard, true);
        };
    }, [isAdmin]);

    // Toggle highlights
    useEffect(() => {
        if (!isAdmin) return;
        document.body.classList.toggle('admin-hide-highlights', !showHighlights);
    }, [showHighlights, isAdmin]);

    if (!isAdmin) return null;

    const handleImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const success = importContent(ev.target.result);
            if (success) showSavedBadge();
            else alert('Error al importar.');
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const showSavedBadge = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleExitAdmin = () => {
        const url = new URL(window.location);
        url.searchParams.delete('admin');
        window.location.href = url.toString();
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setShowNav(false);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <div className="admin-toolbar">
                <div className="admin-toolbar-left">
                    <div className="admin-toolbar-badge">
                        <i className="fa-solid fa-pen-ruler" />
                        <span>Editor</span>
                    </div>

                    {/* Section navigator */}
                    <div className="admin-nav-wrapper">
                        <button className="admin-tb-btn admin-tb-btn-nav" onClick={() => { setShowNav(!showNav); setShowPanel(false); }}>
                            <i className="fa-solid fa-compass" />
                            <span className="admin-btn-label">Navegar</span>
                            <i className={`fa-solid fa-chevron-${showNav ? 'up' : 'down'}`} style={{ fontSize: '0.55rem' }} />
                        </button>
                        {showNav && (
                            <div className="admin-nav-dropdown">
                                {SECTIONS.map((sec) => (
                                    <button key={sec.id} className="admin-nav-item" onClick={() => scrollToSection(sec.id)}>
                                        <i className={`fa-solid ${sec.icon}`} />
                                        {sec.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Toggle highlights */}
                    <button
                        className={`admin-tb-btn ${showHighlights ? '' : 'admin-tb-btn-off'}`}
                        onClick={() => setShowHighlights(!showHighlights)}
                        title={showHighlights ? 'Ocultar bordes' : 'Mostrar bordes'}
                    >
                        <i className={`fa-solid ${showHighlights ? 'fa-border-all' : 'fa-border-none'}`} />
                        <span className="admin-btn-label">{showHighlights ? 'Bordes' : 'Sin bordes'}</span>
                    </button>

                    {/* Scroll to top */}
                    <button className="admin-tb-btn" onClick={scrollToTop} title="Ir al inicio">
                        <i className="fa-solid fa-arrow-up" />
                    </button>

                    {saved && (
                        <span className="admin-saved-badge">
                            <i className="fa-solid fa-check" /> Guardado
                        </span>
                    )}
                </div>

                <div className="admin-toolbar-actions">
                    {/* Mini panel toggle */}
                    <button className={`admin-tb-btn admin-tb-btn-panel ${showPanel ? 'active' : ''}`} onClick={() => { setShowPanel(!showPanel); setShowNav(false); }}>
                        <i className="fa-solid fa-sliders" />
                        <span className="admin-btn-label">Panel</span>
                    </button>

                    {/* Full Admin Panel */}
                    <button className="admin-tb-btn admin-tb-btn-full" onClick={() => setShowFullPanel(true)}>
                        <i className="fa-solid fa-table-columns" />
                        <span className="admin-btn-label">Admin Panel</span>
                    </button>

                    <div className="admin-toolbar-divider" />

                    <button onClick={handleExitAdmin} className="admin-tb-btn admin-tb-btn-exit" title="Ver como cliente">
                        <i className="fa-solid fa-eye" />
                        <span className="admin-btn-label">Vista cliente</span>
                    </button>
                </div>
            </div>

            {/* ─── Mini Admin Panel (Slide-down) ─────────────────── */}
            {showPanel && (
                <div className="admin-panel">
                    <div className="admin-panel-inner">
                        {/* Quick actions */}
                        <div className="admin-panel-section">
                            <h4 className="admin-panel-title">
                                <i className="fa-solid fa-bolt" /> Acciones rápidas
                            </h4>
                            <div className="admin-panel-grid">
                                <button className="admin-panel-btn" onClick={exportContent}>
                                    <i className="fa-solid fa-download" />
                                    <span>Exportar JSON</span>
                                    <small>Descargar contenido</small>
                                </button>
                                <button className="admin-panel-btn" onClick={() => fileInputRef.current?.click()}>
                                    <i className="fa-solid fa-upload" />
                                    <span>Importar JSON</span>
                                    <small>Cargar desde archivo</small>
                                </button>
                                <button className="admin-panel-btn admin-panel-btn-danger" onClick={resetContent}>
                                    <i className="fa-solid fa-rotate-left" />
                                    <span>Restablecer</span>
                                    <small>Valores originales</small>
                                </button>
                                <button className="admin-panel-btn" onClick={() => { navigator.clipboard.writeText(JSON.stringify(content, null, 2)); showSavedBadge(); }}>
                                    <i className="fa-solid fa-clipboard" />
                                    <span>Copiar JSON</span>
                                    <small>Al portapapeles</small>
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="admin-panel-section">
                            <h4 className="admin-panel-title">
                                <i className="fa-solid fa-circle-info" /> Información
                            </h4>
                            <div className="admin-panel-info">
                                <div className="admin-panel-info-row">
                                    <span>Secciones editables</span>
                                    <strong>6</strong>
                                </div>
                                <div className="admin-panel-info-row">
                                    <span>Servicios</span>
                                    <strong>{content.services.items.length}</strong>
                                </div>
                                <div className="admin-panel-info-row">
                                    <span>Propiedades</span>
                                    <strong>{content.properties.items.length}</strong>
                                </div>
                                <div className="admin-panel-info-row">
                                    <span>Testimonios</span>
                                    <strong>{content.testimonials.items.length}</strong>
                                </div>
                                <div className="admin-panel-info-row">
                                    <span>Almacenamiento</span>
                                    <strong>localStorage</strong>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="admin-panel-section">
                            <h4 className="admin-panel-title">
                                <i className="fa-solid fa-lightbulb" /> Tips
                            </h4>
                            <ul className="admin-panel-tips">
                                <li><i className="fa-solid fa-mouse-pointer" /> Click en cualquier texto para editarlo</li>
                                <li><i className="fa-solid fa-image" /> Click en imágenes para cambiarlas</li>
                                <li><i className="fa-solid fa-keyboard" /> Enter = guardar, Esc = cancelar</li>
                                <li><i className="fa-solid fa-floppy-disk" /> Los cambios se guardan automáticamente</li>
                                <li><i className="fa-solid fa-border-all" /> Usa "Bordes" para ocultar indicadores</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />

            {/* Full Admin Panel overlay */}
            {showFullPanel && <AdminPanel onClose={() => setShowFullPanel(false)} />}
        </>
    );
}
