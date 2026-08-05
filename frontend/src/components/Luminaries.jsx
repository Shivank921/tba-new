import React, { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { luminaries } from '../data/mock';

const Luminaries = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % luminaries.length), 6000);
    return () => clearInterval(t);
  }, []);

  const l = luminaries[i];

  return (
    <section className="relative py-28 bg-gradient-to-b from-[#faf6ef] to-[#f5ebd7] overflow-hidden">
      <div className="absolute inset-0 paisley-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4 ornament">
            Guiding Lights
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-tight">
            The great souls of <span className="italic text-crimson-gradient">Bengal</span>
          </h2>
        </div>

        <div className="relative rounded-3xl bg-[#fef6e4] border-2 border-[#c8862a]/25 shadow-2xl p-10 md:p-16">
          <Quote className="absolute top-8 left-8 color-gold opacity-30" size={80} />

          <div key={l.id} className="animate-fadeIn relative grid md:grid-cols-[220px_1fr] gap-10 items-center">
            <div className="relative mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8b1a1a] to-[#c8862a] blur-2xl opacity-40" />
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#c8862a] shadow-xl bg-[#faf6ef]">
                <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p className="font-serif-2 italic text-2xl md:text-3xl text-[#2a1810] leading-snug mb-6">
                “{l.quote}”
              </p>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#8b1a1a]" />
                <div>
                  <div className="font-display text-xl font-bold color-crimson">{l.name}</div>
                  <div className="text-xs uppercase tracking-[0.25em] color-gold font-semibold mt-0.5">
                    {l.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {luminaries.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? 'w-10 bg-[#8b1a1a]' : 'w-4 bg-[#c8862a]/40'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setI((v) => (v - 1 + luminaries.length) % luminaries.length)}
                className="w-10 h-10 rounded-full border border-[#8b1a1a]/30 flex items-center justify-center hover:bg-[#8b1a1a] hover:text-[#fef6e4] transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setI((v) => (v + 1) % luminaries.length)}
                className="w-10 h-10 rounded-full border border-[#8b1a1a]/30 flex items-center justify-center hover:bg-[#8b1a1a] hover:text-[#fef6e4] transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Luminaries;
