import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo, AWAI_MISSION_SHORT } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/solutions", label: "Solutions" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--ocean-deep)]/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-18 py-3 flex items-center justify-between">
        <Logo light showTagline clickable />

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  active ? "text-teal-brand" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <span className="block h-0.5 mt-1 bg-[var(--teal-brand)] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            hash="classifier"
            className="hidden sm:inline-flex items-center gap-2 bg-[var(--earth-green)] hover:bg-[var(--earth-green)]/90 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-[var(--earth-green)]/30 hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Classify Now
          </Link>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--ocean-deep)] border-t border-white/10 px-5 py-4 space-y-1">
          <p className="text-xs text-white/60 leading-relaxed pb-3 border-b border-white/10">
            {AWAI_MISSION_SHORT}
          </p>
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`block px-3 py-3 rounded-md font-medium ${
                  active ? "text-teal-brand bg-white/5" : "text-white/85"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/"
            hash="classifier"
            className="block text-center mt-2 bg-[var(--earth-green)] text-white font-semibold px-5 py-3 rounded-full"
          >
            Classify Now
          </Link>
        </div>
      )}
    </header>
  );
}