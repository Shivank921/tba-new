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
                className="w-full h-[600px] object-cover"
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
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-[#c8862a]/40" style={{ animation: 'spin 20s linear infinite' }} />
          </div>

          {/* Right — content */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
              About Us
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-[1.05] mb-6">
              A Little bit of <span className="italic text-crimson-gradient">Bengal</span>
              <br />
              In the heart of the <span className="italic text-crimson-gradient">South.</span>
            </h2>
            <div className="space-y-4 text-[#2a1810]/75 leading-relaxed font-serif-2 text-lg">
              <p>
                The Bengali Association, Coimbatore, was <span className="font-semibold color-crimson">established in 2002</span> with the objective of bringing together Bengalis residing in Coimbatore — providing a platform to celebrate and preserve our rich Bengali culture, traditions, heritage and the values of Bengal.
              </p>
              <p>
                Over the years, the Association has grown into a close-knit community — a place for members and families to celebrate Bengali festivals, cultural events, literature, music, art and social activities — while fostering friendship, unity and a strong sense of community.
              </p>
              <p>
                We embrace the spirit of <span className="font-semibold">unity, inclusiveness and cultural harmony</span>, contributing to the vibrant multicultural fabric of Coimbatore.
              </p>
              <p className="italic color-crimson">
                Our vision: to keep the essence of Bengal alive, while building lasting relationships and celebrating the spirit of community.
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
              <a href="#pillars" className="inline-flex items-center gap-2 text-sm font-semibold color-crimson link-under">
                Our Four Pillars <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
