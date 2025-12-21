import { Building2, MapPin, Globe, Users, Mail, Phone, Briefcase, Edit, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CompanySidebar from "@/components/CompanySidebar";

const companyData = {
  name: "TechCorp Solutions",
  tagline: "Innovating the Future of Technology",
  industry: "Information Technology",
  location: "Bangalore, India",
  website: "www.techcorp.com",
  employees: "1000+",
  verified: true,
  description:
    "TechCorp Solutions is a leading technology company specializing in software development, cloud solutions, and AI-powered applications. We are committed to fostering innovation and providing cutting-edge solutions to businesses worldwide. Our culture emphasizes growth, learning, and work-life balance.",
  hrContact: {
    name: "Priya Sharma",
    email: "hr@techcorp.com",
    phone: "+91 98765 43210",
  },
};

const CompanyProfile = () => {
  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden animate-fade-in">
          {/* Cover Banner */}
          <div className="h-32 bg-gradient-to-r from-forest-dark via-forest-medium to-forest-light" />
          
          <CardContent className="relative pt-0 pb-6">
            {/* Company Avatar */}
            <div className="absolute -top-12 left-6">
              <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-lg">
                <span className="font-display text-2xl font-bold text-forest-medium">TC</span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end pt-4">
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            {/* Company Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {companyData.name}
                </h1>
                {companyData.verified && (
                  <Badge variant="secondary" className="gap-1 bg-forest-light/20 text-forest-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{companyData.tagline}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span>{companyData.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{companyData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <a href={`https://${companyData.website}`} className="hover:text-foreground transition-colors">
                    {companyData.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{companyData.employees} employees</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About Section */}
          <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-forest-medium" />
                About Company
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {companyData.description}
              </p>
            </CardContent>
          </Card>

          {/* HR Contact Card */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Shield className="w-5 h-5 text-forest-medium" />
                HR Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-forest-light/20 flex items-center justify-center">
                  <span className="font-medium text-forest-medium">
                    {companyData.hrContact.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{companyData.hrContact.name}</p>
                  <p className="text-sm text-muted-foreground">HR Manager</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${companyData.hrContact.email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {companyData.hrContact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${companyData.hrContact.phone}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {companyData.hrContact.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-forest-medium" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Partner Colleges</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-forest-medium" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Active Job Posts</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-forest-medium" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">1,234</p>
              <p className="text-sm text-muted-foreground">Eligible Candidates</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CompanySidebar>
  );
};

export default CompanyProfile;
