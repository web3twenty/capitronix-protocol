import Image from "next/image";

export default function About() {
  const features = [
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
      icon: "/icon-08.jpg",
      title: "3Twenty Smart Chain",
      description:
        "A next-generation blockchain built for scalability, low fees, and high-speed decentralized applications (dApps).",
      color: "from-brand-accent to-brand-gold",
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
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20"
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-28">
        {/* Left Image */}
        <div className="order-2 lg:order-1 group">
          <div className="relative border-2 border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#11B97E]/30 transition-all duration-500 hover:border-[#11B97E]/30 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#11B97E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <Image
              src="/landing-about.jpg"
              alt="About Web3Twenty"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
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

      {/* Products Section */}
      <div className="space-y-8 sm:space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              Our Products
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl sm:rounded-3xl border-2 border-white/10 shadow-xl overflow-hidden bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm hover:border-[#11B97E]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#11B97E]/20 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[3.15/1] sm:aspect-[3.15/1] lg:aspect-[3.15/1]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={630}
                  height={200}
                />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#11B97E]/0 to-[#11B97E]/0 group-hover:from-[#11B97E]/10 group-hover:to-transparent transition-all duration-500 z-10" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 lg:p-8 space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#11B97E] transition-colors duration-300">
                  {feature.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
