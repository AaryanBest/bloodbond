import { Activity, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-5xl text-center">
        <div className="mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-semibold text-primary">Our Mission</span>
          </div>
          <h2 className="mb-8">About BloodSync</h2>
          
          <p className="text-2xl md:text-3xl font-bold mb-10 leading-relaxed max-w-4xl mx-auto">
            BloodSync exists to make life-saving blood accessible, fast, and transparent for everyone.
          </p>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Built by students, powered by purpose. We aim to connect hospitals, donors, 
            and patients through technology that saves lives. Every second counts in an 
            emergency, and we're here to make sure that when blood is needed, it's found 
            faster than ever before.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Zap,
              title: "Real-Time",
              description: "Instant inventory tracking and donor alerts",
            },
            {
              icon: Shield,
              title: "Secure",
              description: "Protected data with verified hospitals",
            },
            {
              icon: Activity,
              title: "Lifesaving",
              description: "Seamless coordination when it matters most",
            },
          ].map((feature, index) => (
            <Card 
              key={index}
              className="p-8 text-center card-hover border-0 bg-white/80 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl border border-primary/20">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
