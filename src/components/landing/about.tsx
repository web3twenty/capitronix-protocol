import Image from "next/image";

export default function About() {
  const features = [
    {
      icon: "/icon-08.jpg",
      title: "3Twenty Smart Chain",
      description:
        "A next-generation blockchain built for scalability, low fees, and high-speed decentralized applications (dApps).",
      color: "from-brand-accent to-brand-gold",
    },
    {
      icon: "/icon-06.jpg",
      title: "3TWenty Pay",
      description:
        "A payroll and payment solution for businesses and employees, enabling seamless on-chain salary disbursement and cross-border transactions.",
      color: "from-brand-teal to-brand-accent",
    },
    {
      icon: "/icon-09.jpg",
      title: "3Twenty Coin",
      description:
        "The native digital currency powering the Web3Twenty ecosystem, used for payments, staking, governance, and rewards.",
      color: "from-brand-gold to-brand-teal",
    },
    {
      icon: "/icon-07.jpg",
      title: "3Twenty Labs",
      description:
        "The innovation hub driving research, development, and incubation of blockchain-based products and solutions.",
      color: "from-brand-gold to-brand-teal",
    },
    {
      icon: "/icon-11.jpg",
      title: "3Twenty Centralized Exchange (CEX)",
      description:
        "A secure and user-friendly trading platform for digital assets, enabling fast transactions, liquidity, and fiat on/off ramps.",
      color: "from-brand-gold to-brand-teal",
    },
    {
      icon: "/icon-10.jpg",
      title: "3Twenty Wallet",
      description:
        "A decentralized wallet solution to securely store, send, and manage crypto assets while supporting Web3 integration.",
      color: "from-brand-gold to-brand-teal",
    },
  ];

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 sm:px-10 py-8">
      {/* Left Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
        <div className="order-1 lg:order-2 text-center lg:text-left space-y-4 sm:space-y-6">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              About Web3Twenty
            </h2>
          </div>
          <h3 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Building the infrastructure
          </h3>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Building the infrastructure for the next generation of Web3
            applications on Binance Smart Chain — combining cutting-edge
            blockchain technology with intuitive, user-friendly solutions that
            empower developers and users alike.
          </p>
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12 mt-8">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              Our Products
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="border-2 hover:scale-105 border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-[#11B97E]/40 transition-all duration-300">
              <Image
                src={feature.icon}
                alt="Mountain landscape"
                className="w-full h-35 object-cover"
                width={600}
                height={300}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h2>
                <p className="text-gray-200 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
