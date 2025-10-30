import About from "@/components/landing/about";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Roadmap from "@/components/landing/roadmap";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Header />
      <Hero />
      <About />
      <Roadmap />
      <Footer />
    </div>
  );
}
