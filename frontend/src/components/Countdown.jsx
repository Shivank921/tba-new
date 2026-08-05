import React, { useEffect, useState } from 'react';
import { pujaDate } from '../data/mock';

const pad = (n) => String(n).padStart(2, '0');

const Countdown = () => {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });

  useEffect(() => {
    const target = new Date(pujaDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setLeft({ d: 0, h: 0, m: 0, s: 0, done: true });
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setLeft({ d, h, m, s, done: false });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const units = [
    { v: left.d, l: 'Days' },
    { v: pad(left.h), l: 'Hours' },
    { v: pad(left.m), l: 'Minutes' },
    { v: pad(left.s), l: 'Seconds' },
  ];

  return (
    <section className="relative -mt-16 z-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass rounded-3xl shadow-2xl shadow-[#8b1a1a]/10 p-8 md:p-10 border-2 border-[#c8862a]/30">
          <div className="grid md:grid-cols-[1.2fr_2fr] gap-8 items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] color-gold font-bold mb-2">
                {left.done ? 'Happening Now' : 'Countdown to'}
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-[#2a1810] leading-tight">
                Durga Puja <span className="text-crimson-gradient italic">2025</span>
              </h3>
              <p className="text-sm text-[#2a1810]/60 mt-2">Sep 29 — Oct 02 · SNV Kalyana Mandapam</p>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-5">
              {units.map((u) => (
                <div
                  key={u.l}
                  className="relative rounded-2xl bg-gradient-to-b from-[#fef6e4] to-[#f5ebd7] border border-[#c8862a]/30 p-4 md:p-5 text-center overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8b1a1a] via-[#c8862a] to-[#8b1a1a]" />
                  <div className="font-display text-3xl md:text-5xl font-bold text-crimson-gradient tabular-nums">
                    {u.v}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#2a1810]/60 font-semibold mt-1">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
