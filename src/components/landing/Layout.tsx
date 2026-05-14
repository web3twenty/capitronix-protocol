"use client";

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
import Image from "next/image";

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
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/icon-300x100.png" alt="Logo" width={150} height={75} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-cyan-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => (location.href = "/auth/login")}
            >
              Launch App
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 hover:text-cyan-600 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => (location.href = "/auth/login")}
          >
            Launch App
          </Button>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-slate-900 text-slate-400 border-t border-white/5 pt-24 pb-12 relative overflow-hidden"
    >
      {/* Decorative background for footer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_40%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src="/icon-300x100.png"
                alt="Logo"
                width={150}
                height={75}
              />
            </div>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Next-generation token marketing system designed for long-term
              blockchain growth and community adoption.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-sm"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-sm"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-sm"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Platform
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#marketplace"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-600/50 group-hover:w-2 transition-all" />{" "}
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#launchpad"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-600/50 group-hover:w-2 transition-all" />{" "}
                  Launchpad
                </a>
              </li>
              <li>
                <a
                  href="#rewards"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-600/50 group-hover:w-2 transition-all" />{" "}
                  Ambassador Pool
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-600/50 group-hover:w-2 transition-all" />{" "}
                  Capitronix NFT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-600/50 group-hover:w-2 transition-all" />{" "}
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-600/50 group-hover:w-2 transition-all" />{" "}
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Contact Us
            </h4>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                <MapPin size={20} />
              </div>
              <span className="text-sm">37 Ann Siang Road, Singapore</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                <Mail size={20} />
              </div>
              <span className="text-sm truncate">
                info.capitronixprotocol@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-tight">
            © {new Date().getFullYear()} Capitronix Protocol. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Built for the future of Web3
            </span>
            <div className="w-12 h-1 bg-cyan-600/20 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-cyan-500/20 relative">
      {/* Global Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-cyan-200/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-blue-200/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-[20%] h-[20%] bg-indigo-200/10 rounded-full blur-[80px]" />
      </div>

      <Navbar />
      <main id="main-content" className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
