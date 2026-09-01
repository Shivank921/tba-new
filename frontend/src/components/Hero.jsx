import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/mock';

const Hero = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[i];

  return (
    <section id="home" className="relative min-h-[100vh] w-full overflow-hidden bg-[#1a0f0a]">
      {/* Background slides */}
      {heroSlides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-slowZoom"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/70 via-[#1a0f0a]/50 to-[#1a0f0a]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0a]/90 via-transparent to-transparent" />
        </div>
      ))}

      {/* Decorative alpana strip top */}
      <div className="absolute top-0 left-0 right-0 h-8 alpana-border opacity-30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24 min-h-[100vh] flex items-center">
        <div className="max-w-3xl">
          <div
            key={slide.id + '-kicker'}
            className="animate-fadeUp inline-flex items-center gap-2 rounded-full border border-[#c8862a]/40 bg-[#fef6e4]/5 backdrop-blur px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8862a] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#f5c76a] font-semibold">
              {slide.kicker}
            </span>
          </div>

          <h1
            key={slide.id + '-title'}
            className={`animate-fadeUp delay-100 text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-[#fef6e4] font-bold mb-4 ${
              slide.id === 3 ? 'font-bangla' : 'font-display'
            }`}
            data-testid="hero-slide-heading"
          >
            {slide.title}
            <br />
            <span className="italic text-gold-gradient">{slide.accent}</span>
          </h1>

          <p
            key={slide.id + '-sub'}
            className="animate-fadeUp delay-200 font-serif-2 text-lg md:text-2xl text-[#fef6e4]/85 max-w-2xl leading-relaxed mb-10"
          >
            {slide.subtitle}
          </p>

          <div className="animate-fadeUp delay-300 flex flex-wrap items-center gap-4">
            <a
              href={slide.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-[#c8862a] hover:bg-[#b8762a] text-[#1a0f0a] px-7 py-4 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              {slide.cta.label}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 rounded-full border border-[#fef6e4]/30 bg-[#fef6e4]/5 backdrop-blur px-7 py-4 font-medium text-[#fef6e4] hover:bg-[#fef6e4]/10 transition-all"
            >
              Discover Our Story
            </a>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <button
          onClick={() => setI((v) => (v - 1 + heroSlides.length) % heroSlides.length)}
          className="w-11 h-11 rounded-full glass-dark flex items-center justify-center text-[#fef6e4] hover:bg-[#8b1a1a]/60 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? 'w-10 bg-[#c8862a]' : 'w-4 bg-[#fef6e4]/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setI((v) => (v + 1) % heroSlides.length)}
          className="w-11 h-11 rounded-full glass-dark flex items-center justify-center text-[#fef6e4] hover:bg-[#8b1a1a]/60 transition-all"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Side floating badge */}
      <div className="hidden lg:flex absolute right-8 bottom-16 z-10 flex-col items-end gap-2 animate-floaty">
        <div className="glass-dark rounded-2xl p-5 max-w-xs">
          <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-bold mb-2">
            Venue
          </div>
          <div className="font-display text-[#fef6e4] text-lg leading-tight">
            SNV Kalyana Mandapam
          </div>
          <div className="text-[#fef6e4]/70 text-xs mt-1">
            Ramar Koil St, Ramnagar, Coimbatore
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
