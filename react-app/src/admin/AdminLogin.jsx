import { useState } from 'react';

// Admin credentials
const ADMIN_USER = 'admin@inmobiliariadelreal.com';
const ADMIN_PASS = 'DelReal@2025!';

export default function AdminLogin({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === ADMIN_USER && pass === ADMIN_PASS) {
            onSuccess();
        } else {
            setError('Correo o contraseña incorrectos');
            setShake(true);
            setPass('');
            setTimeout(() => setShake(false), 600);
        }
    };

    return (
        <div className="admin-login-backdrop">
            <div className={`admin-login-box ${shake ? 'shake' : ''}`}>
                <div className="admin-login-icon">
                    <i className="fa-solid fa-shield-halved" />
                </div>

                <h2 className="admin-login-title">Panel de Administración</h2>
                <p className="admin-login-sub">Acceso exclusivo — ingresa tus credenciales</p>

                <form onSubmit={handleSubmit} className="admin-login-form" autoComplete="off">
                    <div className="admin-login-field">
                        <label className="admin-login-label">
                            <i className="fa-solid fa-envelope" /> Correo
                        </label>
                        <input
                            type="email"
                            className={`admin-login-input ${error ? 'error' : ''}`}
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            autoComplete="username"
                        />
                    </div>

                    <div className="admin-login-field">
                        <label className="admin-login-label">
                            <i className="fa-solid fa-lock" /> Contraseña
                        </label>
                        <input
                            type="password"
                            className={`admin-login-input ${error ? 'error' : ''}`}
                            placeholder="••••••••"
                            value={pass}
                            onChange={(e) => { setPass(e.target.value); setError(''); }}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="admin-login-error-box">
                            <i className="fa-solid fa-circle-xmark" />
                            {error}
                        </div>
                    )}

                    <button type="submit" className="admin-login-btn">
                        <i className="fa-solid fa-right-to-bracket" />
                        Iniciar sesión
                    </button>
                </form>

                <p className="admin-login-footer">
                    <i className="fa-solid fa-circle-info" />
                    Solo personal autorizado
                </p>
            </div>
        </div>
    );
}
