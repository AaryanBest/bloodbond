import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Mockup data for initial display
const mockupInventory = [
  {
    id: "1",
    blood_type: "O+",
    units_available: 45,
    hospitals: {
      id: "h1",
      name: "City General Hospital",
      address: "123 Medical Center Dr",
      city: "New York",
      phone: "(555) 123-4567"
    }
  },
  {
    id: "2",
    blood_type: "A+",
    units_available: 32,
    hospitals: {
      id: "h2",
      name: "Metro Health Center",
      address: "456 Healthcare Ave",
      city: "New York",
      phone: "(555) 234-5678"
    }
  },
  {
    id: "3",
    blood_type: "B+",
    units_available: 28,
    hospitals: {
      id: "h3",
      name: "Central Medical Institute",
      address: "789 Wellness Blvd",
      city: "Los Angeles",
      phone: "(555) 345-6789"
    }
  },
  {
    id: "4",
    blood_type: "AB+",
    units_available: 15,
    hospitals: {
      id: "h4",
      name: "University Hospital",
      address: "321 Campus Rd",
      city: "Chicago",
      phone: "(555) 456-7890"
    }
  }
];

export const FindBlood = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [city, setCity] = useState("");
  const [showResults, setShowResults] = useState(false);
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
    setShowResults(true);
    refetch();
  };

  // Use mockup data initially or when there's no real data
  const displayData = showResults && inventory && inventory.length > 0 ? inventory : mockupInventory;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Instant Blood Locator</span>
          </div>
          <h2 className="mb-6">Find Blood When It Matters Most</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access real-time blood availability across hundreds of hospitals and blood banks in your area
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-10 mb-16 glass-card border-0 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-muted-foreground">Blood Type</Label>
              <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                <SelectTrigger className="h-14 border-2 focus:border-primary text-base">
                  <SelectValue placeholder="Select Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      <span className="font-semibold text-base">{type}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-muted-foreground">Location</Label>
              <Input
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-14 border-2 focus:border-primary text-base"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-muted-foreground opacity-0">Action</Label>
              <Button 
                onClick={handleSearch} 
                className="w-full h-14 text-base font-semibold"
                size="lg"
                variant="glow"
              >
                Search Availability
              </Button>
            </div>
          </div>
        </Card>

        {/* Results - Always show mockup data */}
        <div className="space-y-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">
              Available Blood Units Near You
            </h3>
            <p className="text-muted-foreground">Real-time inventory from verified medical facilities</p>
          </div>
          {displayData.map((item: any) => (
            <Card key={item.id} className="p-10 card-hover border-0 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1 space-y-5">
                  <div>
                    <h4 className="text-3xl font-bold mb-2 text-foreground">{item.hospitals.name}</h4>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary-glow rounded-full" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Location</p>
                        <p className="text-lg font-medium text-foreground">{item.hospitals.address}, {item.hospitals.city}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-xl">
                        <Phone className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Contact</p>
                        <p className="text-lg font-medium text-foreground">{item.hospitals.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="inline-block p-8 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-primary/10 rounded-3xl border-2 border-primary/20 shadow-lg">
                    <p className="text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mb-3">
                      {item.units_available}
                    </p>
                    <p className="text-base font-bold text-muted-foreground uppercase tracking-wider">
                      {item.blood_type} Units
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Available Now</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
