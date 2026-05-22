import { Link } from "@tanstack/react-router";
import { Twitter, Linkedin, Github, Heart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--ocean-deep)] text-white/80">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-white/65 max-w-xs">
            AI for a Cleaner Africa. Classify waste. Surface data. Drive change.
          </p>
        </div>
        <div className="flex md:justify-center">
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-teal-brand">Home</Link></li>
            <li><Link to="/about" className="hover:text-teal-brand">About Us</Link></li>
            <li><Link to="/solutions" className="hover:text-teal-brand">Solutions</Link></li>
            <li><a href="mailto:hello@awaiblue.africa" className="hover:text-teal-brand">Contact</a></li>
          </ul>
        </div>
        <div className="md:text-right">
          <div className="flex md:justify-end gap-3">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[var(--teal-brand)] hover:border-transparent transition-all">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 text-xs text-white/55 flex items-center justify-center gap-1.5">
          Built with <Heart className="h-3.5 w-3.5 fill-[var(--teal-brand)] text-[var(--teal-brand)]" /> for the AWAI Hackathon 2025
        </div>
      </div>
    </footer>
  );
}