import { Link } from "react-router-dom";
import { Building2, ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompanyDashboard = () => {
  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="card-forest">
          <div className="w-20 h-20 rounded-2xl bg-forest-medium mx-auto mb-6 flex items-center justify-center shadow-medium">
            <Building2 className="w-10 h-10 text-primary-foreground" />
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Company Dashboard
          </h1>

          <div className="flex items-center justify-center gap-2 text-accent mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Handled by Another Team</span>
          </div>

          <p className="text-muted-foreground mb-8">
            This module is being developed by a separate team. 
            Please check back later for full functionality.
          </p>

          <Button variant="forest" className="w-full" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
