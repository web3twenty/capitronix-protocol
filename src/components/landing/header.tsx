"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "Home", link: "#" },
    { title: "About", link: "#about" },
    { title: "Token & Tokenomics", link: "#token-presale" },
    { title: "Roadmap", link: "#roadmap" },
  ];

  return (
    <header className="flex flex-col fixed left-0 top-0 right-0 z-50 border-b border-[#2A2A2A] bg-[#13171E]">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-2 py-1 md:px-6 py-2">
        {/* Logo */}
        <Link href="/" className="block flex-shrink-0">
          <Image
            src="/icon-300x100.png"
            alt="Logo"
            width={150}
            height={70}
            className="w-30 md:w-40"
          />
        </Link>

        {/* Desktop nav */}
        <div className="flex-1 mx-4 hidden lg:flex items-center justify-center">
          <ul className="flex space-x-6 text-white">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Launch App button - hidden on mobile */}
          <div className="hidden sm:block">
            <a href="/auth/login">
              <Button
                variant="secondary"
                roundedClass="rounded-full"
                className="h-10"
              >
                <span className="px-3">Launch App</span>
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="block lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white rounded-md hover:bg-gray-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-[#13171E] border-t border-[#2A2A2A]">
          <ul className="flex flex-col text-white p-2 space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="block px-4 py-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
