import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Leaf, Building2, User, FileText, ChevronRight, ChevronLeft, Check, 
  MapPin, Globe, Phone, Mail, Users, Briefcase, Calendar, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Company Info", icon: Building2 },
  { id: 2, title: "Contact Details", icon: User },
  { id: 3, title: "Recruitment Info", icon: Briefcase },
  { id: 4, title: "About Company", icon: FileText },
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
  "Real Estate",
  "Media & Entertainment",
  "Hospitality",
  "Retail",
  "Other",
];

const companyTypes = [
  "Private Limited",
  "Public Limited",
  "Startup",
  "MNC",
  "Government",
  "Non-Profit",
  "Partnership",
  "Other",
];

const hiringFrequencies = [
  "Monthly",
  "Quarterly",
  "Bi-Annually",
  "Annually",
  "As per requirement",
];

const recruitmentModes = [
  "On-Campus",
  "Off-Campus",
  "Virtual/Online",
  "Hybrid",
];

const CompanyOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1: Company Basic Info
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [branchLocations, setBranchLocations] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  // Step 2: Contact Details
  const [hrName, setHrName] = useState("");
  const [hrDesignation, setHrDesignation] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrPhone, setHrPhone] = useState("");
  const [altContactName, setAltContactName] = useState("");
  const [altContactEmail, setAltContactEmail] = useState("");
  const [altContactPhone, setAltContactPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // Step 3: Recruitment Info
  const [hiringFrequency, setHiringFrequency] = useState("");
  const [recruitmentMode, setRecruitmentMode] = useState<string[]>([]);
  const [typicalRoles, setTypicalRoles] = useState("");
  const [preferredBranches, setPreferredBranches] = useState<string[]>([]);
  const [minCgpa, setMinCgpa] = useState("");
  const [packageRange, setPackageRange] = useState("");
  const [internshipOffered, setInternshipOffered] = useState(false);

  // Step 4: About Company
  const [description, setDescription] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [workCulture, setWorkCulture] = useState("");
  const [benefits, setBenefits] = useState("");
  const [certifications, setCertifications] = useState("");

  const branches = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Electrical",
    "Mechanical",
    "Civil",
    "Chemical",
    "Biotechnology",
    "MBA",
    "BBA",
    "Other",
  ];

  const handleModeToggle = (mode: string) => {
    setRecruitmentMode((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleBranchToggle = (branch: string) => {
    setPreferredBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!companyName || !industry || !companyType || !headquarters) {
          toast({
            title: "Required Fields",
            description: "Please fill in company name, industry, type, and headquarters",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!hrName || !hrEmail || !hrPhone) {
          toast({
            title: "Required Fields",
            description: "Please fill in HR name, email, and phone",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!hiringFrequency || recruitmentMode.length === 0) {
          toast({
            title: "Required Fields",
            description: "Please select hiring frequency and recruitment mode",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4:
        if (!description || !employeeCount) {
          toast({
            title: "Required Fields",
            description: "Please add company description and employee count",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Complete!",
        description: "Welcome to GenZ Placify. Your company profile is now active.",
      });
      navigate("/company/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-forest-medium flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Company Registration
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Complete your profile to start hiring top talent
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 md:mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
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
                <span className={`text-xs mt-1 hidden md:block ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 md:w-20 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step.id ? "bg-forest-medium" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card-forest">
          {/* Step 1: Company Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  Company Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Basic details about your organization
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Company Type *
                  </label>
                  <Select value={companyType} onValueChange={setCompanyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {companyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Registration/CIN Number
                  </label>
                  <Input
                    placeholder="e.g., U72200MH2020PTC123456"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Year Established
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 2015"
                    value={yearEstablished}
                    onChange={(e) => setYearEstablished(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Headquarters Location *
                  </label>
                  <Input
                    placeholder="City, State"
                    value={headquarters}
                    onChange={(e) => setHeadquarters(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Branch Locations
                  </label>
                  <Input
                    placeholder="e.g., Mumbai, Bangalore, Delhi"
                    value={branchLocations}
                    onChange={(e) => setBranchLocations(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Company Website
                  </label>
                  <Input
                    placeholder="https://www.company.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    LinkedIn Page
                  </label>
                  <Input
                    placeholder="https://linkedin.com/company/..."
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  Contact Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Primary and alternate contact information
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Primary HR Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Designation
                    </label>
                    <Input
                      placeholder="e.g., HR Manager"
                      value={hrDesignation}
                      onChange={(e) => setHrDesignation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email *
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
                      Phone Number *
                    </label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={hrPhone}
                      onChange={(e) => setHrPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Alternate Contact (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Name
                    </label>
                    <Input
                      placeholder="Full name"
                      value={altContactName}
                      onChange={(e) => setAltContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="alt@company.com"
                      value={altContactEmail}
                      onChange={(e) => setAltContactEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Phone
                    </label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={altContactPhone}
                      onChange={(e) => setAltContactPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Company Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Full Address
                    </label>
                    <Textarea
                      placeholder="Street address, area, city"
                      rows={2}
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Pincode
                    </label>
                    <Input
                      placeholder="e.g., 400001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Recruitment Info */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  Recruitment Preferences
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your hiring patterns and requirements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Hiring Frequency *
                  </label>
                  <Select value={hiringFrequency} onValueChange={setHiringFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {hiringFrequencies.map((freq) => (
                        <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Package Range (LPA)
                  </label>
                  <Input
                    placeholder="e.g., 5-15 LPA"
                    value={packageRange}
                    onChange={(e) => setPackageRange(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Recruitment Mode *
                </label>
                <div className="flex flex-wrap gap-3">
                  {recruitmentModes.map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mode-${mode}`}
                        checked={recruitmentMode.includes(mode)}
                        onCheckedChange={() => handleModeToggle(mode)}
                      />
                      <label
                        htmlFor={`mode-${mode}`}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {mode}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Preferred Branches for Hiring
                </label>
                <div className="flex flex-wrap gap-3">
                  {branches.map((branch) => (
                    <div key={branch} className="flex items-center space-x-2">
                      <Checkbox
                        id={`branch-${branch}`}
                        checked={preferredBranches.includes(branch)}
                        onCheckedChange={() => handleBranchToggle(branch)}
                      />
                      <label
                        htmlFor={`branch-${branch}`}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {branch}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Minimum CGPA Requirement
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 6.0"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Typical Roles Offered
                  </label>
                  <Input
                    placeholder="e.g., SDE, Data Analyst, QA"
                    value={typicalRoles}
                    onChange={(e) => setTypicalRoles(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="internship"
                  checked={internshipOffered}
                  onCheckedChange={(checked) => setInternshipOffered(checked as boolean)}
                />
                <label
                  htmlFor="internship"
                  className="text-sm text-foreground cursor-pointer"
                >
                  We also offer internship opportunities
                </label>
              </div>
            </div>
          )}

          {/* Step 4: About Company */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  About Your Company
                </h2>
                <p className="text-sm text-muted-foreground">
                  Help colleges and students understand your organization
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Company Description *
                  </label>
                  <Textarea
                    placeholder="Brief description about your company, what you do, your mission and vision..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Employee Count *
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
                      <SelectItem value="1001-5000">1001-5000</SelectItem>
                      <SelectItem value="5001-10000">5001-10000</SelectItem>
                      <SelectItem value="10000+">10000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Certifications/Awards
                  </label>
                  <Input
                    placeholder="e.g., ISO 9001, Great Place to Work"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Work Culture & Environment
                  </label>
                  <Textarea
                    placeholder="Describe your work culture, team environment, work-life balance policies..."
                    rows={3}
                    value={workCulture}
                    onChange={(e) => setWorkCulture(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Employee Benefits
                  </label>
                  <Textarea
                    placeholder="e.g., Health insurance, flexible hours, learning opportunities, team outings..."
                    rows={3}
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                  />
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
            {currentStep < 4 ? (
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
                {isLoading ? "Completing..." : "Complete Registration"}
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