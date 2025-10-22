import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Stories as StoriesComponent } from "@/components/Stories";

const Stories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <StoriesComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
