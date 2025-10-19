import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Droplet, Hospital, Users } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h1 className="mb-6 font-bold leading-tight">
          Find Blood. Save Lives. Faster Than Ever.
        </h1>

        {/* Subheading */}
        <p className="mb-12 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Connecting patients, donors, and hospitals in real time. Every drop counts.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/find-blood")}
          >
            <Droplet className="mr-2 h-5 w-5" />
            Find Blood Near You
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-full shadow hover:shadow-lg transition-all"
            onClick={() => navigate("/donate")}
          >
            Become a Donor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Droplet className="h-10 w-10 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">12,000+</p>
            <p className="text-muted-foreground">Lives Saved</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Hospital className="h-10 w-10 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">500+</p>
            <p className="text-muted-foreground">Hospitals Connected</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">15,000+</p>
            <p className="text-muted-foreground">Active Donors</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
