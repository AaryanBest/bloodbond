import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Users, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-donor.jpg";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Subtle Background Elements */}
      <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Every second counts. Every donor matters.</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Give Life.<br />
              <span className="text-primary">Save Lives.</span><br />
              Start Today.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Connect with donors and hospitals instantly. BloodBond bridges the gap between those who need blood and those ready to give—making every donation count when it matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/find-blood")}
                className="group bg-primary hover:bg-primary-dark text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                Find Blood Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/donate")}
                className="group border-2 border-primary/20 hover:border-primary/40 text-lg px-8 py-6 bg-white/50 backdrop-blur-sm"
              >
                Become a Donor
                <Heart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <p className="text-3xl font-bold text-foreground">18K+</p>
                </div>
                <p className="text-sm text-muted-foreground">Active Donors</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  <p className="text-3xl font-bold text-foreground">650+</p>
                </div>
                <p className="text-sm text-muted-foreground">Hospitals</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-secondary" />
                  <p className="text-3xl font-bold text-foreground">24K+</p>
                </div>
                <p className="text-sm text-muted-foreground">Lives Saved</p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative fade-in-up lg:order-last" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Woman donating blood in modern medical facility" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
