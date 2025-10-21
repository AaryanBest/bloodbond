import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Stories as StoriesComponent } from "@/components/Stories";

const Stories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="mb-6">Stories That Inspire Change</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real stories from real people. Discover how blood donation has transformed lives and strengthened communities across the nation.
            </p>
          </div>
          <StoriesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
