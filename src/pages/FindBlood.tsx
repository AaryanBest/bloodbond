import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FindBlood as FindBloodComponent } from "@/components/FindBlood";

const FindBlood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="mb-6">Find Blood When It Matters Most</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Search our network of hospitals and blood banks to locate the blood type you need. Real-time availability across hundreds of facilities.
            </p>
          </div>
          <FindBloodComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindBlood;
