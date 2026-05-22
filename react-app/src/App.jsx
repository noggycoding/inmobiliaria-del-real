import { useState } from 'react';
import { AdminProvider } from './context/AdminContext';
import AdminToolbar from './admin/AdminToolbar';
import AdminLogin from './admin/AdminLogin';
import EditorModal from './admin/EditorModal';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Properties from './components/Properties';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './index.css';
import './admin/admin.css';
import './admin/adminpanel.css';

// Admin mode: secret path + password
// The URL must contain the secret token AND the password must be correct
const ADMIN_SECRET = 'xK9mP3qZ7wR2nL5v'; // secret URL token
const isAdmin = window.location.search.includes(`token=${ADMIN_SECRET}`);

if (isAdmin) {
    document.body.classList.add('admin-mode');
}

function App() {
    const [introDone, setIntroDone] = useState(isAdmin);
    const [adminAuthed, setAdminAuthed] = useState(
        () => {
            const stored = sessionStorage.getItem('admin_auth');
            // Validate it's not empty/tampered
            return stored && stored.length > 10;
        }
    );

    // If admin URL but not authenticated yet, show login
    if (isAdmin && !adminAuthed) {
        return <AdminLogin onSuccess={() => setAdminAuthed(true)} />;
    }

    return (
        <AdminProvider isAdmin={isAdmin}>
            <AdminToolbar />
            <EditorModal />
            {!isAdmin && <IntroScreen onFinish={() => setIntroDone(true)} />}
            {introDone && <Navbar />}
            <main>
                <Hero introDone={introDone} />
                <About introDone={introDone} />
                <Services introDone={introDone} />
                <Properties introDone={introDone} />
                <Testimonials introDone={introDone} />
            </main>
            <Footer introDone={introDone} />
        </AdminProvider>
    );
}

export default App;
