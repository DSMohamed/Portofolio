import React from 'react';
import { Mail, Trash2, Calendar, User, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const MessagesTab: React.FC = () => {
  const { messages, deleteMessage } = usePortfolio();

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Contact Form Payload Inquiries
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Direct messages received from the portfolio contact transmission form.
          </p>
        </div>
        <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Total: {messages.length}
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0c0c11] border border-white/[0.08] space-y-3">
          <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Inquiries Received Yet</h3>
          <p className="text-xs text-zinc-500 font-mono">
            New contact submissions will be captured and displayed here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className="p-6 rounded-2xl bg-[#0c0c11] border border-white/[0.08] space-y-3 hover:border-amber-400/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{msg.name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-mono text-amber-400/90 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{msg.email}</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                  </span>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-mono font-semibold text-zinc-300">
                  SUBJECT: {msg.subject}
                </div>
              )}

              <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-wrap bg-black/40 p-4 rounded-xl border border-white/[0.04]">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
