import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2025 BloodSync. Built with purpose.
        </p>
      </div>
    </footer>
  );
};
