import { Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-forest">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              GreenPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              About
            </a>
            <Link
              to="/college/login"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Button variant="forest" size="sm" asChild>
              <Link to="/college/login">Sign Up</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-up">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              About
            </a>
            <Link
              to="/college/login"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Button variant="forest" size="sm" asChild>
              <Link to="/college/login">Sign Up</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
