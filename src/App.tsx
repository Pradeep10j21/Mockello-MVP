import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// College Module
import CollegeLogin from "./pages/college/CollegeLogin";
import CollegeOnboarding from "./pages/college/CollegeOnboarding";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import CollegeProfile from "./pages/college/CollegeProfile";
import CollegeCompanies from "./pages/college/CollegeCompanies";
import CompanyDetail from "./pages/college/CompanyDetail";

// Admin Module
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Placeholder Modules
import CompanyLogin from "./pages/company/CompanyLogin";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />

          {/* College Routes */}
          <Route path="/college/login" element={<CollegeLogin />} />
          <Route path="/college/onboarding" element={<CollegeOnboarding />} />
          <Route path="/college/dashboard" element={<CollegeDashboard />} />
          <Route path="/college/profile" element={<CollegeProfile />} />
          <Route path="/college/companies" element={<CollegeCompanies />} />
          <Route path="/college/company/:id" element={<CompanyDetail />} />
          <Route path="/college/eligibility" element={<CollegeDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/colleges" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminDashboard />} />

          {/* Company Placeholder Routes */}
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />

          {/* Student Placeholder Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
