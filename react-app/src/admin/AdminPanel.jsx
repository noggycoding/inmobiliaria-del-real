import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const TABS = [
    { id: 'general', label: 'General', icon: 'fa-house' },
    { id: 'hero', label: 'Hero', icon: 'fa-rocket' },
    { id: 'about', label: 'Nosotros', icon: 'fa-users' },
    { id: 'services', label: 'Servicios', icon: 'fa-briefcase' },
    { id: 'properties', label: 'Propiedades', icon: 'fa-building' },
    { id: 'testimonials', label: 'Reseñas', icon: 'fa-star' },
    { id: 'contact', label: 'Contacto', icon: 'fa-envelope' },
];

export default function AdminPanel({ onClose }) {
    const { content, setValue, resetContent, exportContent, importContent } = useAdmin();
    const [activeTab, setActiveTab] = useState('general');
    const fileRef = useRef(null);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    const handleImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => importContent(ev.target.result);
        reader.readAsText(file);
        e.target.value = '';
    };

    const handleImageUpload = (path) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => setValue(path, ev.target.result);
            reader.readAsDataURL(file);
        };
        input.click();
    };

    // Update an entire array path (used by add/delete/duplicate/reorder)
    const updateArray = (path, newArray) => setValue(path, newArray);

    return (
        <div className="ap-backdrop" onClick={onClose}>
            <div
                className="ap-container"
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                data-lenis-prevent
            >
                <aside className="ap-sidebar">
                    <div className="ap-sidebar-header">
                        <i className="fa-solid fa-gear" />
                        <span>Admin Panel</span>
                    </div>
                    <nav className="ap-nav">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                className={`ap-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <i className={`fa-solid ${tab.icon}`} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <div className="ap-sidebar-footer">
                        <button className="ap-sidebar-btn" onClick={onClose}>
                            <i className="fa-solid fa-xmark" /> Cerrar
                        </button>
                    </div>
                </aside>

                <main className="ap-main">
                    <div className="ap-main-header">
                        <h2>{TABS.find(t => t.id === activeTab)?.label}</h2>
                        <button className="ap-close-btn" onClick={onClose} aria-label="Cerrar">
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div className="ap-main-body">
                        {activeTab === 'general' && <GeneralTab content={content} setValue={setValue} resetContent={resetContent} exportContent={exportContent} importContent={importContent} fileRef={fileRef} handleImageUpload={handleImageUpload} />}
                        {activeTab === 'hero' && <HeroTab content={content} setValue={setValue} handleImageUpload={handleImageUpload} />}
                        {activeTab === 'about' && <AboutTab content={content} setValue={setValue} handleImageUpload={handleImageUpload} />}
                        {activeTab === 'services' && <ServicesTab content={content} setValue={setValue} handleImageUpload={handleImageUpload} updateArray={updateArray} />}
                        {activeTab === 'properties' && <PropertiesTab content={content} setValue={setValue} handleImageUpload={handleImageUpload} updateArray={updateArray} />}
                        {activeTab === 'testimonials' && <TestimonialsTab content={content} setValue={setValue} handleImageUpload={handleImageUpload} updateArray={updateArray} />}
                        {activeTab === 'contact' && <ContactTab content={content} setValue={setValue} />}
                    </div>
                </main>

                <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
            </div>
        </div>
    );
}

// ─── Reusable Components ─────────────────────────────────

function Field({ label, hint, path, value, setValue, type = 'text', placeholder = '' }) {
    const handleChange = (e) => setValue(path, e.target.value);
    return (
        <div className="ap-field">
            <label className="ap-label">{label}</label>
            {hint && <span className="ap-hint">{hint}</span>}
            {type === 'textarea' ? (
                <textarea className="ap-input ap-textarea" value={value || ''} onChange={handleChange} placeholder={placeholder} rows={3} />
            ) : (
                <input className="ap-input" type="text" value={value || ''} onChange={handleChange} placeholder={placeholder} />
            )}
        </div>
    );
}

function ImageField({ label, hint, path, value, handleImageUpload }) {
    return (
        <div className="ap-field">
            <label className="ap-label">{label}</label>
            {hint && <span className="ap-hint">{hint}</span>}
            <div className="ap-img-field">
                <div className="ap-img-preview">
                    {value && <img src={value} alt="" />}
                    {!value && <i className="fa-solid fa-image" />}
                </div>
                <button className="ap-img-btn" onClick={() => handleImageUpload(path)}>
                    <i className="fa-solid fa-cloud-arrow-up" /> Cambiar
                </button>
            </div>
        </div>
    );
}

function SectionTitle({ children, hint }) {
    return (
        <div className="ap-section-title-wrap">
            <h3 className="ap-section-title">{children}</h3>
            {hint && <p className="ap-section-hint">{hint}</p>}
        </div>
    );
}

function Divider() {
    return <div className="ap-divider" />;
}

function InfoBox({ icon = 'fa-circle-info', children }) {
    return (
        <div className="ap-info-box">
            <i className={`fa-solid ${icon}`} />
            <span>{children}</span>
        </div>
    );
}

// Card with action buttons (move up/down, duplicate, delete)
function ItemCard({ children, idx, total, num, title, onMoveUp, onMoveDown, onDuplicate, onDelete, deleteLabel = 'Eliminar' }) {
    return (
        <div className="ap-card">
            <div className="ap-card-header ap-card-header-actions">
                <div className="ap-card-header-left">
                    <span className="ap-card-num">#{num ?? idx + 1}</span>
                    <span>{title}</span>
                </div>
                <div className="ap-card-actions">
                    {onMoveUp && (
                        <button
                            type="button"
                            className="ap-icon-btn"
                            onClick={onMoveUp}
                            disabled={idx === 0}
                            title="Mover hacia arriba"
                        >
                            <i className="fa-solid fa-arrow-up" />
                        </button>
                    )}
                    {onMoveDown && (
                        <button
                            type="button"
                            className="ap-icon-btn"
                            onClick={onMoveDown}
                            disabled={idx === total - 1}
                            title="Mover hacia abajo"
                        >
                            <i className="fa-solid fa-arrow-down" />
                        </button>
                    )}
                    {onDuplicate && (
                        <button
                            type="button"
                            className="ap-icon-btn"
                            onClick={onDuplicate}
                            title="Duplicar (crear copia)"
                        >
                            <i className="fa-solid fa-copy" />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            type="button"
                            className="ap-icon-btn ap-icon-btn-del"
                            onClick={() => {
                                if (window.confirm(`¿${deleteLabel}? Esta acción no se puede deshacer.`)) onDelete();
                            }}
                            title={deleteLabel}
                        >
                            <i className="fa-solid fa-trash" />
                        </button>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

// Big "Add new" button at the bottom of a list
function AddItemBtn({ onClick, label, hint }) {
    return (
        <button type="button" className="ap-add-item" onClick={onClick}>
            <i className="fa-solid fa-circle-plus" />
            <div>
                <span className="ap-add-item-label">{label}</span>
                {hint && <small>{hint}</small>}
            </div>
        </button>
    );
}

// ─── Helpers ─────────────────────────────────────────────

const moveItem = (arr, from, to) => {
    if (to < 0 || to >= arr.length) return arr;
    const next = [...arr];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
};

const nextId = (items) => Math.max(0, ...items.map(i => i.id || 0)) + 1;

// ─── Tabs ────────────────────────────────────────────────

function GeneralTab({ content, setValue, resetContent, exportContent, fileRef, handleImageUpload }) {
    return (
        <>
            <InfoBox icon="fa-lightbulb">
                Aquí controlas el logo del negocio, su nombre y las acciones globales (exportar/importar todo el contenido).
            </InfoBox>

            <SectionTitle hint="El logo aparece en el navbar superior y en el footer. Recomendado: PNG transparente.">
                Logo y Marca
            </SectionTitle>
            <ImageField label="Logo" path="logo.src" value={content.logo.src} handleImageUpload={handleImageUpload} hint="PNG con fondo transparente, mínimo 200x200px" />
            <Field label="Nombre del negocio" path="logo.name" value={content.logo.name} setValue={setValue} hint="Aparece como alt-text del logo" />
            <Field label="Tagline" path="logo.tagline" value={content.logo.tagline} setValue={setValue} hint="Frase corta que define tu marca" />

            <Divider />
            <SectionTitle hint="Guarda copias de seguridad del contenido o restablece todo a los valores originales.">
                Acciones globales
            </SectionTitle>
            <div className="ap-actions-grid">
                <button className="ap-action-btn" onClick={exportContent} title="Descarga todo el contenido en un archivo JSON">
                    <i className="fa-solid fa-download" /> Exportar JSON
                </button>
                <button className="ap-action-btn" onClick={() => fileRef.current?.click()} title="Carga un archivo JSON previamente exportado">
                    <i className="fa-solid fa-upload" /> Importar JSON
                </button>
                <button className="ap-action-btn ap-action-danger" onClick={resetContent} title="Borra todos tus cambios y vuelve al contenido original">
                    <i className="fa-solid fa-rotate-left" /> Restablecer todo
                </button>
                <button className="ap-action-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(content, null, 2))} title="Copia el JSON al portapapeles">
                    <i className="fa-solid fa-clipboard" /> Copiar JSON
                </button>
            </div>
        </>
    );
}

function HeroTab({ content, setValue, handleImageUpload }) {
    const h = content.hero;
    return (
        <>
            <InfoBox icon="fa-lightbulb">
                El Hero es la primera pantalla que el visitante ve al entrar. Edita la foto de fondo, el título principal y los textos de los botones.
            </InfoBox>

            <SectionTitle>Imagen de fondo</SectionTitle>
            <ImageField label="Foto de fondo del Hero" path="hero.bg" value={h.bg} handleImageUpload={handleImageUpload} hint="Foto cinematográfica horizontal, mínimo 1600x900px" />

            <Divider />
            <SectionTitle>Textos principales</SectionTitle>
            <Field label="Tagline" path="hero.tagline" value={h.tagline} setValue={setValue} hint="Texto pequeño dorado arriba del título" />
            <Field label="Título (inicio)" path="hero.titleStart" value={h.titleStart} setValue={setValue} hint='Ej: "Encuentra el lugar ideal en"' />
            <Field label="Título (acento)" path="hero.titleAccent" value={h.titleAccent} setValue={setValue} hint='Ej: "Mexicali" — aparece en dorado' />
            <Field label="Descripción" path="hero.description" value={h.description} setValue={setValue} type="textarea" hint="Párrafo corto que explica el negocio" />

            <Divider />
            <SectionTitle>Botones</SectionTitle>
            <Field label="Botón primario" path="hero.primaryCta" value={h.primaryCta} setValue={setValue} hint="Texto del botón dorado principal" />
            <Field label="Botón secundario" path="hero.secondaryCta" value={h.secondaryCta} setValue={setValue} hint="Texto del botón con borde dorado" />

            <Divider />
            <SectionTitle>Confianza</SectionTitle>
            <Field label="Texto trust" path="hero.trustText" value={h.trustText} setValue={setValue} hint="Aparece junto a los avatares de clientes" />
            <Field label="Texto estrellas" path="hero.trustStarsLabel" value={h.trustStarsLabel} setValue={setValue} hint='Ej: "5.0 en Google"' />
            <Field label="Badge flotante" path="hero.badgeText" value={h.badgeText} setValue={setValue} hint="Texto del badge animado en esquina inferior derecha" />

            <Divider />
            <SectionTitle hint="Las 3 estadísticas que aparecen en grid debajo del Hero">
                Estadísticas
            </SectionTitle>
            {h.stats.map((s, i) => (
                <div key={i} className="ap-row">
                    <Field label={`Stat ${i + 1} valor`} path={`hero.stats.${i}.value`} value={s.value} setValue={setValue} />
                    <Field label={`Stat ${i + 1} label`} path={`hero.stats.${i}.label`} value={s.label} setValue={setValue} />
                </div>
            ))}
        </>
    );
}

function AboutTab({ content, setValue, handleImageUpload }) {
    const a = content.about;
    return (
        <>
            <InfoBox icon="fa-lightbulb">
                La sección "Sobre Nosotros" presenta tu historia, valores y al equipo. Las 4 imágenes forman el diamante animado.
            </InfoBox>

            <SectionTitle>Textos</SectionTitle>
            <Field label="Eyebrow" path="about.eyebrow" value={a.eyebrow} setValue={setValue} hint="Texto pequeño arriba del título" />
            <Field label="Título (inicio)" path="about.titleStart" value={a.titleStart} setValue={setValue} />
            <Field label="Título (acento)" path="about.titleEm" value={a.titleEm} setValue={setValue} hint="Aparece en cursiva dorada" />
            <Field label="Descripción" path="about.description" value={a.description} setValue={setValue} type="textarea" />
            <Field label="Texto del CTA" path="about.cta" value={a.cta} setValue={setValue} hint="Texto del botón dorado al final" />

            <Divider />
            <SectionTitle hint="4 imágenes que forman el grid en diamante. Recomendado: 800x800px cuadrada.">
                Imágenes del diamante
            </SectionTitle>
            <div className="ap-img-grid">
                {a.images.map((img, i) => (
                    <ImageField key={i} label={`Imagen ${i + 1}`} path={`about.images.${i}`} value={img} handleImageUpload={handleImageUpload} />
                ))}
            </div>

            <Divider />
            <SectionTitle hint="Lista de beneficios o promesas que ven los visitantes">
                Checklist
            </SectionTitle>
            {a.checklist.map((item, i) => (
                <Field key={i} label={`Item ${i + 1}`} path={`about.checklist.${i}`} value={item} setValue={setValue} />
            ))}

            <Divider />
            <SectionTitle hint="Información de la persona principal del equipo">
                Autora / Vendedora
            </SectionTitle>
            <ImageField label="Foto" path="about.authorImg" value={a.authorImg} handleImageUpload={handleImageUpload} hint="Foto retrato cuadrada, mínimo 200x200px" />
            <Field label="Nombre completo" path="about.authorName" value={a.authorName} setValue={setValue} />
            <Field label="Cargo" path="about.authorLabel" value={a.authorLabel} setValue={setValue} hint='Ej: "Asesora Inmobiliaria"' />
        </>
    );
}

function ServicesTab({ content, setValue, handleImageUpload, updateArray }) {
    const s = content.services;

    const addService = () => {
        const id = nextId(s.items);
        const newItem = {
            id,
            title: 'Nuevo servicio',
            desc: 'Describe brevemente este servicio.',
            icon: 'fa-house',
            bgImg: s.items[0]?.bgImg || '',
            bgPos: 'center',
        };
        updateArray('services.items', [...s.items, newItem]);
    };

    const duplicateService = (i) => {
        const copy = { ...s.items[i], id: nextId(s.items), title: s.items[i].title + ' (copia)' };
        updateArray('services.items', [...s.items.slice(0, i + 1), copy, ...s.items.slice(i + 1)]);
    };

    const deleteService = (i) => {
        updateArray('services.items', s.items.filter((_, idx) => idx !== i));
    };

    const moveService = (from, to) => {
        updateArray('services.items', moveItem(s.items, from, to));
    };

    return (
        <>
            <InfoBox icon="fa-lightbulb">
                Los servicios aparecen en un carrusel grande con auto-play. Puedes agregar, duplicar, mover o eliminar servicios.
            </InfoBox>

            <SectionTitle>Encabezado de la sección</SectionTitle>
            <Field label="Eyebrow" path="services.eyebrow" value={s.eyebrow} setValue={setValue} />
            <Field label="Título (inicio)" path="services.titleStart" value={s.titleStart} setValue={setValue} />
            <Field label="Título (acento)" path="services.titleEm" value={s.titleEm} setValue={setValue} hint="Aparece en cursiva dorada" />
            <Field label="Subtítulo" path="services.subtitle" value={s.subtitle} setValue={setValue} type="textarea" />

            <Divider />
            <SectionTitle hint="Cada servicio es una slide del carrusel. El admin puede agregar todos los que necesite.">
                Servicios ({s.items.length})
            </SectionTitle>

            {s.items.map((svc, i) => (
                <ItemCard
                    key={svc.id}
                    idx={i}
                    total={s.items.length}
                    num={svc.id}
                    title={svc.title}
                    onMoveUp={() => moveService(i, i - 1)}
                    onMoveDown={() => moveService(i, i + 1)}
                    onDuplicate={() => duplicateService(i)}
                    onDelete={() => deleteService(i)}
                    deleteLabel={`Eliminar "${svc.title}"`}
                >
                    <Field label="Título" path={`services.items.${i}.title`} value={svc.title} setValue={setValue} />
                    <Field label="Descripción" path={`services.items.${i}.desc`} value={svc.desc} setValue={setValue} type="textarea" />
                    <ImageField label="Imagen de fondo" path={`services.items.${i}.bgImg`} value={svc.bgImg} handleImageUpload={handleImageUpload} hint="Foto que se muestra en el slide" />
                    <Field label="Icono FontAwesome" path={`services.items.${i}.icon`} value={svc.icon} setValue={setValue} hint='Ej: "fa-house-user", "fa-building", "fa-shop"' />
                </ItemCard>
            ))}

            <AddItemBtn onClick={addService} label="Agregar nuevo servicio" hint="Crea un nuevo slide en el carrusel" />

            <Divider />
            <SectionTitle hint="Los 3 pasos del proceso que aparecen debajo del carrusel">
                Proceso (3 pasos)
            </SectionTitle>
            {s.process.map((step, i) => (
                <div key={i} className="ap-row">
                    <Field label={`Paso ${step.num} título`} path={`services.process.${i}.title`} value={step.title} setValue={setValue} />
                    <Field label={`Paso ${step.num} desc`} path={`services.process.${i}.desc`} value={step.desc} setValue={setValue} />
                </div>
            ))}
        </>
    );
}

function PropertiesTab({ content, setValue, handleImageUpload, updateArray }) {
    const p = content.properties;

    const addProperty = () => {
        const id = nextId(p.items);
        const newItem = {
            id,
            title: 'Nueva Propiedad',
            location: 'Mexicali, B.C.',
            price: '$0',
            priceLabel: 'MXN',
            img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            gallery: [],
            badge: 'En Venta',
            badgeDark: false,
            tag: 'Nueva',
            description: 'Describe esta propiedad.',
            features: [
                { icon: 'fa-bed', value: '0', label: 'Recámaras' },
                { icon: 'fa-bath', value: '0', label: 'Baños' },
                { icon: 'fa-ruler-combined', value: '0', label: 'm²' },
                { icon: 'fa-car', value: '0', label: 'Garage' },
            ],
        };
        updateArray('properties.items', [...p.items, newItem]);
    };

    const duplicateProperty = (i) => {
        const copy = { ...p.items[i], id: nextId(p.items), title: p.items[i].title + ' (copia)', gallery: [...(p.items[i].gallery || [])], features: p.items[i].features.map(f => ({ ...f })) };
        updateArray('properties.items', [...p.items.slice(0, i + 1), copy, ...p.items.slice(i + 1)]);
    };

    const deleteProperty = (i) => {
        updateArray('properties.items', p.items.filter((_, idx) => idx !== i));
    };

    const moveProperty = (from, to) => {
        updateArray('properties.items', moveItem(p.items, from, to));
    };

    const addGalleryImage = (propIdx) => {
        const current = p.items[propIdx].gallery || [];
        setValue(`properties.items.${propIdx}.gallery`, [...current, p.items[propIdx].img || '']);
    };

    const removeGalleryImage = (propIdx, imgIdx) => {
        const current = p.items[propIdx].gallery || [];
        setValue(`properties.items.${propIdx}.gallery`, current.filter((_, i) => i !== imgIdx));
    };

    return (
        <>
            <InfoBox icon="fa-lightbulb">
                Las propiedades se muestran en un carrusel paginado de 3 cards por página. Puedes agregar tantas propiedades como necesites — el carrusel calculará automáticamente cuántas páginas mostrar.
            </InfoBox>

            <SectionTitle>Encabezado de la sección</SectionTitle>
            <Field label="Eyebrow" path="properties.eyebrow" value={p.eyebrow} setValue={setValue} />
            <Field label="Título (inicio)" path="properties.titleStart" value={p.titleStart} setValue={setValue} />
            <Field label="Título (acento)" path="properties.titleEm" value={p.titleEm} setValue={setValue} />
            <Field label="Subtítulo" path="properties.subtitle" value={p.subtitle} setValue={setValue} type="textarea" />
            <div className="ap-row">
                <Field label="Counter número" path="properties.counterNum" value={p.counterNum} setValue={setValue} hint='Ej: "150+"' />
                <Field label="Counter label" path="properties.counterLabel" value={p.counterLabel} setValue={setValue} />
            </div>

            <Divider />
            <SectionTitle hint="Cada propiedad genera una card en el carrusel. Cuando se llenan 3 cards, se crea una nueva página automáticamente.">
                Propiedades ({p.items.length})
            </SectionTitle>

            {p.items.map((prop, i) => {
                const gallery = prop.gallery || [];
                return (
                    <ItemCard
                        key={prop.id}
                        idx={i}
                        total={p.items.length}
                        num={prop.id}
                        title={prop.title}
                        onMoveUp={() => moveProperty(i, i - 1)}
                        onMoveDown={() => moveProperty(i, i + 1)}
                        onDuplicate={() => duplicateProperty(i)}
                        onDelete={() => deleteProperty(i)}
                        deleteLabel={`Eliminar "${prop.title}"`}
                    >
                        <ImageField label="Imagen principal (card)" path={`properties.items.${i}.img`} value={prop.img} handleImageUpload={handleImageUpload} hint="Aparece en la card del carrusel y como portada" />

                        {/* Gallery editor */}
                        <p className="ap-sub-label">
                            Galería de fotos ({gallery.length})
                            <span className="ap-sub-hint"> · Estas fotos aparecen al hacer click en la propiedad</span>
                        </p>
                        <div className="ap-gallery-grid">
                            {gallery.map((src, gi) => (
                                <div key={gi} className="ap-gallery-item">
                                    <img src={src} alt="" />
                                    <div className="ap-gallery-actions">
                                        <button type="button" className="ap-gallery-btn" onClick={() => handleImageUpload(`properties.items.${i}.gallery.${gi}`)} title="Cambiar foto">
                                            <i className="fa-solid fa-pen" />
                                        </button>
                                        <button type="button" className="ap-gallery-btn ap-gallery-btn-del" onClick={() => removeGalleryImage(i, gi)} title="Eliminar foto">
                                            <i className="fa-solid fa-trash" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="ap-gallery-add" onClick={() => addGalleryImage(i)}>
                                <i className="fa-solid fa-plus" />
                                <span>Agregar foto</span>
                            </button>
                        </div>

                        <Field label="Título" path={`properties.items.${i}.title`} value={prop.title} setValue={setValue} />
                        <Field label="Ubicación" path={`properties.items.${i}.location`} value={prop.location} setValue={setValue} />
                        <Field label="Descripción" path={`properties.items.${i}.description`} value={prop.description} setValue={setValue} type="textarea" hint="Texto que aparece al abrir el modal" />
                        <div className="ap-row">
                            <Field label="Precio" path={`properties.items.${i}.price`} value={prop.price} setValue={setValue} hint='Ej: "$1,500,000"' />
                            <Field label="Label precio" path={`properties.items.${i}.priceLabel`} value={prop.priceLabel} setValue={setValue} hint='Ej: "MXN" o "/ mes"' />
                        </div>
                        <div className="ap-row">
                            <Field label="Badge" path={`properties.items.${i}.badge`} value={prop.badge} setValue={setValue} hint='"En Venta" o "En Renta"' />
                            <Field label="Tag" path={`properties.items.${i}.tag`} value={prop.tag} setValue={setValue} hint='Ej: "Premium", "Nueva"' />
                        </div>
                        <p className="ap-sub-label">Características (4 features rápidas)</p>
                        {prop.features.map((f, fi) => (
                            <div key={fi} className="ap-row">
                                <Field label={`Feature ${fi + 1} valor`} path={`properties.items.${i}.features.${fi}.value`} value={f.value} setValue={setValue} hint='Ej: "3"' />
                                <Field label={`Feature ${fi + 1} label`} path={`properties.items.${i}.features.${fi}.label`} value={f.label} setValue={setValue} hint='Ej: "Recámaras"' />
                            </div>
                        ))}
                    </ItemCard>
                );
            })}

            <AddItemBtn onClick={addProperty} label="Agregar nueva propiedad" hint="Crea una card nueva en el carrusel — se acomoda automáticamente" />
        </>
    );
}

function TestimonialsTab({ content, setValue, handleImageUpload, updateArray }) {
    const t = content.testimonials;

    const addReview = () => {
        const id = nextId(t.items);
        const newItem = {
            id,
            text: 'Escribe aquí el testimonio del cliente.',
            author: 'Nombre del cliente',
            label: 'Compra de casa',
            rating: 5.0,
            img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            date: 'Mes año',
        };
        updateArray('testimonials.items', [...t.items, newItem]);
    };

    const duplicateReview = (i) => {
        const copy = { ...t.items[i], id: nextId(t.items) };
        updateArray('testimonials.items', [...t.items.slice(0, i + 1), copy, ...t.items.slice(i + 1)]);
    };

    const deleteReview = (i) => {
        updateArray('testimonials.items', t.items.filter((_, idx) => idx !== i));
    };

    const moveReview = (from, to) => {
        updateArray('testimonials.items', moveItem(t.items, from, to));
    };

    return (
        <>
            <InfoBox icon="fa-lightbulb">
                Las reseñas aparecen como cards a la derecha de la sección. Puedes agregar todas las que quieras.
            </InfoBox>

            <SectionTitle>Encabezado</SectionTitle>
            <Field label="Eyebrow" path="testimonials.eyebrow" value={t.eyebrow} setValue={setValue} />
            <Field label="Título (inicio)" path="testimonials.titleStart" value={t.titleStart} setValue={setValue} />
            <Field label="Título (acento)" path="testimonials.titleEm" value={t.titleEm} setValue={setValue} />
            <Field label="Subtítulo" path="testimonials.subtitle" value={t.subtitle} setValue={setValue} type="textarea" />

            <Divider />
            <SectionTitle hint="Las 3 estadísticas que aparecen al lado izquierdo">
                Stats
            </SectionTitle>
            {t.stats.map((s, i) => (
                <div key={i} className="ap-row">
                    <Field label="Valor" path={`testimonials.stats.${i}.val`} value={s.val} setValue={setValue} />
                    <Field label="Label" path={`testimonials.stats.${i}.lbl`} value={s.lbl} setValue={setValue} />
                </div>
            ))}

            <Divider />
            <SectionTitle hint="Cada reseña es una card. Aparece con animación al hacer scroll.">
                Reseñas ({t.items.length})
            </SectionTitle>

            {t.items.map((item, i) => (
                <ItemCard
                    key={item.id}
                    idx={i}
                    total={t.items.length}
                    num={item.id}
                    title={item.author}
                    onMoveUp={() => moveReview(i, i - 1)}
                    onMoveDown={() => moveReview(i, i + 1)}
                    onDuplicate={() => duplicateReview(i)}
                    onDelete={() => deleteReview(i)}
                    deleteLabel={`Eliminar reseña de "${item.author}"`}
                >
                    <ImageField label="Foto del cliente" path={`testimonials.items.${i}.img`} value={item.img} handleImageUpload={handleImageUpload} hint="Foto retrato cuadrada" />
                    <Field label="Nombre" path={`testimonials.items.${i}.author`} value={item.author} setValue={setValue} />
                    <Field label="Tipo de servicio" path={`testimonials.items.${i}.label`} value={item.label} setValue={setValue} hint='Ej: "Compra de casa", "Renta de departamento"' />
                    <Field label="Fecha" path={`testimonials.items.${i}.date`} value={item.date} setValue={setValue} hint='Ej: "Marzo 2025"' />
                    <Field label="Texto de la reseña" path={`testimonials.items.${i}.text`} value={item.text} setValue={setValue} type="textarea" />
                </ItemCard>
            ))}

            <AddItemBtn onClick={addReview} label="Agregar nueva reseña" hint="Crea una nueva card con la reseña de un cliente" />
        </>
    );
}

function ContactTab({ content, setValue }) {
    const c = content.contact;
    return (
        <>
            <InfoBox icon="fa-lightbulb">
                Información de contacto que aparece en el footer y en los botones de acción (WhatsApp, Llamar). El número de WhatsApp debe estar en formato internacional sin espacios.
            </InfoBox>

            <SectionTitle hint="Banner que aparece arriba del footer">
                CTA Banner
            </SectionTitle>
            <Field label="Título CTA" path="contact.ctaTitle" value={c.ctaTitle} setValue={setValue} />
            <Field label="Subtítulo CTA" path="contact.ctaSubtitle" value={c.ctaSubtitle} setValue={setValue} />

            <Divider />
            <SectionTitle>Información de contacto</SectionTitle>
            <Field label="Dirección" path="contact.address" value={c.address} setValue={setValue} type="textarea" />
            <Field label="Teléfono" path="contact.phone" value={c.phone} setValue={setValue} hint='Visible en footer y botón "Llamar"' />
            <Field label="Email" path="contact.email" value={c.email} setValue={setValue} />
            <Field label="Sitio web" path="contact.website" value={c.website} setValue={setValue} />
            <Field label="WhatsApp (número)" path="contact.whatsapp" value={c.whatsapp} setValue={setValue} hint='Sin espacios. Ej: "5216864680112"' />

            <Divider />
            <SectionTitle>Horarios</SectionTitle>
            <Field label="Lunes-Viernes" path="contact.hoursWeek" value={c.hoursWeek} setValue={setValue} type="textarea" />
            <Field label="Sábado" path="contact.hoursSat" value={c.hoursSat} setValue={setValue} />
            <Field label="Domingo" path="contact.hoursSun" value={c.hoursSun} setValue={setValue} />
        </>
    );
}
