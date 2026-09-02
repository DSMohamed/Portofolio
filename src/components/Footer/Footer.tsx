import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Lock } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { personalInfo, setIsAdminOpen } = usePortfolio();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' CLT'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', url: personalInfo.github },
    { name: 'LinkedIn', url: personalInfo.linkedin },
    { name: 'X (Twitter)', url: personalInfo.twitter },
  ];

  return (
    <footer className="relative bg-[#050507] border-t border-white/[0.08] text-zinc-400 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Top Footer Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm font-light text-zinc-400 max-w-sm">
              {personalInfo.title}
            </p>
          </div>

          {/* Local Time HUD, Admin Trigger & Back To Top */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* Local Cairo Time */}
            <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-zinc-400">
              <span className="text-zinc-500 mr-2">CAIRO TIME:</span>
              <span className="text-amber-400 font-medium">{timeString || 'LOADING...'}</span>
            </div>

            {/* Admin CMS Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              aria-label="Open Admin CMS Portal"
              title="Open Admin CMS Portal (or press Ctrl+Shift+A)"
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-amber-400 hover:text-black border border-white/[0.08] text-zinc-400 transition-all duration-300"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-amber-400 hover:text-black border border-white/[0.08] text-xs font-mono text-zinc-300 transition-all duration-300"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

        {/* Bottom Footer Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Designed with precision.
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
