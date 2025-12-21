import { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Briefcase, Users, GraduationCap, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import CompanySidebar from "@/components/CompanySidebar";

const branches = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Information Technology",
  "Chemical",
];

const existingCriteria = [
  {
    id: 1,
    role: "Software Development Engineer",
    branches: ["Computer Science", "Information Technology"],
    cgpa: 7.5,
    batch: 2025,
    package: "12-18",
    openings: 15,
  },
  {
    id: 2,
    role: "Data Analyst",
    branches: ["Computer Science", "Electronics", "Electrical"],
    cgpa: 7.0,
    batch: 2025,
    package: "8-12",
    openings: 8,
  },
  {
    id: 3,
    role: "DevOps Engineer",
    branches: ["Computer Science", "Information Technology"],
    cgpa: 7.0,
    batch: 2025,
    package: "10-15",
    openings: 5,
  },
];

const CompanyJobCriteria = () => {
  const [showForm, setShowForm] = useState(false);
  const [criteria, setCriteria] = useState(existingCriteria);
  const { toast } = useToast();

  // Form state
  const [roleName, setRoleName] = useState("");
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [minCgpa, setMinCgpa] = useState("");
  const [batch, setBatch] = useState("");
  const [packageLpa, setPackageLpa] = useState("");
  const [openings, setOpenings] = useState("");

  const handleBranchToggle = (branch: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  const handleSubmit = () => {
    if (!roleName || selectedBranches.length === 0 || !minCgpa || !batch || !packageLpa || !openings) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newCriteria = {
      id: criteria.length + 1,
      role: roleName,
      branches: selectedBranches,
      cgpa: parseFloat(minCgpa),
      batch: parseInt(batch),
      package: packageLpa,
      openings: parseInt(openings),
    };

    setCriteria([...criteria, newCriteria]);
    setShowForm(false);
    resetForm();
    toast({
      title: "Job Posted!",
      description: "Your job criteria has been published",
    });
  };

  const resetForm = () => {
    setRoleName("");
    setSelectedBranches([]);
    setMinCgpa("");
    setBatch("");
    setPackageLpa("");
    setOpenings("");
  };

  const handleDelete = (id: number) => {
    setCriteria(criteria.filter((c) => c.id !== id));
    toast({
      title: "Deleted",
      description: "Job criteria removed successfully",
    });
  };

  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Job Criteria
            </h1>
            <p className="text-muted-foreground">
              Define requirements for your open positions
            </p>
          </div>
          <Button
            variant="forest"
            className="gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add New Role
              </>
            )}
          </Button>
        </div>

        {/* Add New Role Form */}
        {showForm && (
          <Card className="animate-fade-in border-forest-light/30">
            <CardHeader>
              <CardTitle className="font-display">New Job Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Role Name *
                  </label>
                  <Input
                    placeholder="e.g., Software Development Engineer"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Number of Openings *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 10"
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Eligible Branches *
                </label>
                <div className="flex flex-wrap gap-3">
                  {branches.map((branch) => (
                    <div
                      key={branch}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={branch}
                        checked={selectedBranches.includes(branch)}
                        onCheckedChange={() => handleBranchToggle(branch)}
                      />
                      <label
                        htmlFor={branch}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {branch}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Minimum CGPA *
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 7.5"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Year of Passing *
                  </label>
                  <Select value={batch} onValueChange={setBatch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Package (LPA) *
                  </label>
                  <Input
                    placeholder="e.g., 12-18"
                    value={packageLpa}
                    onChange={(e) => setPackageLpa(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <Button variant="outline" onClick={() => { setShowForm(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button variant="forest" onClick={handleSubmit}>
                  Save & Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Criteria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {criteria.map((job, index) => (
            <Card
              key={job.id}
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-light/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-forest-medium" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{job.openings} openings</span>
                        <span>•</span>
                        <span>Batch {job.batch}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(job.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {job.branches.map((branch) => (
                      <Badge key={branch} variant="secondary" className="bg-muted">
                        {branch}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>Min CGPA: {job.cgpa}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-forest-medium" />
                      <span className="font-medium text-forest-medium">{job.package} LPA</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {criteria.length === 0 && (
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display text-lg font-medium text-foreground mb-2">
                No Job Criteria Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first job posting criteria
              </p>
              <Button variant="forest" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Role
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CompanySidebar>
  );
};

export default CompanyJobCriteria;
