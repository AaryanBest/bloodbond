import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Emergency = () => {
  const [bloodType, setBloodType] = useState("");
  const [unitsNeeded, setUnitsNeeded] = useState("1");
  const [city, setCity] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [urgency, setUrgency] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit an emergency request",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("blood_requests").insert({
        user_id: user.id,
        blood_type: bloodType as any,
        units_needed: parseInt(unitsNeeded),
        city,
        patient_name: patientName,
        hospital_name: hospitalName,
        contact_phone: contactPhone,
        urgency,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Emergency request submitted",
        description: "We're notifying nearby donors and hospitals immediately.",
      });

      // Reset form
      setBloodType("");
      setUnitsNeeded("1");
      setCity("");
      setPatientName("");
      setHospitalName("");
      setContactPhone("");
      setUrgency("");
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-20 px-4 bg-gradient-to-b from-destructive/5 to-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-destructive/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-destructive/5 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
                <div className="relative p-4 bg-gradient-to-br from-destructive/10 to-destructive/20 rounded-2xl border border-destructive/30">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Emergency Blood Request</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit your urgent request—we'll instantly notify nearby donors and hospitals
            </p>
          </div>

          <Card className="p-8 glass-card border-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="blood-type" className="text-sm font-medium">Required Blood Type *</Label>
                <Select value={bloodType} onValueChange={setBloodType} required>
                  <SelectTrigger id="blood-type" className="h-12">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="units" className="text-sm font-medium">Units Needed *</Label>
                <Input
                  id="units"
                  type="number"
                  min="1"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patient" className="text-sm font-medium">Patient Name *</Label>
                <Input
                  id="patient"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital" className="text-sm font-medium">Hospital Name</Label>
                <Input
                  id="hospital"
                  placeholder="Enter hospital name (if applicable)"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Contact Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter contact number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency" className="text-sm font-medium">Urgency Details *</Label>
                <Textarea
                  id="urgency"
                  placeholder="Describe the urgency (e.g., surgery scheduled, accident victim)"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  required
                  rows={3}
                  className="resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="destructive"
              >
                Submit Emergency Request
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Your request will be instantly shared with nearby donors and hospitals
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Emergency;
