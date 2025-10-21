import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DonatePage as DonateComponent } from "@/components/DonatePage";

const Donate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="mb-6">Become a Lifesaver Today</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your donation can save up to three lives. Join our community of heroes and make a lasting impact on someone's tomorrow.
            </p>
          </div>
          <DonateComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
