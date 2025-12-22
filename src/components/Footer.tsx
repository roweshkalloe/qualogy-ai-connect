import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline">•</span>
          <span>© {new Date().getFullYear()} Qualogy. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
