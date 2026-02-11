import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Architecture from './components/Architecture';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  
  return (
    <>
      <Navbar />
      
      {!hasEntered ? (
        // STATE 1: LANDING PAGE (Full Screen Hero)
        <Hero onEnter={() => setHasEntered(true)} />
      ) : (
        // STATE 2: MAIN APP (Dashboard + Content)
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          
          {/* Background Layer (Fixed) */}
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
             <Hero isBackground={true} /> 
          </div>
          
          {/* Content Layer (Scrollable) */}
          <div style={{ 
            position: 'relative', 
            zIndex: 10, 
            paddingTop: '120px', /* Memberi jarak dari Navbar */
            background: 'linear-gradient(180deg, rgba(2,2,10,0) 0%, rgba(2,2,10,0.8) 20%, rgba(2,2,10,1) 100%)'
          }}>
             <Dashboard />
             <Stats />
             <Architecture />
             <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;