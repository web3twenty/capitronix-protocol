"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative px-6 pt-20 pb-12 sm:px-10 sm:pt-24 sm:pb-16 md:px-16 md:pt-28 lg:pt-32 text-white flex items-start bg-black overflow-hidden"
    >
      {/* Enhanced Left reflection with animation */}
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 -top-10 -left-10 sm:-top-16 sm:-left-16 bg-gradient-to-br from-green-400/40 to-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Enhanced Right reflection with animation */}
      <div className="absolute w-64 h-64 hidden md:block sm:w-80 sm:h-80 lg:w-96 lg:h-96 -bottom-16 -right-16 sm:bottom-20 rounded-full sm:right-0 bg-gradient-to-tl from-green-400/30 to-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse delay-300"></div>

      {/* Additional ambient glow */}
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto mt-12 mb-12 sm:mt-16 sm:mb-16 md:mt-20 md:mb-20 grid grid-cols-1 lg:grid-cols-2 relative z-10 gap-10 sm:gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-center lg:text-left space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent inline-block animate-fade-in">
              Web3Twenty
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#11B97E] via-[#0fcc88] to-[#0E966F] bg-clip-text text-transparent inline-block mt-2 animate-fade-in-delay">
              Ecosystem
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Join the 3Twenty revolution. The next-generation blockchain
            ecosystem powered by Binance Smart Chain with utility tokens and
            BEP20 standard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-2">
            <a href="/auth/login" className="group w-full sm:w-auto">
              <Button variant="secondary" roundedClass="rounded-full">
                <span className="px-4">Buy 3TWENTY Coin Now</span>
                <ChevronRight className="text-white w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>

            <Link
              href="/3twenty.pdf"
              target="_blank"
              className="group w-full sm:w-auto"
            >
              <Button
                variant="outline-secondary"
                roundedClass="rounded-full border-0"
              >
                <span className="px-4 group-hover:text-[#11B97E] transition-colors duration-300">
                  Whitepaper
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Coin Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative inline-block group">
            {/* Outer glow ring - animated */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#11B97E]/30 to-[#0E966F]/30 blur-2xl group-hover:blur-3xl transition-all duration-500 scale-110 animate-pulse-slow"></div>

            {/* Main circle with enhanced shadow */}
            <div className="relative rounded-full h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 p-3 bg-gradient-to-br from-[#11B97E]/30 to-[#0E966F]/20 shadow-2xl shadow-[#11B97E]/50 flex items-center justify-center group-hover:shadow-[#11B97E]/70 transition-all duration-500 group-hover:scale-105">
              {/* Inner border with gradient */}
              <div className="rounded-full w-full h-full border-4 border-[#11B97EFF] p-0 shadow-lg relative overflow-hidden bg-gradient-to-br from-[#0E966F]/10 to-transparent">
                <Image
                  src="/3twenty.png"
                  alt="Logo"
                  width={250}
                  height={250}
                  className="w-full h-full relative z-10 group-hover:rotate-12 transition-transform duration-700 ease-out"
                />

                {/* Rotating shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>

              {/* Enhanced Sparkles with staggered animations */}
              <span className="absolute top-2 left-4 w-2.5 h-2.5 bg-[#11B97EFF] rounded-full opacity-90 shadow-lg shadow-[#11B97E]/50 animate-sparkle"></span>
              <span className="absolute top-8 right-8 w-2 h-2 bg-[#0E966F] rounded-full opacity-80 shadow-md shadow-[#0E966F]/50 animate-sparkle-delay-1"></span>
              <span className="absolute top-16 left-12 w-2.5 h-2.5 bg-[#11B97EFF] rounded-full opacity-90 shadow-lg shadow-[#11B97E]/50 animate-sparkle-delay-2"></span>
              <span className="absolute bottom-10 left-6 w-2 h-2 bg-[#0E966F] rounded-full opacity-80 shadow-md shadow-[#0E966F]/50 animate-sparkle-delay-3"></span>
              <span className="absolute bottom-4 right-8 w-2.5 h-2.5 bg-[#11B97EFF] rounded-full opacity-90 shadow-lg shadow-[#11B97E]/50 animate-sparkle-delay-4"></span>
              <span className="absolute top-24 right-4 w-2 h-2 bg-[#0E966F] rounded-full opacity-80 shadow-md shadow-[#0E966F]/50 animate-sparkle-delay-5"></span>
              <span className="absolute bottom-16 left-16 w-2.5 h-2.5 bg-[#11B97EFF] rounded-full opacity-90 shadow-lg shadow-[#11B97E]/50 animate-sparkle-delay-6"></span>
              <span className="absolute top-12 right-16 w-2 h-2 bg-[#0E966F] rounded-full opacity-80 shadow-md shadow-[#0E966F]/50 animate-sparkle-delay-7"></span>
              <span className="absolute bottom-6 left-20 w-2.5 h-2.5 bg-[#11B97EFF] rounded-full opacity-90 shadow-lg shadow-[#11B97E]/50 animate-sparkle-delay-8"></span>
              <span className="absolute bottom-14 right-20 w-2 h-2 bg-[#0E966F] rounded-full opacity-80 shadow-md shadow-[#0E966F]/50 animate-sparkle-delay-9"></span>

              {/* Enhanced coin edge shine with animation */}
              <span className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full opacity-30 blur-3xl animate-glow"></span>
              <span className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full opacity-30 blur-3xl animate-glow-delay"></span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes glow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .animate-sparkle-delay-1 {
          animation: sparkle 2s ease-in-out 0.2s infinite;
        }
        .animate-sparkle-delay-2 {
          animation: sparkle 2s ease-in-out 0.4s infinite;
        }
        .animate-sparkle-delay-3 {
          animation: sparkle 2s ease-in-out 0.6s infinite;
        }
        .animate-sparkle-delay-4 {
          animation: sparkle 2s ease-in-out 0.8s infinite;
        }
        .animate-sparkle-delay-5 {
          animation: sparkle 2s ease-in-out 1s infinite;
        }
        .animate-sparkle-delay-6 {
          animation: sparkle 2s ease-in-out 1.2s infinite;
        }
        .animate-sparkle-delay-7 {
          animation: sparkle 2s ease-in-out 1.4s infinite;
        }
        .animate-sparkle-delay-8 {
          animation: sparkle 2s ease-in-out 1.6s infinite;
        }
        .animate-sparkle-delay-9 {
          animation: sparkle 2s ease-in-out 1.8s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-glow-delay {
          animation: glow 3s ease-in-out 1.5s infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s backwards;
        }
      `}</style>
    </section>
  );
}
