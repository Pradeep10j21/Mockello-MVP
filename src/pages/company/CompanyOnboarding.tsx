import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Building2, User, FileText, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Company Info", icon: Building2 },
  { id: 2, title: "HR Details", icon: User },
  { id: 3, title: "About", icon: FileText },
];

const industries = [
  "Information Technology",
  "Finance & Banking",
  "Healthcare",
  "Manufacturing",
  "Consulting",
  "E-commerce",
  "Education",
  "Automotive",
  "Telecommunications",
  "Other",
];

const CompanyOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1: Company Info
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  // Step 2: HR Details
  const [hrName, setHrName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrPhone, setHrPhone] = useState("");

  // Step 3: About
  const [description, setDescription] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");

  const handleNext = () => {
    if (currentStep === 1) {
      if (!companyName || !industry || !location) {
        toast({
          title: "Required Fields",
          description: "Please fill in company name, industry, and location",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 2) {
      if (!hrName || !hrEmail) {
        toast({
          title: "Required Fields",
          description: "Please fill in HR name and email",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    if (!description) {
      toast({
        title: "Required Field",
        description: "Please add a company description",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Setup Complete!",
        description: "Welcome to GenZ Placify",
      });
      navigate("/company/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-forest-medium flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground">
            Let's set up your company profile to get started
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-forest-medium text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-20 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step.id ? "bg-forest-medium" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card-forest">
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  Company Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tell us about your organization
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Company Name *
                  </label>
                  <Input
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Industry *
                  </label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Location *
                  </label>
                  <Input
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Website
                  </label>
                  <Input
                    placeholder="https://www.company.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: HR Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  HR Contact Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Primary contact for placement activities
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    HR Name *
                  </label>
                  <Input
                    placeholder="Full name"
                    value={hrName}
                    onChange={(e) => setHrName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    HR Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="hr@company.com"
                    value={hrEmail}
                    onChange={(e) => setHrEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={hrPhone}
                    onChange={(e) => setHrPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: About */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  About Your Company
                </h2>
                <p className="text-sm text-muted-foreground">
                  Help colleges understand your organization
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Company Description *
                  </label>
                  <Textarea
                    placeholder="Brief description about your company, culture, and what you're looking for..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Employee Count
                  </label>
                  <Select value={employeeCount} onValueChange={setEmployeeCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="501-1000">501-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            {currentStep < 3 ? (
              <Button variant="forest" onClick={handleNext} className="gap-2">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="forest"
                onClick={handleComplete}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? "Completing..." : "Complete Setup"}
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
