import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FindBlood } from "@/components/FindBlood";
import { DonatePage } from "@/components/DonatePage";
import { Stories } from "@/components/Stories";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FindBlood />
        <DonatePage />
        <Stories />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
