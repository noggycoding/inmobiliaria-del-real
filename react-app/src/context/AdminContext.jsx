import { createContext, useContext, useEffect, useState, useCallback } from 'react';

// ── Default content (single source of truth) ─────────────────
const defaultContent = {
    logo: {
        src: 'LOGO INMOBILIARIA.png',
        name: 'Inmobiliaria Del Real',
        tagline: 'Renta cerca de tu futuro',
    },
    hero: {
        bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=70',
        tagline: 'Renta cerca de tu futuro',
        titleStart: 'Encuentra el lugar ideal en',
        titleAccent: 'Mexicali',
        description:
            'Especialistas en renta, venta y compra de casas, departamentos, locales comerciales y terrenos. Tu patrimonio en manos de profesionales que conocen la ciudad.',
        primaryCta: 'Explorar Propiedades',
        secondaryCta: 'Hablar con un Asesor',
        trustText: '100+ familias confían en nosotros',
        trustStarsLabel: '5.0 en Google',
        badgeText: 'Contratos Seguros',
        stats: [
            { value: '5.0', label: 'Calificación Google' },
            { value: '150+', label: 'Propiedades gestionadas' },
            { value: '+5 años', label: 'En Mexicali' },
        ],
    },
    about: {
        eyebrow: 'Sobre Nosotros',
        titleStart: 'Conoce a',
        titleEm: 'Del Real',
        description:
            'Somos una agencia inmobiliaria con presencia consolidada en Mexicali, B.C. Claudia Del Real y su equipo te acompañan con honestidad y experiencia desde el primer contacto hasta las llaves en tu mano. Hablamos claro, conocemos el mercado local y respondemos rápido.',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        checklist: [
            'Respuesta rápida en menos de 24h',
            'Sin letras pequeñas en contratos',
            'Conocimiento profundo de Mexicali',
            'Trato directo y honesto',
        ],
        authorName: 'Claudia Del Real',
        authorLabel: 'Asesora Inmobiliaria',
        authorImg: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        cta: 'Hablar con Claudia',
    },
    services: {
        eyebrow: 'Lo que hacemos',
        titleStart: 'Nuestros',
        titleEm: 'Servicios',
        subtitle:
            'Soluciones inmobiliarias integrales en Mexicali, B.C., diseñadas para acompañarte en cada etapa del camino hacia tu propiedad ideal.',
        items: [
            { id: 1, title: 'Renta de Casas', desc: 'Encuentra el hogar perfecto para ti y tu familia con nuestras opciones cuidadosamente seleccionadas en Mexicali.', icon: 'fa-house-user', bgImg: 'img-svc-casas.png', bgPos: 'center top' },
            { id: 2, title: 'Venta de Casas', desc: 'Te acompañamos en todo el proceso garantizando un trato justo, seguro y al mejor precio del mercado.', icon: 'fa-house-flag', bgImg: 'img-svc-casas.png', bgPos: 'center bottom' },
            { id: 3, title: 'Departamentos', desc: 'Opciones modernas y céntricas para quienes buscan practicidad, seguridad y comodidad en la ciudad.', icon: 'fa-building', bgImg: 'img-svc-departamentos.jpg', bgPos: 'center' },
            { id: 4, title: 'Locales Comerciales', desc: 'Espacios estratégicamente ubicados para el éxito y crecimiento de tu negocio en Mexicali.', icon: 'fa-shop', bgImg: 'img-svc-comercial.png', bgPos: 'center' },
            { id: 5, title: 'Terrenos', desc: 'Oportunidades de inversión en terrenos residenciales y comerciales con alta plusvalía en Baja California.', icon: 'fa-map', bgImg: 'img-svc-terrenos.jpg', bgPos: 'center' },
            { id: 6, title: 'Asesoría Legal', desc: 'Orientación experta en contratos, escrituras y trámites para brindarte total seguridad jurídica.', icon: 'fa-scale-balanced', bgImg: 'img-svc-terrenos.jpg', bgPos: 'right center' },
        ],
        process: [
            { num: '01', title: 'Consulta Inicial', desc: 'Escuchamos tus necesidades y presupuesto para entender qué buscas.' },
            { num: '02', title: 'Selección Personalizada', desc: 'Filtramos opciones reales del mercado que se adaptan a tu perfil.' },
            { num: '03', title: 'Visita y Cierre', desc: 'Te acompañamos en visitas y cerramos con contratos transparentes.' },
        ],
    },
    properties: {
        eyebrow: 'Portafolio',
        titleStart: 'Selección',
        titleEm: 'Destacada',
        subtitle: 'Propiedades verificadas, con fotos reales y disponibles para visitar hoy. Cada una ha sido evaluada por nuestro equipo.',
        counterNum: '150+',
        counterLabel: 'Propiedades gestionadas',
        items: [
            {
                id: 1, title: 'Residencia de Lujo San Pedro', location: 'San Pedro Residencial, Mexicali',
                price: '$4,200,000', priceLabel: 'MXN',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1600566753086-00f18fe6ba66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Venta', badgeDark: false, tag: 'Premium',
                description: 'Hermosa residencia de lujo con acabados premium, amplio jardín, cocina integral, sala de TV, estudio y terraza con vista panorámica. Ubicada en una de las zonas más exclusivas de Mexicali con seguridad 24/7.',
                antiquity: '3 años', parking: '2 lugares', condition: 'Excelente',
                features: [
                    { icon: 'fa-bed', value: '4', label: 'Recámaras' },
                    { icon: 'fa-bath', value: '3', label: 'Baños' },
                    { icon: 'fa-ruler-combined', value: '320', label: 'm²' },
                    { icon: 'fa-car', value: '2', label: 'Garage' },
                ],
            },
            {
                id: 2, title: 'Departamento UABC Central', location: 'Zona UABC Central, Mexicali',
                price: '$8,500', priceLabel: '/ mes',
                img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Renta', badgeDark: true, tag: 'Popular',
                description: 'Departamento moderno totalmente amueblado, ideal para estudiantes o profesionistas. A 5 minutos de la UABC, con acceso a áreas comunes, gym y alberca. Incluye servicios de mantenimiento.',
                features: [
                    { icon: 'fa-bed', value: '2', label: 'Recámaras' },
                    { icon: 'fa-bath', value: '1', label: 'Baño' },
                    { icon: 'fa-ruler-combined', value: '95', label: 'm²' },
                    { icon: 'fa-car', value: '1', label: 'Estac.' },
                ],
            },
            {
                id: 3, title: 'Local Comercial Blvd. Lázaro C.', location: 'Blvd. Lázaro Cárdenas, Mexicali',
                price: '$2,800,000', priceLabel: 'MXN',
                img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
                    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
                ],
                badge: 'En Venta', badgeDark: false, tag: 'Inversión',
                description: 'Local comercial en excelente ubicación sobre Blvd. Lázaro Cárdenas, una de las avenidas más transitadas. Ideal para restaurante, clínica u oficina. Cuenta con instalación eléctrica de 220v y dos accesos independientes.',
                features: [
                    { icon: 'fa-building', value: '1', label: 'Nivel' },
                    { icon: 'fa-ruler-combined', value: '180', label: 'm²' },
                    { icon: 'fa-door-open', value: '2', label: 'Accesos' },
                    { icon: 'fa-bolt', value: '220v', label: 'Eléctrica' },
                ],
            },
            {
                id: 4, title: 'Casa en Col. Burocrata', location: 'Col. Burocrata Federal, Mexicali',
                price: '$1,850,000', priceLabel: 'MXN',
                img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Venta', badgeDark: false, tag: 'Oportunidad',
                description: 'Casa en excelente ubicación en colonia Burocrata Federal, cerca de escuelas, hospitales y centros comerciales. Cuenta con cocina remodelada, patio trasero y cuarto de lavado independiente.',
                features: [
                    { icon: 'fa-bed', value: '3', label: 'Recámaras' },
                    { icon: 'fa-bath', value: '2', label: 'Baños' },
                    { icon: 'fa-ruler-combined', value: '140', label: 'm²' },
                    { icon: 'fa-car', value: '1', label: 'Garage' },
                ],
            },
            {
                id: 5, title: 'Departamento Amueblado Centro', location: 'Centro Cívico, Mexicali',
                price: '$6,500', priceLabel: '/ mes',
                img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Renta', badgeDark: true, tag: 'Amueblado',
                description: 'Departamento completamente amueblado en el corazón del Centro Cívico. Internet incluido, edificio con seguridad 24/7, elevador y estacionamiento techado. Ideal para profesionistas.',
                features: [
                    { icon: 'fa-bed', value: '1', label: 'Recámara' },
                    { icon: 'fa-bath', value: '1', label: 'Baño' },
                    { icon: 'fa-ruler-combined', value: '65', label: 'm²' },
                    { icon: 'fa-car', value: '1', label: 'Parking' },
                ],
            },
            {
                id: 6, title: 'Casa con Alberca Residencial', location: 'Residencial del Parque, Mexicali',
                price: '$3,500,000', priceLabel: 'MXN',
                img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Venta', badgeDark: false, tag: 'Premium',
                description: 'Espectacular residencia con alberca privada, jardín amplio, sala de juegos y estudio. Fraccionamiento cerrado con vigilancia permanente. Acabados de primer nivel, cocina integral importada.',
                features: [
                    { icon: 'fa-bed', value: '4', label: 'Recámaras' },
                    { icon: 'fa-bath', value: '3', label: 'Baños' },
                    { icon: 'fa-ruler-combined', value: '280', label: 'm²' },
                    { icon: 'fa-car', value: '2', label: 'Garage' },
                ],
            },
            {
                id: 7, title: 'Casa Nueva Fracc. Las Palmas', location: 'Fracc. Las Palmas, Mexicali',
                price: '$2,150,000', priceLabel: 'MXN',
                img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Venta', badgeDark: false, tag: 'Nueva',
                description: 'Casa nueva estreno en Fraccionamiento Las Palmas, con acabados modernos, cocina abierta integrada a sala-comedor, patio y cuarto de servicio. Todos los servicios cercanos a 5 minutos.',
                antiquity: 'Nueva', condition: 'Estreno', parking: '1 lugar',
                features: [
                    { icon: 'fa-bed', value: '3', label: 'Recámaras' },
                    { icon: 'fa-bath', value: '2', label: 'Baños' },
                    { icon: 'fa-ruler-combined', value: '160', label: 'm²' },
                    { icon: 'fa-car', value: '1', label: 'Garage' },
                ],
            },
            {
                id: 8, title: 'Departamento Penthouse Vista', location: 'Col. Nueva, Mexicali',
                price: '$12,000', priceLabel: '/ mes',
                img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Renta', badgeDark: true, tag: 'Exclusivo',
                description: 'Penthouse de lujo en el último piso con terraza panorámica, sala con doble altura, cocina gourmet equipada y 2 cajones de estacionamiento. Edificio con seguridad 24/7 y amenidades premium.',
                antiquity: '2 años', condition: 'Excelente', parking: '2 lugares',
                features: [
                    { icon: 'fa-bed', value: '2', label: 'Recámaras' },
                    { icon: 'fa-bath', value: '2', label: 'Baños' },
                    { icon: 'fa-ruler-combined', value: '130', label: 'm²' },
                    { icon: 'fa-car', value: '2', label: 'Parking' },
                ],
            },
            {
                id: 9, title: 'Terreno Residencial Garita', location: 'Zona Garita, Mexicali',
                price: '$950,000', priceLabel: 'MXN',
                img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1574691250077-03a929faece5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                ],
                badge: 'En Venta', badgeDark: false, tag: 'Inversión',
                description: 'Terreno plano con todos los servicios municipales en zona de alta plusvalía cerca de la Garita Internacional. Escrituras en orden, listo para construir. Excelente oportunidad de inversión.',
                condition: 'Escriturado', parking: 'No aplica',
                features: [
                    { icon: 'fa-ruler-combined', value: '350', label: 'm²' },
                    { icon: 'fa-map', value: '14×25', label: 'Dimensión' },
                    { icon: 'fa-droplet', value: 'Sí', label: 'Agua' },
                    { icon: 'fa-bolt', value: 'Sí', label: 'Luz' },
                ],
            },
        ],
    },
    testimonials: {
        eyebrow: 'Testimonios',
        titleStart: 'Lo que dicen',
        titleEm: 'Nuestros Clientes',
        subtitle: 'La satisfacción de nuestros clientes es nuestra mejor carta de presentación. Relaciones basadas en confianza, honestidad y resultados.',
        stats: [
            { val: '100+', lbl: 'Clientes felices', icon: 'fa-users' },
            { val: '10+', lbl: 'Años de experiencia', icon: 'fa-trophy' },
            { val: '5.0', lbl: 'Calificación Google', icon: 'fa-star' },
        ],
        items: [
            { id: 1, text: 'Excelente lugar para comprar tu casa, muy amables y siempre son claros y muy profesionales. La atención de Claudia fue excepcional en todo el proceso.', author: 'Rosa Pérez', label: 'Compra de casa', rating: 5.0, img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', date: 'Marzo 2025' },
            { id: 2, text: 'Muy bonito lugar. Me atendieron de buena manera al pedir informes de renta de departamentos. Definitivamente la mejor opción en Mexicali.', author: 'Christopher Rincón', label: 'Renta de departamento', rating: 5.0, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', date: 'Enero 2025' },
            { id: 3, text: '¡Me encanta! 100% recomendado. El trato es directo, sin letras pequeñas y siempre están disponibles para resolver cualquier duda durante el trámite.', author: 'Fer Miauuu', label: 'Renta de casa', rating: 5.0, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', date: 'Noviembre 2024' },
        ],
    },
    contact: {
        address: 'Blvd. Lázaro Cárdenas 569, Jardines del Lago, Mexicali B.C. CP 21330',
        phone: '686 468 0112',
        email: 'claudia.del.real123@gmail.com',
        website: 'inmobiliariadelreal.com',
        hoursWeek: 'Lunes – Viernes\n10:00 a.m. – 6:00 p.m.',
        hoursSat: 'Sábado\n10:00 a.m. – 2:00 p.m.',
        hoursSun: 'Domingo: Cerrado',
        whatsapp: '5216864680112',
        ctaTitle: '¿Listo para encontrar tu próximo hogar?',
        ctaSubtitle: 'Agenda una cita sin compromiso y cuéntanos qué estás buscando.',
    },
};

const STORAGE_KEY = 'inmobiliaria_admin_content_v3';

const AdminContext = createContext(null);

// Deep merge to keep adding new defaults without losing user changes
function deepMerge(target, source) {
    if (Array.isArray(target) && Array.isArray(source)) return source;
    if (typeof target !== 'object' || target === null) return source ?? target;
    const result = { ...target };
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            result[key] = key in target ? deepMerge(target[key], source[key]) : source[key];
        }
    }
    return result;
}

export function AdminProvider({ children, isAdmin = false }) {
    const [content, setContent] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return deepMerge(defaultContent, JSON.parse(stored));
        } catch (err) {
            console.warn('Could not read content from storage', err);
        }
        return defaultContent;
    });

    const [editingPath, setEditingPath] = useState(null);
    const [editingType, setEditingType] = useState(null);

    // Persist on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        } catch (err) {
            console.warn('Could not save content', err);
        }
    }, [content]);

    // Get value from a path string like "hero.title" or "hero.stats.0.value"
    const getValue = useCallback((path) => {
        const keys = path.split('.');
        let value = content;
        for (const key of keys) {
            if (value == null) return undefined;
            value = value[key];
        }
        return value;
    }, [content]);

    // Set value at path immutably
    const setValue = useCallback((path, newValue) => {
        const keys = path.split('.');
        setContent((prev) => {
            const clone = JSON.parse(JSON.stringify(prev));
            let target = clone;
            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
            }
            target[keys[keys.length - 1]] = newValue;
            return clone;
        });
    }, []);

    const resetContent = useCallback(() => {
        if (window.confirm('¿Restablecer todo el contenido a los valores originales? Esta acción no se puede deshacer.')) {
            setContent(defaultContent);
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (err) {
                console.warn('Could not clear storage', err);
            }
        }
    }, []);

    const exportContent = useCallback(() => {
        const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inmobiliaria-content-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [content]);

    const importContent = useCallback((jsonText) => {
        try {
            const parsed = JSON.parse(jsonText);
            setContent(deepMerge(defaultContent, parsed));
            return true;
        } catch {
            return false;
        }
    }, []);

    const openEditor = useCallback((path, type = 'text') => {
        setEditingPath(path);
        setEditingType(type);
    }, []);

    const closeEditor = useCallback(() => {
        setEditingPath(null);
        setEditingType(null);
    }, []);

    return (
        <AdminContext.Provider
            value={{
                isAdmin,
                content,
                getValue,
                setValue,
                resetContent,
                exportContent,
                importContent,
                editingPath,
                editingType,
                openEditor,
                closeEditor,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
    return ctx;
}
