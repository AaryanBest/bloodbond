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
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-primary" fill="currentColor" />
          </div>
          <p className="text-xl md:text-2xl italic text-muted-foreground max-w-2xl mx-auto mb-8">
            "Behind every donation, there's a story of life renewed."
          </p>
          <h2 className="mb-4">Stories of Hope</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories && stories.length > 0 ? (
            stories.map((story) => (
              <Card key={story.id} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {story.excerpt}
                </p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </Card>
            ))
          ) : (
            <>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">A Second Chance at Life</h3>
                <p className="text-muted-foreground mb-4">
                  When Sarah needed an emergency transfusion, BloodSync connected her to a donor in minutes...
                </p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Community Heroes</h3>
                <p className="text-muted-foreground mb-4">
                  Meet the donors who've made it their mission to be available whenever needed...
                </p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Hospital Partnership Success</h3>
                <p className="text-muted-foreground mb-4">
                  How one hospital reduced emergency wait times by 60% using BloodSync...
                </p>
                <Button variant="outline" className="w-full">
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
