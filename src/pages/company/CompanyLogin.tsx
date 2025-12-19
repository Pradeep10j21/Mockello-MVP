import { Link } from "react-router-dom";
import { Leaf, Building2, ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompanyLogin = () => {
  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="card-forest">
          <div className="w-20 h-20 rounded-2xl bg-forest-medium mx-auto mb-6 flex items-center justify-center shadow-medium">
            <Building2 className="w-10 h-10 text-primary-foreground" />
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Company Portal
          </h1>

          <div className="flex items-center justify-center gap-2 text-accent mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Under Development</span>
          </div>

          <p className="text-muted-foreground mb-8">
            The Company module is currently being handled by another team. 
            This portal will enable companies to post opportunities, 
            view eligible students, and manage placements.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 text-left">
              <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Company profile management</li>
                <li>• Job posting and requirements</li>
                <li>• View eligible colleges</li>
                <li>• Student application tracking</li>
              </ul>
            </div>

            <Button variant="forest" className="w-full" asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
