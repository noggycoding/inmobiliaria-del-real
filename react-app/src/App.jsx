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

// Admin mode is triggered by ?admin in the URL
const wantsAdmin = window.location.search.includes('admin');

// Check if already authenticated in this session
// We store a flag only AFTER successful password entry
const isSessionAuthed = () => sessionStorage.getItem('adm_ok') === 'yes';

function App() {
    const [introDone, setIntroDone] = useState(false);
    const [adminAuthed, setAdminAuthed] = useState(isSessionAuthed);

    // If admin URL is requested
    if (wantsAdmin) {
        // Not authenticated → always show login
        if (!adminAuthed) {
            return (
                <AdminLogin
                    onSuccess={() => {
                        sessionStorage.setItem('adm_ok', 'yes');
                        setAdminAuthed(true);
                        // Add class now that we're in
                        document.body.classList.add('admin-mode');
                    }}
                />
            );
        }

        // Authenticated → show admin interface
        document.body.classList.add('admin-mode');
        return (
            <AdminProvider isAdmin={true}>
                <AdminToolbar />
                <EditorModal />
                <Navbar />
                <main>
                    <Hero introDone={true} />
                    <About introDone={true} />
                    <Services introDone={true} />
                    <Properties introDone={true} />
                    <Testimonials introDone={true} />
                </main>
                <Footer introDone={true} />
            </AdminProvider>
        );
    }

    // Normal visitor mode — no admin access at all
    return (
        <AdminProvider isAdmin={false}>
            <IntroScreen onFinish={() => setIntroDone(true)} />
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
