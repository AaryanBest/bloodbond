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
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mb-4">Emergency Blood Request</h1>
            <p className="text-lg text-muted-foreground">
              Submit your urgent request and we'll instantly notify nearby donors and hospitals
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="blood-type">Required Blood Type *</Label>
                <Select value={bloodType} onValueChange={setBloodType} required>
                  <SelectTrigger id="blood-type">
                    <SelectValue placeholder="Select blood type" />
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
                <Label htmlFor="units">Units Needed *</Label>
                <Input
                  id="units"
                  type="number"
                  min="1"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patient">Patient Name *</Label>
                <Input
                  id="patient"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital Name</Label>
                <Input
                  id="hospital"
                  placeholder="Enter hospital name (if applicable)"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter contact number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Details *</Label>
                <Textarea
                  id="urgency"
                  placeholder="Describe the urgency (e.g., surgery scheduled, accident victim, etc.)"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Emergency Request
              </Button>
            </form>
          </Card>

          <Card className="mt-8 p-6 bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">
              Your request will be instantly shared with nearby donors and hospitals. 
              We'll contact you as soon as blood is located.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Emergency;
