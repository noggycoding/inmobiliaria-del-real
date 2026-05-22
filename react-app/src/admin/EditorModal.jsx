import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function EditorModal() {
    const { isAdmin, editingPath, editingType, getValue, setValue, closeEditor } = useAdmin();
    const [localValue, setLocalValue] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const inputRef = useRef(null);
    const fileRef = useRef(null);

    /* eslint-disable react-hooks/set-state-in-effect */
    // Sync external editing target into local form state
    useEffect(() => {
        if (editingPath) {
            const val = getValue(editingPath) || '';
            setLocalValue(val);
            if (editingType === 'image') setPreviewUrl(val);
        } else {
            setLocalValue('');
            setPreviewUrl('');
        }
    }, [editingPath, editingType, getValue]);
    /* eslint-enable react-hooks/set-state-in-effect */

    useEffect(() => {
        if (editingPath && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [editingPath]);

    if (!isAdmin || !editingPath) return null;

    const handleSave = () => {
        if (editingType === 'image') {
            setValue(editingPath, previewUrl || localValue);
        } else {
            setValue(editingPath, localValue);
        }
        closeEditor();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setPreviewUrl(ev.target.result);
            setLocalValue(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUrlChange = (url) => {
        setLocalValue(url);
        setPreviewUrl(url);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === 'Escape') closeEditor();
    };

    const pathLabel = editingPath.split('.').slice(-1)[0];

    return (
        <div className="editor-modal-backdrop" onClick={closeEditor}>
            <div className="editor-modal" onClick={(e) => e.stopPropagation()}>
                <div className="editor-modal-header">
                    <div>
                        <h3>
                            {editingType === 'image' ? 'Cambiar imagen' : 'Editar texto'}
                        </h3>
                        <span className="editor-modal-path">{editingPath}</span>
                    </div>
                    <button className="editor-modal-close" onClick={closeEditor} aria-label="Cerrar">
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <div className="editor-modal-body">
                    {editingType === 'image' ? (
                        <>
                            {/* Preview */}
                            <div className="editor-img-preview">
                                {previewUrl && (
                                    <img src={previewUrl} alt="Preview" />
                                )}
                                {!previewUrl && (
                                    <div className="editor-img-empty">
                                        <i className="fa-solid fa-image" />
                                        <span>Sin imagen</span>
                                    </div>
                                )}
                            </div>

                            {/* Upload file */}
                            <button
                                className="editor-upload-btn"
                                onClick={() => fileRef.current?.click()}
                            >
                                <i className="fa-solid fa-cloud-arrow-up" />
                                Subir imagen desde tu dispositivo
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />

                            {/* Or URL */}
                            <div className="editor-divider">
                                <span>o pega una URL</span>
                            </div>
                            <input
                                ref={inputRef}
                                type="url"
                                className="editor-input"
                                value={localValue}
                                onChange={(e) => handleUrlChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </>
                    ) : (
                        <>
                            <label className="editor-label">
                                Contenido ({pathLabel})
                            </label>
                            {localValue.length > 80 ? (
                                <textarea
                                    ref={inputRef}
                                    className="editor-textarea"
                                    value={localValue}
                                    onChange={(e) => setLocalValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    rows={4}
                                />
                            ) : (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="editor-input"
                                    value={localValue}
                                    onChange={(e) => setLocalValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            )}
                            <p className="editor-hint">
                                Enter para guardar · Esc para cancelar
                            </p>
                        </>
                    )}
                </div>

                <div className="editor-modal-footer">
                    <button className="editor-btn editor-btn-cancel" onClick={closeEditor}>
                        Cancelar
                    </button>
                    <button className="editor-btn editor-btn-save" onClick={handleSave}>
                        <i className="fa-solid fa-check" />
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
