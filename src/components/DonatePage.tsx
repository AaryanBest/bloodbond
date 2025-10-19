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
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="mb-4">Become a Donor</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Become a donor and help save lives near you. It only takes 15 minutes to make a difference.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="blood-type">Blood Type *</Label>
              <Select value={bloodType} onValueChange={setBloodType} required>
                <SelectTrigger id="blood-type">
                  <SelectValue placeholder="Select your blood type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Contact Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Last Donation Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
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

            <Button type="submit" className="w-full" size="lg">
              Register as Donor
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
