import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About as AboutComponent } from "@/components/About";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="mb-6">Our Mission to Save Lives</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              BloodBond was founded on a simple belief: no one should lose their life waiting for blood. We're building a future where every patient has access to the blood they need, exactly when they need it.
            </p>
          </div>
          <AboutComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
