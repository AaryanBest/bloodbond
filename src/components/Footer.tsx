import { Link } from "react-router-dom";

import { Droplet } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 border-t border-border/50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Droplet className="h-8 w-8 text-primary" fill="currentColor" />
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              BloodSync
            </span>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Connecting lives through technology. Every drop counts, every second matters.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <Link 
            to="/privacy" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/terms" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
          >
            Terms
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
        
        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-sm font-medium text-muted-foreground">
            © 2025 BloodSync. Built with purpose, designed to save lives.
          </p>
        </div>
      </div>
    </footer>
  );
};
