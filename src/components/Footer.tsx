import { Link } from "react-router-dom";
import { Droplet, Heart, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Droplet className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold text-foreground tracking-tight">
                BloodBond
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Building connections that save lives. Every donation makes a difference. Every donor is a hero. Together, we're creating a healthier tomorrow.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-primary" />
              <span>Trusted by 18,000+ donors nationwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Navigate</h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/find-blood" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Find Blood
              </Link>
              <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Become a Donor
              </Link>
              <Link to="/stories" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Success Stories
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/emergency" className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium">
                Emergency Request
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>1-800-BLOOD-NOW</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@bloodbond.org</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Available nationwide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 BloodBond. All rights reserved. Saving lives, one donation at a time.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
