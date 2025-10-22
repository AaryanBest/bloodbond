import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About as AboutComponent } from "@/components/About";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <AboutComponent />
      </main>
      <Footer />
    </div>
  );
};

export default About;
