import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DonatePage as DonateComponent } from "@/components/DonatePage";

const Donate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <DonateComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
