import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, BookOpen, Award, Code, FileText, Upload, Edit } from "lucide-react";

const profileData = {
  fullName: "Rahul Sharma", email: "rahul.sharma@mit.edu", phone: "+91 98765 43210", altEmail: "rahul.alt@gmail.com",
  registerNumber: "2021CS001", collegeName: "Mumbai Institute of Technology", degree: "B.Tech", branch: "Computer Science (CSE)",
  yearOfPassing: "2025", cgpa: "8.5", semWiseCGPA: "Sem1: 8.0, Sem2: 8.5, Sem3: 8.2, Sem4: 8.8, Sem5: 8.6",
  skills: ["Python", "JavaScript", "React", "Node.js", "Machine Learning", "SQL"], resumeUploaded: true
};

const StudentProfilePage = () => {
  return (
    <StudentDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between"><div><h1 className="text-3xl font-serif font-bold">My Profile</h1><p className="text-muted-foreground">Manage your personal and academic information</p></div><Button><Edit className="w-4 h-4 mr-2" />Edit Profile</Button></div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif flex items-center gap-2"><User className="w-5 h-5 text-primary" />Personal Details</CardTitle></CardHeader><CardContent className="grid md:grid-cols-2 gap-6"><div><Label className="text-muted-foreground">Full Name</Label><p className="font-semibold">{profileData.fullName}</p></div><div><Label className="text-muted-foreground">College Email</Label><p className="font-semibold flex items-center gap-2"><Mail className="w-4 h-4 text-primary" />{profileData.email}</p></div><div><Label className="text-muted-foreground">Phone Number</Label><p className="font-semibold flex items-center gap-2"><Phone className="w-4 h-4 text-primary" />{profileData.phone}</p></div><div><Label className="text-muted-foreground">Alternate Email</Label><p className="font-semibold">{profileData.altEmail}</p></div></CardContent></Card>

            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Academic Information</CardTitle></CardHeader><CardContent className="grid md:grid-cols-2 gap-6"><div><Label className="text-muted-foreground">Register Number</Label><p className="font-semibold">{profileData.registerNumber}</p></div><div><Label className="text-muted-foreground">College Name</Label><p className="font-semibold">{profileData.collegeName}</p></div><div><Label className="text-muted-foreground">Degree</Label><p className="font-semibold">{profileData.degree}</p></div><div><Label className="text-muted-foreground">Branch</Label><p className="font-semibold">{profileData.branch}</p></div><div><Label className="text-muted-foreground">Year of Passing</Label><p className="font-semibold">{profileData.yearOfPassing}</p></div><div><Label className="text-muted-foreground">CGPA</Label><p className="font-semibold text-primary text-xl">{profileData.cgpa}</p></div></CardContent></Card>

            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif flex items-center gap-2"><Code className="w-5 h-5 text-primary" />Skills</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{profileData.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div></CardContent></Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50"><CardContent className="p-6 text-center"><div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-serif font-bold text-3xl">RS</div><h3 className="font-serif font-bold text-xl">{profileData.fullName}</h3><p className="text-sm text-muted-foreground">{profileData.branch}</p><p className="text-xs text-muted-foreground">{profileData.collegeName}</p></CardContent></Card>
            <Card className="border-secondary/30 bg-secondary/5"><CardContent className="p-6 text-center"><Award className="w-8 h-8 text-secondary mx-auto mb-2" /><p className="text-4xl font-bold font-serif text-secondary">{profileData.cgpa}</p><p className="text-sm text-muted-foreground">Current CGPA</p></CardContent></Card>
            <Card className="border-border/50 bg-card/50"><CardContent className="p-6"><div className="flex items-center gap-3 mb-4"><FileText className="w-8 h-8 text-primary" /><div><p className="font-semibold">Resume</p><p className="text-sm text-secondary">Uploaded</p></div></div><Button variant="outline" className="w-full"><Upload className="w-4 h-4 mr-2" />Update Resume</Button></CardContent></Card>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentProfilePage;
