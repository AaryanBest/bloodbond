import { Activity, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Connecting Those Who Need<br />With Those Who Give
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building a future where no patient waits for blood. Through innovative technology and a passionate community, we connect hospitals, donors, and patients in real-time—because every second counts.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Real-time blood inventory tracking and instant donor alerts across hundreds of facilities nationwide",
              color: "from-primary/10 to-primary-glow/10 border-primary/20"
            },
            {
              icon: Shield,
              title: "Secure & Verified",
              description: "Bank-level encryption with verified hospitals and donors. Your data and health information are always protected",
              color: "from-accent/10 to-accent/20 border-accent/20"
            },
            {
              icon: Activity,
              title: "Lives Saved",
              description: "Over 24,000 successful matches. Seamless coordination between donors and hospitals when every second counts",
              color: "from-secondary/10 to-secondary/20 border-secondary/20"
            },
          ].map((feature, index) => (
            <Card 
              key={index}
              className="p-8 text-center card-hover border-0 bg-white/90 backdrop-blur-sm shadow-lg group"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl border group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "18K+", label: "Active Donors", sublabel: "Ready to help" },
            { number: "650+", label: "Partner Hospitals", sublabel: "Nationwide network" },
            { number: "24K+", label: "Lives Saved", sublabel: "And counting" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-muted/30 to-background border border-border/50">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-lg font-bold text-foreground mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
