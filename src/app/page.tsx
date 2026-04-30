// import About from "@/components/landing/about";
// import Footer from "@/components/landing/footer";
// import Header from "@/components/landing/header";
// import Hero from "@/components/landing/hero";
// import ReferralAndRankRewards from "@/components/landing/referralandranking";
// import Roadmap from "@/components/landing/roadmap";
// import TokenDetailsSection from "@/components/landing/tokendetails";
// import SupportedWallets from "@/components/landing/wallets";
import { redirect } from "next/navigation";

export default function LandingPage() {
  redirect("/auth/login");

  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
  //     <Header />
  //     <Hero />
  //     <About />
  //     <TokenDetailsSection />
  //     <ReferralAndRankRewards />
  //     <SupportedWallets />
  //     <Roadmap />
  //     <Footer />
  //   </div>
  // );
}
