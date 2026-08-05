import React from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { stats } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 paisley-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — imagery */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1634066844026-40a34d6f36c0?w=900&q=80"
                alt="Durga Puja"
                className="w-full h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/40 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -right-4 md:right-8 glass rounded-2xl p-6 shadow-2xl max-w-xs animate-floaty">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#8b1a1a] text-[#fef6e4] flex items-center justify-center">
                  <Users size={18} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-bold">
                  Registered
                </div>
              </div>
              <div className="font-display text-lg font-bold text-[#2a1810]">
                Regd. No. 189/2002
              </div>
              <div className="text-xs text-[#2a1810]/60 mt-1">
                A registered socio-cultural body since 2002
              </div>
            </div>

            {/* Corner ornament */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-[#c8862a]/40 animate-spin-slow" style={{ animation: 'spin 20s linear infinite' }} />
          </div>

          {/* Right — content */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
              About Us
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-tight mb-6">
              Where <span className="italic text-crimson-gradient">tradition</span> is nurtured, and <span className="italic text-crimson-gradient">culture</span> is cherished.
            </h2>
            <div className="space-y-4 text-[#2a1810]/75 leading-relaxed font-serif-2 text-lg">
              <p>
                The Bengali Association — Coimbatore is an umbrella of all those who love the land and culture of Bengal. From various parts of the country and different walks of life, we gather with modest means but boundless ambition.
              </p>
              <p>
                Today, under the leadership of <span className="font-semibold color-crimson">Mr. Ayan Chatterjee</span> (President) and <span className="font-semibold color-crimson">Mr. Sankar Samanta</span> (Secretary), the association proudly celebrates its <span className="font-semibold">24th year of Durga Puja</span> — a testament to cultural unity, devotion, and community spirit.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-[#fef6e4] border border-[#c8862a]/25 p-5 hover:border-[#8b1a1a]/40 hover:-translate-y-1 transition-all"
                >
                  <div className="font-display text-3xl font-bold text-crimson-gradient">
                    {s.value}
                    <span className="text-lg color-gold">{s.suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#2a1810]/60 font-semibold mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick facts */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-[#2a1810]/70">
                <Calendar size={16} className="color-gold" /> Founded 2002
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2a1810]/70">
                <MapPin size={16} className="color-gold" /> Coimbatore, Tamilnadu
              </div>
              <a href="#events" className="inline-flex items-center gap-2 text-sm font-semibold color-crimson link-under">
                Read Our Story <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
