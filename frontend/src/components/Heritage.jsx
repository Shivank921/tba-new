import React from 'react';
import { BookOpen, Music, Sparkles, UtensilsCrossed } from 'lucide-react';
import { heritageCards } from '../data/mock';

const iconMap = { BookOpen, Music, Sparkles, UtensilsCrossed };

const Heritage = () => {
  return (
    <section id="heritage" className="relative py-28 bg-[#1a0f0a] text-[#fef6e4] overflow-hidden">
      {/* Decorative overlays */}
      <div className="absolute top-0 left-0 right-0 h-8 alpana-border opacity-40" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#8b1a1a] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#c8862a] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4 ornament">
            Heritage
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            The four pillars of <span className="italic text-gold-gradient">Bangaliyana</span>
          </h2>
          <p className="font-serif-2 text-lg md:text-xl text-[#fef6e4]/70">
            Bengal is not merely a place — it is a feeling. A tapestry woven from words, melodies, movement, and taste.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {heritageCards.map((c, idx) => {
            const Icon = iconMap[c.icon] || Sparkles;
            return (
              <div
                key={c.id}
                className="group relative rounded-3xl border border-[#c8862a]/25 bg-gradient-to-b from-[#2a1810]/60 to-[#1a0f0a]/60 backdrop-blur p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-[#c8862a]/60"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#c8862a]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b1a1a] to-[#b8593a] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Icon size={22} className="text-[#fef6e4]" />
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.35em] color-gold font-bold mb-1">
                    {c.subtitle}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-3">{c.title}</h3>
                  <p className="font-serif-2 text-[#fef6e4]/70 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#c8862a]/20">
                    <span className="text-[10px] uppercase tracking-[0.3em] color-gold font-semibold flex items-center gap-2">
                      Explore <span className="w-6 h-px bg-[#c8862a]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 alpana-border opacity-40 rotate-180" />
    </section>
  );
};

export default Heritage;
