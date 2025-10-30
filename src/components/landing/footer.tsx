import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const productLinks = [
    { name: "About", href: "#about" },
    { name: "Token & Presale", href: "#token-presale" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Revenue Sharing", href: "#revenue-sharing" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
  ];

  const pageLinks = [
    { name: "Whitepaper", href: "/3twenty.pdf" },
    { name: "Web3Twenty", href: "https://web3twenty.com/" },
    {
      name: "BscScan",
      href: "https://bscscan.com/address/0x2ffbdfa8638422bf3a5134434387b8fb5962da2c",
    },
    { name: "CoinGecko", href: "https://www.coingecko.com" },
    { name: "CoinMarketCap", href: "https://coinmarketcap.com" },
    { name: "BlockchainLovers", href: "https://blockchainlovers.com" },
  ];

  const otherLinks = [
    { name: "Terms Of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-950 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image src="/icon-300x100.png" alt="Logo" width={150} height={40} />
            <p className="text-gray-400 text-sm leading-relaxed">
              We started 3Twenty Coin to inspire a new generation of Web3
              believers, where innovation meets purpose and community drives
              value.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.facebook.com/web3twenty"
                target="_blank"
                className="bg-gray-800 text-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <i className="mgc_facebook_fill text-2xl"></i>
              </Link>

              <Link
                href="https://x.com/3twentycoin"
                target="_blank"
                className="bg-gray-800 text-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <i className="mgc_twitter_fill text-2xl"></i>
              </Link>

              <Link
                href="https://t.me/web3twenty1"
                target="_blank"
                className="bg-gray-800 text-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <i className="mgc_telegram_fill text-2xl"></i>
              </Link>

              <Link
                href="https://www.youtube.com/@Web3Twenty"
                target="_blank"
                className="bg-gray-800 text-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <i className="mgc_youtube_fill text-2xl"></i>
              </Link>
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Ecosystem
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Resources
            </h3>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Others</h3>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
