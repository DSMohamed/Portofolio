import React, { useState } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { usePortfolio } from '../../context/PortfolioContext';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personalInfo } = usePortfolio();
  const { activeId, hasScrolled } = useScrollSpy(
    NAV_LINKS.map(link => link.id),
    100
  );

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          hasScrolled
            ? 'bg-[#08080a]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5'
            : 'bg-gradient-to-b from-[#08080a]/80 to-transparent backdrop-blur-[2px] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Scroll to top"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 p-[1px] shadow-[0_0_16px_rgba(245,158,11,0.25)]">
              <div className="w-full h-full bg-[#08080a] rounded-[7px] flex items-center justify-center group-hover:bg-[#121218] transition-colors">
                <Terminal className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-amber-300 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
                PORTFOLIO
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/[0.08]" aria-label="Main Navigation">
            {NAV_LINKS.map(link => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm border border-white/10'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Direct Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-500/40 transition-all duration-200 active:scale-95"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-2xl" 
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full pt-28 pb-12 px-8">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-lg font-display tracking-wide text-left transition-all ${
                    isActive
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-zinc-500">0{idx + 1}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 rounded-xl font-medium text-sm text-black bg-amber-400 hover:bg-amber-300 transition-colors text-center shadow-lg shadow-amber-400/20"
            >
              Get In Touch
            </button>
            <p className="text-center font-mono text-xs text-zinc-500">
              {personalInfo.availability}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
