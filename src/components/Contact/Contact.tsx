import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const SOCIAL_ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail: ({ className }) => <Mail className={className} />,
};

export const Contact: React.FC = () => {
  const { personalInfo, submitContactMessage } = usePortfolio();
  const { elementRef, isVisible } = useIntersectionObserver();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (formStatus === 'error') setFormStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please provide your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');

    try {
      await submitContactMessage(formState);
      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      setFormStatus('error');
      setErrorMessage('Failed to send transmission. Please try again or email directly.');
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: personalInfo.github, icon: 'Github', handle: '@mohamed-dev' },
    { name: 'LinkedIn', url: personalInfo.linkedin, icon: 'Linkedin', handle: 'in/mohamed-works' },
    { name: 'X (Twitter)', url: personalInfo.twitter, icon: 'Twitter', handle: '@mohamed_tech' },
    { name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'Mail', handle: personalInfo.email },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-[#08080a] overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 sm:h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16 max-w-3xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-6 sm:w-8 h-[1px] bg-amber-400" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-amber-400 uppercase">
              06 // INITIATE TRANSMISSION
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-[1.05] mb-3 sm:mb-4">
            Let's build something worth remembering.
          </h2>
          <p className="text-sm sm:text-lg text-zinc-400 font-light leading-relaxed">
            Have a project, engineering challenge, or vision you want to bring to life? Send an inquiry or reach out directly across verified channels.
          </p>
        </div>

        {/* Two-Column Grid: Form & Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0c0c11] border border-white/[0.08] shadow-2xl shadow-black/80">
              
              {formStatus === 'success' ? (
                <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Transmission Received
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
                    Thank you for reaching out. Your message has been safely received and stored.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  
                  {formStatus === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="name" className="block text-[11px] sm:text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Alex Vance"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-zinc-600 text-base sm:text-sm font-sans transition-all outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="email" className="block text-[11px] sm:text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
                        Your Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="alex@company.com"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-zinc-600 text-base sm:text-sm font-sans transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="subject" className="block text-[11px] sm:text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
                      Subject / Project Scope
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="e.g. AI Product Integration / Creative Web Experience"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-zinc-600 text-base sm:text-sm font-sans transition-all outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="message" className="block text-[11px] sm:text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your vision, timeline, or engineering inquiry..."
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-zinc-600 text-base sm:text-sm font-sans transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-amber-400/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Payload...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Direct Channels & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Direct Email Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0d0d12] border border-white/[0.08] space-y-3 sm:space-y-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Direct Electronic Mail
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Feel free to email directly for encrypted communications or contract scopes:
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-mono font-medium text-amber-400 hover:text-amber-300 transition-colors break-all"
              >
                <span>{personalInfo.email}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Social & Code Platforms */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="text-[11px] sm:text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                Verified Social & Code Channels
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {socialLinks.map((link, idx) => {
                  const Icon = SOCIAL_ICONS_MAP[link.icon] || GithubIcon;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0d0d12] border border-white/[0.06] hover:border-amber-400/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors shrink-0" />
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
                            {link.name}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                            {link.handle}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 group-hover:text-amber-400 transition-colors shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-zinc-400">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 shrink-0" />
              <span>{personalInfo.availability}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
