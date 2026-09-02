import React, { useState } from 'react';
import { Lock, Terminal, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminAuth: React.FC = () => {
  const { loginAdmin, setIsAdminOpen } = usePortfolio();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setLoading(true);
    setError(false);

    try {
      const ok = await loginAdmin(passcode);
      setLoading(false);
      if (!ok) {
        setError(true);
      }
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center p-6 text-zinc-200">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#0c0c11] border border-white/10 shadow-2xl shadow-black/90 space-y-6">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="text-white font-semibold">SECURITY PROTOCOL // 0xAUTH</span>
          </div>
          <span className="text-zinc-500">SHA-256</span>
        </div>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            Admin Access Verification
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Enter administrative passcode to manage portfolio content & Supabase database.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Invalid passcode. Default is: admin123</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="Enter passcode (default: admin123)"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-zinc-600 text-sm font-mono transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm font-mono transition-all shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Verifying Cryptographic Hash...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Return to Public Portfolio
          </button>
        </div>

      </div>
    </div>
  );
};
