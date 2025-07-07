import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  FileText,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Plus,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";

export default function Home() {
  // Dummy data for the LMS
  const recentCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      students: 124,
      duration: "8 weeks",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Advanced Data Science",
      instructor: "Prof. Michael Chen",
      progress: 45,
      students: 89,
      duration: "12 weeks",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      instructor: "Ms. Emily Rodriguez",
      progress: 90,
      students: 156,
      duration: "6 weeks",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Web Development Final Project",
      course: "Web Development",
      dueDate: "Dec 15, 2024",
      status: "pending",
    },
    {
      id: 2,
      title: "Data Analysis Report",
      course: "Data Science",
      dueDate: "Dec 12, 2024",
      status: "pending",
    },
    {
      id: 3,
      title: "Marketing Campaign Proposal",
      course: "Digital Marketing",
      dueDate: "Dec 10, 2024",
      status: "completed",
    },
  ];

  const stats = [
    { label: "Active Courses", value: "12", icon: BookOpen, change: "+2" },
    { label: "Total Students", value: "1,247", icon: Users, change: "+15" },
    { label: "Completion Rate", value: "87%", icon: Award, change: "+3%" },
    { label: "Avg. Grade", value: "B+", icon: TrendingUp, change: "+0.2" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-background to-muted/40 dark:from-background dark:to-muted/10 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo with Soft Shadow */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div
                  className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center shadow-xl dark:shadow-2xl"
                  style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.08)" }}
                >
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>  
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground">
              Welcome to <span className="text-primary">EduLMS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Transform your learning experience with our cutting-edge platform.
              <span className="text-primary font-semibold">
                {" "}
                Empower educators
              </span>
              ,
              <span className="text-primary font-semibold">
                {" "}
                inspire students
              </span>
              , and achieve excellence together.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border text-foreground/90">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">AI-Powered Learning</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border text-foreground/90">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Personalized Paths</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border text-foreground/90">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Collaborative Tools</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-md"
                asChild
              >
                <a href="/login">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Today
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="#features">
                  <Plus className="mr-2 h-5 w-5" />
                  Explore Features
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-background px-3 py-2 rounded-lg border border-border">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Trusted by 10,000+ educators</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-3 py-2 rounded-lg border border-border">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-3 py-2 rounded-lg border border-border">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>24/7 support available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose EduLMS?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of education with our comprehensive suite of
              tools designed for modern learning environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Collaborative Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with classmates and instructors, join discussions, and
                work on group projects with real-time collaboration tools.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Track Your Progress
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Visualize your learning journey with detailed progress tracking,
                assignment deadlines, and performance analytics.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organized & Timely</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay on top of your schedule with intelligent calendar
                integration and automated reminders for all your learning
                activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
            <p className="text-muted-foreground">
              Join thousands of educators and students already using EduLMS
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    {stat.change} this month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Courses */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  Featured Courses
                </h2>
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/10"
                >
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-background/80 dark:bg-background/60 backdrop-blur-sm"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-background/90 dark:bg-background/80 backdrop-blur-sm"
                        >
                          {course.duration}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-background/80 dark:bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Add Students
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    New Course
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Assignments */}
              <Card className="border-0 shadow-lg bg-background/80 dark:bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className={`mt-1 h-2 w-2 rounded-full ${
                            assignment.status === "completed"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {assignment.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {assignment.course}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {assignment.dueDate}
                          </p>
                        </div>
                        {assignment.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-background/80 dark:bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New student enrolled
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Assignment submitted
                        </p>
                        <p className="text-xs text-muted-foreground">
                          4 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Course updated</p>
                        <p className="text-xs text-muted-foreground">
                          1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
