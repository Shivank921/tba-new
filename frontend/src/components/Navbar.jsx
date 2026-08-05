import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/mock';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? 'glass shadow-lg shadow-black/5'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#8b1a1a] to-[#c8862a] flex items-center justify-center text-[#fef6e4] font-display font-bold shadow-md group-hover:rotate-6 transition-transform">
              <span className="text-lg">ব</span>
              <span className="absolute -inset-1 rounded-full border border-[#c8862a]/30 group-hover:scale-110 transition-transform" />
            </div>
            <div className="leading-tight">
              <div className={`font-display text-lg font-bold transition-colors ${scrolled ? 'text-[#2a1810]' : 'text-[#fef6e4]'}`}>
                Bengali Association
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-semibold">
                Coimbatore · Est. 2002
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`link-under text-sm font-medium transition-colors ${scrolled ? 'text-[#2a1810]/80 hover:text-[#8b1a1a]' : 'text-[#fef6e4]/85 hover:text-[#f5c76a]'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#membership"
              className="inline-flex items-center gap-2 rounded-full bg-[#8b1a1a] px-5 py-2.5 text-sm font-semibold text-[#fef6e4] hover:bg-[#6b1414] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              Become a Member
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#8b1a1a] text-[#fef6e4]"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-5 animate-fadeUp">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[#2a1810] hover:color-crimson font-medium border-b border-[#c8862a]/20"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#membership"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-[#8b1a1a] text-[#fef6e4] py-2.5 text-center font-semibold"
              >
                Become a Member
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
