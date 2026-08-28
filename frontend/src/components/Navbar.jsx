import React, { useEffect, useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/mock';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const solid = scrolled || location.pathname !== '/';
  const pageHref = (href) => (location.pathname === '/' ? href : `/${href}`);

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
      data-testid="site-header"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            solid
              ? 'glass shadow-lg shadow-black/5'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="navbar-home-logo-link">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#8b1a1a] to-[#c8862a] flex items-center justify-center text-[#fef6e4] font-display font-bold shadow-md group-hover:rotate-6 transition-transform">
              <span className="text-lg">ব</span>
              <span className="absolute -inset-1 rounded-full border border-[#c8862a]/30 group-hover:scale-110 transition-transform" />
            </div>
            <div className="leading-tight">
              <div className={`font-display text-lg font-bold transition-colors ${solid ? 'text-[#2a1810]' : 'text-[#fef6e4]'}`}>
                Bengali Association
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] color-gold font-semibold">
                Coimbatore · Est. 2002
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={pageHref(l.href)}
                className={`link-under text-sm font-medium transition-colors ${solid ? 'text-[#2a1810]/80 hover:text-[#8b1a1a]' : 'text-[#fef6e4]/85 hover:text-[#f5c76a]'}`}
                data-testid={`desktop-nav-${l.label.toLowerCase()}-link`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-[#8b1a1a] px-5 py-2.5 text-sm font-semibold text-[#fef6e4] shadow-md transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[#6b1414] hover:shadow-xl"
              data-testid="desktop-donate-link"
            >
              <Heart size={15} aria-hidden="true" /> Donate
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#8b1a1a] text-[#fef6e4]"
            aria-label="Menu"
            data-testid="mobile-menu-button"
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
                  href={pageHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[#2a1810] hover:color-crimson font-medium border-b border-[#c8862a]/20"
                  data-testid={`mobile-nav-${l.label.toLowerCase()}-link`}
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/donate"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#8b1a1a] py-2.5 text-center font-semibold text-[#fef6e4]"
                data-testid="mobile-donate-link"
              >
                <Heart size={15} aria-hidden="true" /> Donate
              </Link>
              <a
                href={pageHref('#membership')}
                onClick={() => setOpen(false)}
                className="text-center text-sm font-semibold text-[#8b1a1a]"
                data-testid="mobile-membership-link"
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
