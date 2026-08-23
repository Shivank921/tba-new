import React, { useState, useMemo } from 'react';
import { gallery, galleryCategories } from '../data/mock';

const Gallery = () => {
  const [cat, setCat] = useState('All');

  const items = useMemo(
    () => (cat === 'All' ? gallery : gallery.filter((g) => g.tag === cat)),
    [cat]
  );

  return (
    <section id="gallery" className="relative py-28 bg-[#fef6e4] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
              Moments
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-tight">
              Frames of <span className="italic text-crimson-gradient">Devotion</span>
            </h2>
            <p className="font-serif-2 text-lg text-[#2a1810]/65 mt-4">
              Glimpses from our celebrations — the dhaak, the alpana, the joy.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold color-crimson link-under"
          >
            View Full Archive →
          </a>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {galleryCategories.map((c) => {
            const isActive = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold border-2 transition-all ${
                  isActive
                    ? 'bg-[#8b1a1a] border-[#8b1a1a] text-[#fef6e4] shadow-md'
                    : 'bg-transparent border-[#c8862a]/40 text-[#2a1810] hover:border-[#8b1a1a] hover:text-[#8b1a1a]'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {items.map((g) => (
            <div
              key={g.id}
              className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/85 via-transparent to-transparent opacity-70 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-bold">
                  {g.tag}
                </div>
                <div className="font-display text-lg text-[#fef6e4] mt-0.5">
                  {g.title}
                </div>
                <div className="text-[11px] text-[#fef6e4]/60 mt-1 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  View →
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#fef6e4]/20 backdrop-blur border border-[#fef6e4]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#fef6e4] text-lg">
                +
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-[#2a1810]/50 font-serif-2 text-lg italic">
            No moments in this category yet — check back soon.
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
