import React, { useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Projects } from './components/Projects/Projects';
import { FeaturedProject } from './components/Featured/FeaturedProject';
import { Skills } from './components/Skills/Skills';
import { Experience } from './components/Experience/Experience';
import { Services } from './components/Services/Services';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { setIsAdminOpen } = usePortfolio();

  // Register Ctrl+Shift+A or Cmd+Shift+A shortcut to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdminOpen]);

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#f4f4f6] selection:bg-amber-500/20 selection:text-amber-200">
      {/* 1. Global Navigation */}
      <Navbar />

      <main>
        {/* 2. Liquid Reveal Hero */}
        <Hero />

        {/* 3. About & Statistics */}
        <About />

        {/* 4. Selected Work / Projects */}
        <Projects />

        {/* 5. Immersive Featured Showcase */}
        <FeaturedProject />

        {/* 6. Skills & Technologies */}
        <Skills />

        {/* 7. Experience / Career Milestones */}
        <Experience />

        {/* 8. Capabilities & Services */}
        <Services />

        {/* 9. Contact / Transmission */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* 11. Password-Protected Admin CMS Dashboard */}
      <AdminDashboard />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <MainLayout />
    </PortfolioProvider>
  );
};

export default App;
