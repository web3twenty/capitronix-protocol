import Image from "next/image";
import Button from "../ui/Button";

export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
    >
      {/* Left Image */}
      <div className="border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-[#11B97E]/40 transition-all duration-300">
        <Image
          src="/landing-about.jpg"
          alt="About Web3Twenty"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Right Content */}
      <div className="text-center lg:text-left space-y-4">
        <h2 className="text-[#11B97E] text-sm sm:text-base font-semibold uppercase tracking-wider">
          About Web3Twenty
        </h2>
        <h3 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-snug">
          Building the infrastructure
        </h3>
        <p className="text-[#CFCFCF] text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
          Building the infrastructure for the next generation of Web3
          applications on Binance Smart Chain — combining cutting-edge
          blockchain technology with intuitive, user-friendly solutions that
          empower developers and users alike.
        </p>
        <div className="pt-4">
          <Button variant="secondary" className="h-10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
