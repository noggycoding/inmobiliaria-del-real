import { useState } from 'react';

// Simple PIN — change this to whatever you want
const ADMIN_PIN = 'delreal2025';

export default function AdminLogin({ onSuccess }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            sessionStorage.setItem('admin_auth', '1');
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
