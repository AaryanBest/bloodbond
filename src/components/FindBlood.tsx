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
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="mb-4">Find Blood Availability</h2>
          <p className="text-lg text-muted-foreground">
            Search for available blood units at hospitals near you
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Blood Type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <Button onClick={handleSearch} className="w-full">
              Search
            </Button>
          </div>
        </Card>

        {/* Results */}
        {inventory && inventory.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Available Blood Units
            </h3>
            {inventory.map((item: any) => (
              <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{item.hospitals.name}</h4>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.hospitals.address}, {item.hospitals.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{item.hospitals.phone}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-3xl font-bold text-primary mb-1">
                      {item.units_available}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Units of {item.blood_type}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {inventory && inventory.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground">
              No blood units found matching your search. Try different criteria or{" "}
              <a href="/emergency" className="text-primary underline">
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
