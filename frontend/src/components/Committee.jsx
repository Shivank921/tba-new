import React from 'react';
import { Crown, Star } from 'lucide-react';
import { committee, testimonials } from '../data/mock';

const Committee = () => {
  return (
    <section id="committee" className="relative py-28 bg-[#faf6ef]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
            The People
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-tight">
            Executive <span className="italic text-crimson-gradient">Committee</span>
          </h2>
          <p className="font-serif-2 text-lg text-[#2a1810]/65 mt-4">
            From founding pillars to present stewards — the hearts behind our association.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committee.map((m, idx) => {
            const featured = idx < 2;
            return (
              <div
                key={m.name}
                className={`group relative rounded-3xl p-8 border transition-all hover:-translate-y-1 ${
                  featured
                    ? 'bg-gradient-to-br from-[#2a1810] to-[#1a0f0a] text-[#fef6e4] border-[#c8862a]/40 shadow-xl'
                    : 'bg-[#fef6e4] text-[#2a1810] border-[#c8862a]/25 hover:shadow-lg'
                }`}
              >
                {featured && (
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#c8862a] text-[#1a0f0a] flex items-center justify-center">
                    <Crown size={14} />
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display text-2xl font-bold mb-5 ${
                    featured
                      ? 'bg-[#c8862a] text-[#1a0f0a]'
                      : 'bg-gradient-to-br from-[#8b1a1a] to-[#b8593a] text-[#fef6e4]'
                  }`}
                >
                  {m.name.split(' ').filter((s) => s !== 'Mr.' && s !== 'Mrs.')[0].charAt(0)}
                </div>

                <div
                  className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 ${
                    featured ? 'text-[#f5c76a]' : 'color-gold'
                  }`}
                >
                  {m.role}
                </div>
                <div className="font-display text-2xl font-bold leading-tight">{m.name}</div>
                <div
                  className={`text-xs mt-2 ${
                    featured ? 'text-[#fef6e4]/60' : 'text-[#2a1810]/50'
                  }`}
                >
                  {m.tenure}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
            Voices
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-bold text-[#2a1810] mb-10">
            What our <span className="italic text-crimson-gradient">members</span> say
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="relative rounded-3xl p-8 bg-[#fef6e4] border border-[#c8862a]/25 hover:border-[#8b1a1a]/40 hover:-translate-y-1 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="flex items-center gap-1 mb-4 color-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="font-serif-2 text-lg text-[#2a1810]/80 leading-relaxed mb-6">
                  “{t.text}”
                </p>
                <div className="pt-6 border-t border-[#c8862a]/20">
                  <div className="font-display text-lg font-bold text-[#2a1810]">{t.name}</div>
                  <div className="text-xs color-gold uppercase tracking-[0.2em] font-semibold mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Committee;
