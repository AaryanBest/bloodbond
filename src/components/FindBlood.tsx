import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const FindBlood = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [city, setCity] = useState("");
  const { toast } = useToast();

  const { data: inventory, refetch } = useQuery({
    queryKey: ["blood-inventory", selectedBloodType, city],
    queryFn: async () => {
      let query = supabase
        .from("blood_inventory")
        .select(`
          *,
          hospitals (
            id,
            name,
            address,
            city,
            phone
          )
        `)
        .gt("units_available", 0);

      if (selectedBloodType) {
        query = query.eq("blood_type", selectedBloodType as any);
      }

      if (city) {
        query = query.ilike("hospitals.city", `%${city}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!selectedBloodType) {
      toast({
        title: "Please select a blood type",
        variant: "destructive",
      });
      return;
    }
    refetch();
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-semibold text-primary">Quick Search</span>
          </div>
          <h2 className="mb-6">Find Blood Availability</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search for available blood units at hospitals near you in real-time
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 mb-10 glass-card border-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
              <SelectTrigger className="h-12 border-2 focus:border-primary">
                <SelectValue placeholder="Select Blood Type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    <span className="font-semibold">{type}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-12 border-2 focus:border-primary"
            />

            <Button 
              onClick={handleSearch} 
              className="w-full h-12"
              size="lg"
              variant="glow"
            >
              Search
            </Button>
          </div>
        </Card>

        {/* Results */}
        {inventory && inventory.length > 0 && (
          <div className="space-y-5">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Available Blood Units
            </h3>
            {inventory.map((item: any) => (
              <Card key={item.id} className="p-8 card-hover border-0 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-4 text-foreground">{item.hospitals.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{item.hospitals.address}, {item.hospitals.city}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{item.hospitals.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="inline-block p-6 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl border-2 border-primary/20">
                      <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                        {item.units_available}
                      </p>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Units of {item.blood_type}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {inventory && inventory.length === 0 && (
          <Card className="p-16 text-center border-0 bg-white/60 backdrop-blur-sm">
            <p className="text-xl text-muted-foreground mb-6">
              No blood units found matching your search. Try different criteria or{" "}
              <a href="/emergency" className="text-primary font-semibold underline hover:no-underline">
                submit an emergency request
              </a>
              .
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};
