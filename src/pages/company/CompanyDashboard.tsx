import { Building2, Users, Briefcase, Bell, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanySidebar from "@/components/CompanySidebar";

const stats = [
  {
    title: "Partner Colleges",
    value: "24",
    change: "+3 this month",
    trend: "up",
    icon: Building2,
  },
  {
    title: "Active Job Posts",
    value: "8",
    change: "2 expiring soon",
    trend: "neutral",
    icon: Briefcase,
  },
  {
    title: "Eligible Candidates",
    value: "1,234",
    change: "+156 new profiles",
    trend: "up",
    icon: Users,
  },
  {
    title: "Notifications",
    value: "12",
    change: "5 unread",
    trend: "neutral",
    icon: Bell,
  },
];

const recentActivity = [
  {
    type: "success",
    message: "New partnership with IIT Delhi approved",
    time: "2 hours ago",
    icon: CheckCircle,
  },
  {
    type: "info",
    message: "45 new candidates match your SDE role",
    time: "5 hours ago",
    icon: Users,
  },
  {
    type: "warning",
    message: "Job posting for Data Analyst expires in 3 days",
    time: "1 day ago",
    icon: AlertCircle,
  },
  {
    type: "success",
    message: "NIT Trichy accepted your partnership request",
    time: "2 days ago",
    icon: CheckCircle,
  },
  {
    type: "info",
    message: "Interview scheduled with 5 candidates",
    time: "3 days ago",
    icon: Clock,
  },
];

const CompanyDashboard = () => {
  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, TechCorp!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your recruitment today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="font-display text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-forest-medium" />
                      )}
                      {stat.trend === "down" && (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span
                        className={`text-xs ${
                          stat.trend === "up"
                            ? "text-forest-medium"
                            : stat.trend === "down"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-forest-medium" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recruitment Analytics Placeholder */}
          <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="font-display">Recruitment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Analytics Dashboard</p>
                  <p className="text-sm">Charts and insights coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="font-display">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "success"
                          ? "bg-forest-light/20 text-forest-medium"
                          : activity.type === "warning"
                          ? "bg-gold/20 text-gold"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group">
                <Briefcase className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Post New Job</span>
              </button>
              <button className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group">
                <Building2 className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Find Colleges</span>
              </button>
              <button className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group">
                <Users className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">View Candidates</span>
              </button>
              <button className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group">
                <Bell className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Notifications</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanySidebar>
  );
};

export default CompanyDashboard;
