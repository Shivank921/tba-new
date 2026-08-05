import React, { useState } from 'react';
import { Clock, Calendar as CalIcon } from 'lucide-react';
import { events } from '../data/mock';

const accentMap = {
  saffron: 'from-[#e08a1e] to-[#c8862a]',
  crimson: 'from-[#8b1a1a] to-[#6b1414]',
  gold: 'from-[#c8862a] to-[#8a5a1c]',
  terracotta: 'from-[#b8593a] to-[#8b3a24]',
};

const Events = () => {
  const [active, setActive] = useState(events[0].id);

  const activeEvent = events.find((e) => e.id === active);

  return (
    <section id="events" className="relative py-28 bg-[#faf6ef]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.4em] color-gold font-bold mb-4">
              Upcoming Events
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[#2a1810] leading-tight">
              Durga Puja <span className="italic text-crimson-gradient">Schedule</span>
            </h2>
            <p className="font-serif-2 text-lg text-[#2a1810]/65 mt-4">
              Five days of devotion, cultural performances, and community feasts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#2a1810]/70">
            <CalIcon size={16} className="color-crimson" />
            <span>September 29 — October 6, 2025</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-10">
          {/* Day chips */}
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-[#c8862a]/50 via-[#8b1a1a]/30 to-transparent" />
            <div className="space-y-3">
              {events.map((ev) => {
                const isActive = active === ev.id;
                return (
                  <button
                    key={ev.id}
                    onClick={() => setActive(ev.id)}
                    className={`relative w-full text-left flex items-center gap-4 rounded-2xl p-4 border transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#fef6e4] to-[#f5ebd7] border-[#8b1a1a]/40 shadow-lg -translate-y-0.5'
                        : 'bg-white/60 border-[#c8862a]/20 hover:border-[#c8862a]/50'
                    }`}
                  >
                    <div
                      className={`relative z-10 shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${accentMap[ev.accent]} text-[#fef6e4] flex flex-col items-center justify-center font-display font-bold shadow-md`}
                    >
                      <div className="text-[10px] uppercase tracking-widest opacity-80">
                        {ev.date.split(' ')[0]}
                      </div>
                      <div className="text-lg leading-none">{ev.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.25em] color-gold font-bold">
                        {ev.day}
                      </div>
                      <div className="font-display text-xl font-bold text-[#2a1810]">
                        {ev.title}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute right-4 w-2 h-2 rounded-full bg-[#8b1a1a] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details card */}
          <div className="relative">
            <div className="sticky top-28 rounded-3xl overflow-hidden bg-gradient-to-br from-[#2a1810] to-[#1a0f0a] text-[#fef6e4] shadow-2xl">
              <div className="absolute inset-0 opacity-30">
                <img
                  src="https://images.unsplash.com/photo-1617875216004-78f15839c578?w=1200&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a]/80 to-[#8b1a1a]/40" />
              </div>

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#c8862a] text-[#1a0f0a] font-display font-bold text-lg flex items-center justify-center">
                    {activeEvent.date.split(' ')[1]}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-bold">
                      {activeEvent.day} · {activeEvent.date}
                    </div>
                    <div className="font-display text-2xl md:text-3xl font-bold">
                      {activeEvent.title}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  {activeEvent.sessions.map((s, idx) => (
                    <div
                      key={idx}
                      className="group relative flex items-start gap-5 p-5 rounded-2xl border border-[#c8862a]/25 bg-[#fef6e4]/5 hover:bg-[#fef6e4]/10 transition-colors"
                    >
                      <div className="shrink-0 flex flex-col items-center gap-1 min-w-[80px]">
                        <Clock size={14} className="color-gold" />
                        <div className="font-display text-lg font-bold text-[#f5c76a] tabular-nums">
                          {s.time}
                        </div>
                      </div>
                      <div className="h-14 w-px bg-[#c8862a]/30" />
                      <div>
                        <div className="font-display text-xl font-semibold">
                          {s.name}
                        </div>
                        <div className="text-sm text-[#fef6e4]/60 mt-1">{s.note}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#c8862a]/20 flex items-center justify-between">
                  <div className="text-xs text-[#fef6e4]/60">
                    Venue · <span className="text-[#fef6e4]">SNV Kalyana Mandapam</span>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs uppercase tracking-[0.25em] font-bold color-gold link-under"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
