import About from "@/components/landing/about";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}
