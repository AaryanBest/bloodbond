import { Activity, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Our Mission</span>
          </div>
          <h2 className="mb-6">Bridging the Gap Between<br />Those Who Need and Those Who Give</h2>
          
          <p className="text-2xl md:text-3xl font-bold mb-10 leading-relaxed max-w-4xl mx-auto text-foreground">
            BloodBond exists to make life-saving blood accessible, fast, and transparent for everyone who needs it.
          </p>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We're building a future where no patient waits for blood. Through innovative technology and a passionate community, we connect hospitals, donors, and patients in real-time—because every second matters when lives are on the line.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
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
              className="p-10 text-center card-hover border-0 bg-white/90 backdrop-blur-sm shadow-lg group"
            >
              <div className="flex justify-center mb-6">
                <div className={`p-5 bg-gradient-to-br ${feature.color} rounded-2xl border-2 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "18K+", label: "Active Donors", sublabel: "Ready to help" },
            { number: "650+", label: "Partner Hospitals", sublabel: "Nationwide network" },
            { number: "24K+", label: "Lives Saved", sublabel: "And counting" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-background border border-border/50">
              <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-xl font-bold text-foreground mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
