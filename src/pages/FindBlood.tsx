import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FindBlood as FindBloodComponent } from "@/components/FindBlood";
const FindBlood = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          
          <FindBloodComponent />
        </div>
      </main>
      <Footer />
    </div>;
};
export default FindBlood;