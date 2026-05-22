import { useAdmin } from '../context/AdminContext';

/**
 * Wraps any text element. In admin mode, clicking opens the editor.
 * Works even inside buttons/links because the blocker allows .admin-editable clicks.
 */
export default function EditableText({ path, tag: Tag = 'span', children, className = '', style = {} }) {
    const { isAdmin, getValue, openEditor } = useAdmin();
    const value = getValue(path);

    const handleClick = (e) => {
        if (!isAdmin) return;
        // Stop propagation so the parent link/button doesn't fire
        e.preventDefault();
        e.stopPropagation();
        openEditor(path, 'text');
    };

    // In visitor mode, render plain element
    if (!isAdmin) {
        return <Tag className={className} style={style}>{value ?? children}</Tag>;
    }

    // In admin mode, add editable markers
    return (
        <Tag
            className={`${className} admin-editable admin-editable-text`.trim()}
            style={{ ...style, cursor: 'pointer' }}
            onClick={handleClick}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            data-admin-path={path}
        >
            {value ?? children}
        </Tag>
    );
}
