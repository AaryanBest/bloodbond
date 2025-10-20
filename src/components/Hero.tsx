import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Droplet, Hospital, Users } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-6xl text-center">
        {/* Headline */}
        <div className="mb-8 fade-in-up">
          <div className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-semibold text-primary">Healthcare Reimagined</span>
          </div>
          <h1 className="mb-6 font-bold leading-tight">
            Find Blood. Save Lives.<br />Faster Than Ever.
          </h1>
        </div>

        {/* Subheading */}
        <p className="mb-12 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium fade-in-up" style={{ animationDelay: "0.1s" }}>
          Connecting patients, donors, and hospitals in real time. Every drop counts, every second matters.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Button
            size="xl"
            variant="glow"
            onClick={() => navigate("/find-blood")}
            className="group"
          >
            <Droplet className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Find Blood Near You
          </Button>
          <Button
            size="xl"
            variant="outline"
            onClick={() => navigate("/donate")}
            className="group border-2"
          >
            <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Become a Donor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Droplet, number: "12,000+", label: "Lives Saved", delay: "0.3s" },
            { icon: Hospital, number: "500+", label: "Hospitals Connected", delay: "0.4s" },
            { icon: Users, number: "15,000+", label: "Active Donors", delay: "0.5s" },
          ].map((stat, index) => (
            <Card 
              key={index}
              className="p-8 text-center card-hover fade-in-up border-0 bg-white/60 backdrop-blur-sm"
              style={{ animationDelay: stat.delay }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-muted-foreground font-semibold">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
