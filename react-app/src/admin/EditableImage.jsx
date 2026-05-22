import { useAdmin } from '../context/AdminContext';

/**
 * Wraps an image. In admin mode, clicking opens image editor.
 * Works inside links/buttons because the blocker allows .admin-editable clicks.
 */
export default function EditableImage({ path, alt = '', className = '', style = {} }) {
    const { isAdmin, getValue, openEditor } = useAdmin();
    const src = getValue(path);

    const handleClick = (e) => {
        if (!isAdmin) return;
        e.preventDefault();
        e.stopPropagation();
        openEditor(path, 'image');
    };

    // Visitor mode: plain image
    if (!isAdmin) {
        return <img src={src} alt={alt} className={className} style={style} loading="lazy" />;
    }

    // Admin mode: clickable with overlay
    return (
        <div
            className="admin-editable admin-editable-img"
            onClick={handleClick}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{ position: 'relative', display: 'inline-block', ...style }}
            data-admin-path={path}
        >
            <img src={src} alt={alt} className={className} loading="lazy" />
            <div className="admin-img-overlay">
                <i className="fa-solid fa-camera" />
                <span>Cambiar</span>
            </div>
        </div>
    );
}
