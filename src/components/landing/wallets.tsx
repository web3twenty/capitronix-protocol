import Image from "next/image";

const SupportedWallets = () => {
  const wallets = [
    {
      name: "MetaMask",
      icon: "/wallet/metamask.png",
      desc: "Most popular Web3 wallet",
    },
    {
      name: "Trust Wallet",
      icon: "/wallet/trust-wallet.png",
      desc: "Mobile-first crypto wallet",
    },
    {
      name: "WalletConnect",
      icon: "/wallet/Walletconnect.png",
      desc: "Connect any wallet",
    },
    {
      name: "Binance Wallet",
      icon: "/wallet/binance.png",
      desc: "Native BSC support",
    },
    {
      name: "Coinbase Wallet",
      icon: "/wallet/coinbase.png",
      desc: "Easy onboarding",
    },
    {
      name: "SafePal",
      icon: "/wallet/safe-pal.png",
      desc: "Hardware wallet support",
    },
    {
      name: "TokenPocket",
      icon: "/wallet/token-pocket.png",
      desc: "Multi-chain wallet",
    },
    {
      name: "Math Wallet",
      icon: "/wallet/math-wallet.jpg",
      desc: "DeFi-focused wallet",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 relative overflow-hidden !pt-0">
      {/* Background Effects */}
      {/* <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div> */}

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              Wallet Integration
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Supported Wallets
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with your favorite wallet seamlessly
          </p>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#11B97E]/30 hover:shadow-2xl hover:shadow-[#11B97E]/20 hover:scale-105"
            >
              {/* Top Gradient Line */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50 group-hover:via-[#11B97E] group-hover:opacity-100 transition-all duration-500"></div>

              <div className="p-4 sm:p-6 lg:p-8 text-center">
                {/* Wallet Icon */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="relative group-hover:scale-110 transition-transform duration-500">
                    <Image
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white/10 group-hover:border-[#11B97E]/50 transition-all duration-500"
                      src={wallet.icon}
                      alt={wallet.name}
                      width={100}
                      height={100}
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#11B97E]/0 group-hover:bg-[#11B97E]/20 rounded-full blur-xl transition-all duration-500"></div>
                  </div>
                </div>

                {/* Wallet Name */}
                <h3 className="text-white group-hover:text-[#11B97E] font-bold text-base sm:text-lg lg:text-xl mb-2 transition-colors duration-300">
                  {wallet.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 text-xs sm:text-sm transition-colors duration-300">
                  {wallet.desc}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedWallets;
