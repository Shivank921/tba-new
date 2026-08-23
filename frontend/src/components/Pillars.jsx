import React, { useState } from 'react';
import { Flame, HeartHandshake, Sparkles, Users, Quote } from 'lucide-react';
import { pillars } from '../data/mock';

const iconMap = { Flame, HeartHandshake, Sparkles, Users };

const Pillars = () => {
  const [active, setActive] = useState(pillars[0].id);
  const current = pillars.find((p) => p.id === active);
  const CurrentIcon = iconMap[current.icon] || Flame;

  return (
    <section id="pillars" className="relative py-28 bg-[#faf6ef] overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#c8862a]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#8b1a1a]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
            What We Stand For
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-[1.05]">
            The four pillars of
            <br />
            The Bengali Association <span className="italic text-crimson-gradient">Coimbatore</span>
          </h2>
        </div>

        {/* Number nav */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
          {pillars.map((p) => {
            const isActive = active === p.id;
            const Icon = iconMap[p.icon] || Flame;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`group relative text-left rounded-2xl p-5 border-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-[#8b1a1a] to-[#6b1414] border-[#c8862a] text-[#fef6e4] shadow-xl -translate-y-1'
                    : 'bg-[#fef6e4] border-[#c8862a]/20 text-[#2a1810] hover:border-[#8b1a1a]/40 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#c8862a] text-[#1a0f0a]' : 'bg-[#8b1a1a]/10 color-crimson group-hover:bg-[#8b1a1a] group-hover:text-[#fef6e4]'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div
                    className={`font-display text-2xl font-bold ${
                      isActive ? 'text-[#f5c76a]' : 'text-[#c8862a]/60'
                    }`}
                  >
                    {p.number}
                  </div>
                </div>
                <div className={`font-display text-lg font-bold leading-tight ${isActive ? '' : 'text-[#2a1810]'}`}>
                  {p.title}
                </div>
                <div className={`text-[10px] uppercase tracking-[0.25em] font-semibold mt-2 ${isActive ? 'text-[#f5c76a]' : 'color-gold'}`}>
                  {p.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured content */}
        <div key={current.id} className="animate-fadeIn grid lg:grid-cols-[1.1fr_1fr] gap-10 items-stretch">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px]">
            <img src={current.image} alt={current.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/85 via-[#1a0f0a]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-[#fef6e4]">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-px bg-[#c8862a]" />
                <span className="text-[10px] uppercase tracking-[0.3em] color-gold font-bold">
                  Pillar {current.number}
                </span>
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold">{current.title}</div>
            </div>
          </div>

          {/* Text */}
          <div className="rounded-3xl bg-gradient-to-br from-[#fef6e4] to-[#f5ebd7] border-2 border-[#c8862a]/25 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b1a1a] to-[#b8593a] text-[#fef6e4] flex items-center justify-center">
                  <CurrentIcon size={22} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-bold">
                    {current.tagline}
                  </div>
                  <div className="font-display text-2xl font-bold text-[#2a1810]">
                    {current.title}
                  </div>
                </div>
              </div>

              <p className="font-serif-2 text-lg text-[#2a1810]/80 leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#c8862a]/25 relative">
              <Quote size={28} className="color-gold opacity-40 mb-2" />
              <p className="italic font-serif-2 text-lg color-crimson leading-snug">
                “{current.quote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
