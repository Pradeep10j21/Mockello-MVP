import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Building, MapPin, User, BookOpen, Users, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const CollegeOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    collegeName: "",
    university: "",
    location: "",
    address: "",
    officerName: "",
    officerEmail: "",
    officerPhone: "",
    courses: "",
    totalStudents: "",
    placementHistory: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Onboarding completed successfully!");
    navigate("/college/dashboard");
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = [
    { number: 1, title: "College Info" },
    { number: 2, title: "Officer Details" },
    { number: 3, title: "Academics" },
  ];

  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center shadow-medium">
            <Leaf className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground">
            Let's set up your college account in a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step > s.number
                    ? "bg-sage text-forest-deep"
                    : step === s.number
                    ? "bg-primary text-primary-foreground shadow-medium"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.number ? <Check size={18} /> : s.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step > s.number ? "bg-sage" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card-forest">
          <form onSubmit={handleSubmit}>
            {/* Step 1: College Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-up">
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="collegeName"
                      placeholder="Enter college name"
                      className="pl-10 input-forest"
                      value={formData.collegeName}
                      onChange={(e) =>
                        setFormData({ ...formData, collegeName: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">Affiliated University</Label>
                  <Input
                    id="university"
                    placeholder="e.g., Mumbai University"
                    className="input-forest"
                    value={formData.university}
                    onChange={(e) =>
                      setFormData({ ...formData, university: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">City / Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="e.g., Mumbai, Maharashtra"
                      className="pl-10 input-forest"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Complete college address"
                    className="input-forest min-h-[80px]"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 2: Placement Officer Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-up">
                <div className="space-y-2">
                  <Label htmlFor="officerName">Placement Officer Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="officerName"
                      placeholder="Full name"
                      className="pl-10 input-forest"
                      value={formData.officerName}
                      onChange={(e) =>
                        setFormData({ ...formData, officerName: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officerEmail">Officer Email</Label>
                  <Input
                    id="officerEmail"
                    type="email"
                    placeholder="officer@college.edu"
                    className="input-forest"
                    value={formData.officerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, officerEmail: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officerPhone">Contact Number</Label>
                  <Input
                    id="officerPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="input-forest"
                    value={formData.officerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, officerPhone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Academic Details */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-up">
                <div className="space-y-2">
                  <Label htmlFor="courses">Courses Offered</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      id="courses"
                      placeholder="e.g., B.Tech CSE, B.Tech ECE, MBA, BBA..."
                      className="pl-10 input-forest min-h-[100px]"
                      value={formData.courses}
                      onChange={(e) =>
                        setFormData({ ...formData, courses: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalStudents">Total Students (Placement Eligible)</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="totalStudents"
                      type="number"
                      placeholder="e.g., 500"
                      className="pl-10 input-forest"
                      value={formData.totalStudents}
                      onChange={(e) =>
                        setFormData({ ...formData, totalStudents: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placementHistory">Previous Placement Record (Optional)</Label>
                  <Textarea
                    id="placementHistory"
                    placeholder="Briefly describe your college's placement history..."
                    className="input-forest min-h-[80px]"
                    value={formData.placementHistory}
                    onChange={(e) =>
                      setFormData({ ...formData, placementHistory: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button type="button" variant="forest" onClick={nextStep}>
                  Next
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button type="submit" variant="forest">
                  Complete Onboarding
                  <Check size={16} />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeOnboarding;
