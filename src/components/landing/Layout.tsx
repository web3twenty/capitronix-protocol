import { ReactNode, useState, useEffect } from "react";
import {
  Rocket,
  Menu,
  X,
  Mail,
  MapPin,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "./UI";

interface LayoutProps {
  children: ReactNode;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Marketplace", href: "#marketplace" },
    { name: "Launchpad", href: "#launchpad" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/icon-300x100.png" alt="Logo" width={140} height={60} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-cyan-400 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="/auth/login">
              <Button variant="primary" size="sm">
                Launch App
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/5 p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-400 hover:text-cyan-400 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="/auth/login">
            <Button variant="primary" size="md" className="w-full">
              Launch App
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-slate-950 border-t border-white/5 pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">Capitronix</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Next-generation token marketing system designed for long-term
              blockchain growth and community adoption.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#marketplace"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#launchpad"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Launchpad
                </a>
              </li>
              <li>
                <a
                  href="#rewards"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Ambassador Pool
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin size={20} className="text-cyan-400 shrink-0" />
              <span>37 Ann Siang Road, Singapore</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Mail size={20} className="text-cyan-400 shrink-0" />
              <span className="truncate">
                info.capitronixprotocol@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Capitronix Protocol. All rights
            reserved.
          </p>
          <div className="text-slate-500 text-sm">
            Built for the future of Web3
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
