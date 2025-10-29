import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative p-8 sm:p-12 md:p-16 text-white flex items-start bg-black overflow-hidden"
    >
      {/* Left reflection */}
      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 -top-6 -left-6 sm:-top-10 sm:-left-10 bg-green-400/30 rounded-full blur-3xl pointer-events-none"></div>
      {/* Right reflection */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 bg-green-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto my-16 sm:my-20 grid grid-cols-1 lg:grid-cols-2 relative z-10 gap-8 sm:gap-12">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5">
            Web3Twenty <span className="text-[#11B97E]">Ecosystem</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#CFCFCF]">
            Join the 3Twenty revolution. The next-generation blockchain
            ecosystem powered by Binance Smart Chain with utility tokens and
            BEP20 standard.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-5">
            <Link href="/auth/login">
              <Button variant="secondary" roundedClass="rounded-full">
                <span className="px-3">Buy 3TWENTY Coin Now</span>
                <ChevronRight className="text-white w-4" />
              </Button>
            </Link>

            <Link href="/3twenty.pdf" target="_blank">
              <Button
                variant="outline-secondary"
                roundedClass="rounded-full border-0"
              >
                <span className="px-3">Whitepaper</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="justify-end hidden lg:flex">
          <div className="relative inline-block">
            {/* Main circle with shadow */}
            <div className="relative rounded-full h-48 w-48 sm:h-56 sm:w-56 md:h-60 md:w-60 p-2 bg-[#11B97E4D] shadow-lg flex items-center justify-center">
              {/* Inner border */}
              <div className="rounded-full w-full h-full border-4 border-[#11B97EFF] p-0">
                <Image
                  src="/3twentyIcon.png"
                  alt="Logo"
                  width={250}
                  height={250}
                  className="w-full h-full"
                />
              </div>

              {/* Sparkles */}
              <span className="absolute top-1 left-2 w-2 h-2 bg-[#11B97EFF] rounded-full opacity-80 animate-pulse"></span>
              <span className="absolute top-5 right-6 w-2 h-2 bg-[#0E966F] rounded-full opacity-70 animate-pulse delay-100"></span>
              <span className="absolute top-14 left-10 w-2 h-2 bg-[#11B97EFF] rounded-full opacity-80 animate-pulse delay-200"></span>
              <span className="absolute bottom-6 left-4 w-2 h-2 bg-[#0E966F] rounded-full opacity-70 animate-pulse delay-300"></span>
              <span className="absolute bottom-2 right-5 w-2 h-2 bg-[#11B97EFF] rounded-full opacity-80 animate-pulse delay-400"></span>
              <span className="absolute top-20 right-2 w-2 h-2 bg-[#0E966F] rounded-full opacity-70 animate-pulse delay-500"></span>
              <span className="absolute bottom-12 left-12 w-2 h-2 bg-[#11B97EFF] rounded-full opacity-80 animate-pulse delay-600"></span>
              <span className="absolute top-8 right-12 w-2 h-2 bg-[#0E966F] rounded-full opacity-70 animate-pulse delay-700"></span>
              <span className="absolute bottom-4 left-16 w-2 h-2 bg-[#11B97EFF] rounded-full opacity-80 animate-pulse delay-800"></span>
              <span className="absolute bottom-10 right-16 w-2 h-2 bg-[#0E966F] rounded-full opacity-70 animate-pulse delay-900"></span>

              {/* Coin edge shine */}
              <span className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full opacity-20 blur-3xl"></span>
              <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full opacity-20 blur-3xl"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
