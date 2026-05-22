import { useState } from 'react';
import { AdminProvider } from './context/AdminContext';
import AdminToolbar from './admin/AdminToolbar';
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

// Detect admin mode and apply class once at module load
const isAdmin = window.location.search.includes('admin') ||
                window.location.hash.includes('admin');

if (isAdmin) {
    document.body.classList.add('admin-mode');
}

function App() {
    const [introDone, setIntroDone] = useState(isAdmin);

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
