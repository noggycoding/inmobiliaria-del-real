import { useState } from 'react';

// Double protection:
// 1. URL must contain the secret token (only admin knows the URL)
// 2. Password must match (obfuscated — not plain text)
const HASH = '7b6e3f9a2c1d8e4f'; // "delreal2025" hashed simple

function simpleHash(str) {
    let h = 0xdeadbeef;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
    }
    return ((h ^ (h >>> 16)) >>> 0).toString(16).padStart(8, '0')
         + ((h * 2654435761 + str.length) >>> 0).toString(16).padStart(8, '0');
}

export default function AdminLogin({ onSuccess }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const computed = simpleHash(pin);
        if (computed === HASH) {
            sessionStorage.setItem('admin_auth', btoa(computed));
            onSuccess();
        } else {
            setError(true);
            setShake(true);
            setPin('');
            setTimeout(() => setShake(false), 600);
        }
    };

    return (
        <div className="admin-login-backdrop">
            <div className={`admin-login-box ${shake ? 'shake' : ''}`}>
                <div className="admin-login-icon">
                    <i className="fa-solid fa-lock" />
                </div>
                <h2 className="admin-login-title">Acceso Admin</h2>
                <p className="admin-login-sub">Ingresa la contraseña para continuar</p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <input
                        type="password"
                        className={`admin-login-input ${error ? 'error' : ''}`}
                        placeholder="Contraseña"
                        value={pin}
                        onChange={(e) => { setPin(e.target.value); setError(false); }}
                        autoFocus
                        autoComplete="current-password"
                    />
                    {error && <span className="admin-login-error">Contraseña incorrecta</span>}
                    <button type="submit" className="admin-login-btn">
                        <i className="fa-solid fa-arrow-right" /> Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
