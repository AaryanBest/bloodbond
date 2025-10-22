import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Quote } from "lucide-react";

// Mockup stories data
const mockupStories = [
  {
    id: "1",
    title: "A Second Chance at Life",
    content: "When Sarah needed an emergency transfusion after a car accident, BloodBond connected her to a donor in just 8 minutes. Today, she's back with her family, coaching her daughter's soccer team, and living proof of how every drop counts. 'I never thought I'd need blood, but when I did, the system worked flawlessly,' she says.",
    donor_name: "Sarah Mitchell",
    published: true
  },
  {
    id: "2",
    title: "Becoming a Regular Hero",
    content: "After donating for the first time, Marcus discovered his O-negative blood type made him a universal donor. Five years and 32 donations later, he's helped save countless lives. 'Knowing that 15 minutes of my time can save three lives? That's the easiest decision I make all year,' Marcus shares with a smile.",
    donor_name: "Marcus Rodriguez",
    published: true
  },
  {
    id: "3",
    title: "A Mother's Gratitude",
    content: "When Emma's newborn needed a rare blood type for emergency surgery, she felt helpless. Within hours, BloodBond located three compatible donors willing to help. 'My son is healthy today because strangers chose to be heroes. I'll forever be grateful to this community of lifesavers,' Emma recalls emotionally.",
    donor_name: "Emma Chen",
    published: true
  }
];

export const Stories = () => {
  const { data: stories, isLoading } = useQuery({
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

  // Use mockup data if no stories from database
  const displayStories = stories && stories.length > 0 ? stories : mockupStories;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Stories That Inspire Change</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people. Discover how blood donation has transformed lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStories.map((story: any) => (
            <Card key={story.id} className="p-6 card-hover border-0 bg-white/90 backdrop-blur-sm shadow-lg relative overflow-hidden group">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-foreground">{story.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  {story.content}
                </p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs font-semibold text-primary">— {story.donor_name}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
