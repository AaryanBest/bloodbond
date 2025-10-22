import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DonatePage = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [lastDonation, setLastDonation] = useState<Date>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to register as a donor",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      // Update profile
      await supabase
        .from("profiles")
        .update({ phone, city })
        .eq("id", user.id);

      // Create or update donor record
      const { error } = await supabase.from("donors").upsert({
        user_id: user.id,
        blood_type: bloodType as any,
        last_donation_date: lastDonation ? format(lastDonation, "yyyy-MM-dd") : null,
        available: true,
      });

      if (error) throw error;

      toast({
        title: "Registration successful!",
        description: "Thank you for becoming a donor. You're helping save lives.",
      });

      // Reset form
      setBloodType("");
      setCity("");
      setPhone("");
      setLastDonation(undefined);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Register as a Donor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of heroes saving lives. One donation can save up to three people.
          </p>
        </div>

        <Card className="p-10 glass-card border-0 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="blood-type" className="text-sm font-medium">Blood Type *</Label>
              <Select value={bloodType} onValueChange={setBloodType} required>
                <SelectTrigger id="blood-type" className="h-12">
                  <SelectValue placeholder="Select your blood type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">City *</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Contact Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Last Donation Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !lastDonation && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lastDonation ? format(lastDonation, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={lastDonation}
                    onSelect={setLastDonation}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" variant="glow">
                Register as Donor
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};
