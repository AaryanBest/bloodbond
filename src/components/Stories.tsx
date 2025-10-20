import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";

export const Stories = () => {
  const { data: stories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl border border-primary/20">
              <Heart className="h-14 w-14 text-primary floating-animation" fill="currentColor" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl italic text-muted-foreground max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            "Behind every donation, there's a story of life renewed."
          </p>
          <h2 className="mb-6">Stories of Hope</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from donors, recipients, and healthcare heroes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories && stories.length > 0 ? (
            stories.map((story) => (
              <Card key={story.id} className="p-8 card-hover border-0 bg-white/80 backdrop-blur-sm group">
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>
                <Button variant="outline" className="w-full" size="lg">
                  Read More
                </Button>
              </Card>
            ))
          ) : (
            <>
              <Card className="p-8 card-hover border-0 bg-white/80 backdrop-blur-sm group">
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  A Second Chance at Life
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  When Sarah needed an emergency transfusion, BloodSync connected her to a donor in minutes...
                </p>
                <Button variant="outline" className="w-full" size="lg">
                  Read More
                </Button>
              </Card>

              <Card className="p-8 card-hover border-0 bg-white/80 backdrop-blur-sm group">
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Community Heroes
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Meet the donors who've made it their mission to be available whenever needed...
                </p>
                <Button variant="outline" className="w-full" size="lg">
                  Read More
                </Button>
              </Card>

              <Card className="p-8 card-hover border-0 bg-white/80 backdrop-blur-sm group">
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Hospital Partnership Success
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  How one hospital reduced emergency wait times by 60% using BloodSync...
                </p>
                <Button variant="outline" className="w-full" size="lg">
                  Read More
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
