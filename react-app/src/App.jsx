import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Properties from './components/Properties';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import './index.css';

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <IntroScreen onFinish={() => setIntroDone(true)} />
      <Navbar />
      <Hero introDone={introDone} />
      <About introDone={introDone} />
      <Services introDone={introDone} />
      <Properties introDone={introDone} />
      <Testimonials introDone={introDone} />
      <Footer introDone={introDone} />
      <WhatsAppFloat />
    </>
  );
}

export default App;
