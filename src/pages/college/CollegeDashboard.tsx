import { useNavigate } from "react-router-dom";
import CollegeSidebar from "@/components/CollegeSidebar";
import { Building2, Briefcase, Target, Bell, TrendingUp, Users, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollegeDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    {
      title: "Companies Onboarded",
      value: "48",
      change: "+12%",
      icon: Building2,
      color: "bg-forest-medium",
    },
    {
      title: "Active Opportunities",
      value: "23",
      change: "+8%",
      icon: Briefcase,
      color: "bg-sage",
    },
    {
      title: "Eligible Companies",
      value: "15",
      change: "+5%",
      icon: Target,
      color: "bg-accent",
    },
    {
      title: "Pending Notifications",
      value: "7",
      change: "New",
      icon: Bell,
      color: "bg-earth",
    },
  ];

  const recentActivities = [
    {
      company: "TechCorp Solutions",
      action: "Posted new opportunity",
      role: "Software Engineer",
      time: "2 hours ago",
    },
    {
      company: "DataFlow Inc",
      action: "Updated eligibility criteria",
      role: "Data Analyst",
      time: "5 hours ago",
    },
    {
      company: "CloudNine Systems",
      action: "Scheduled campus visit",
      role: "DevOps Engineer",
      time: "1 day ago",
    },
    {
      company: "AI Dynamics",
      action: "Requested student list",
      role: "ML Engineer",
      time: "2 days ago",
    },
  ];

  const upcomingDrives = [
    { company: "TechCorp Solutions", date: "Dec 15, 2024", roles: 3, students: 120 },
    { company: "DataFlow Inc", date: "Dec 18, 2024", roles: 2, students: 85 },
    { company: "CloudNine Systems", date: "Dec 22, 2024", roles: 4, students: 200 },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollegeSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your placements today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-forest flex items-start justify-between animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                <p className="font-display text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-sage font-medium">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="card-forest">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Recent Activities
              </h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight size={14} />
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                    <Building2 size={18} className="text-forest-medium" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {activity.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} • {activity.role}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Drives */}
          <div className="card-forest">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Upcoming Placement Drives
              </h2>
              <Button variant="ghost" size="sm">
                Schedule
                <Calendar size={14} />
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingDrives.map((drive, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-sage transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{drive.company}</h3>
                    <span className="text-sm text-sage font-medium">{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {drive.roles} roles
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {drive.students} eligible
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeDashboard;
