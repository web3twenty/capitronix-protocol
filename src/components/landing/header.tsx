import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between fixed left-0 top-0 right-0 z-999 border-b border-[#2A2A2A] bg-[#13171E] p-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-2 md:px-6">
        {/* Logo */}
        <Link href="/dashboard" className="block flex-shrink-0">
          <Image src="/icon-300x100.png" alt="Logo" width={150} height={70} />
        </Link>

        {/* Center nav */}
        <div className="flex-1 mx-4 hidden lg:flex items-center justify-center">
          <ul className="flex space-x-6 text-white">
            {[
              { title: "Home", link: "#" },
              { title: "About", link: "#about" },
              { title: "Token & Presale", link: "#token-presale" },
              { title: "Tokenomics", link: "#tokenomics" },
              { title: "Revenue Sharing", link: "#revenue-sharing" },
              { title: "Roadmap", link: "#roadmap" },
              { title: "Community", link: "#community" },
            ].map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="flex-shrink-0">
          <Link href="/auth/login">
            <Button
              variant="secondary"
              roundedClass="rounded-full"
              className="h-10"
            >
              <span className="px-3">Launch App</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
