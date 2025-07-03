"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Clock,
  Award,
  TrendingUp,
  FileText,
  CheckCircle,
  Play,
  Star,
  ArrowRight,
  Plus,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

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
      category: "Programming",
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
      category: "Data Science",
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
      category: "Marketing",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Dr. Alex Thompson",
      progress: 30,
      students: 67,
      duration: "10 weeks",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      category: "AI/ML",
    },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Web Development Final Project",
      course: "Web Development",
      dueDate: "Dec 15, 2024",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Data Analysis Report",
      course: "Data Science",
      dueDate: "Dec 12, 2024",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      title: "Marketing Campaign Proposal",
      course: "Digital Marketing",
      dueDate: "Dec 10, 2024",
      status: "completed",
      priority: "low",
    },
    {
      id: 4,
      title: "ML Model Implementation",
      course: "Machine Learning",
      dueDate: "Dec 18, 2024",
      status: "pending",
      priority: "high",
    },
  ];

  const stats = [
    {
      label: "Active Courses",
      value: "12",
      icon: BookOpen,
      change: "+2",
      color: "text-blue-600",
    },
    {
      label: "Total Students",
      value: "1,247",
      icon: Users,
      change: "+15",
      color: "text-green-600",
    },
    {
      label: "Completion Rate",
      value: "87%",
      icon: Award,
      change: "+3%",
      color: "text-purple-600",
    },
    {
      label: "Avg. Grade",
      value: "B+",
      icon: TrendingUp,
      change: "+0.2",
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      message: "New student enrolled in Web Development",
      time: "2 hours ago",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "submission",
      message: "Assignment submitted for Data Science",
      time: "4 hours ago",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      type: "update",
      message: "Course content updated in Digital Marketing",
      time: "1 day ago",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      type: "grade",
      message: "Grades posted for Machine Learning",
      time: "2 days ago",
      icon: Award,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your courses today.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {stat.change} this month
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.color
                      .replace("text-", "bg-")
                      .replace("-600", "-100")}`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Courses */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Recent Courses
                  </h2>
                  <Button variant="ghost" className="text-primary">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentCourses.slice(0, 4).map((course) => (
                    <Card
                      key={course.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant="secondary"
                            className="bg-background/80"
                          >
                            {course.duration}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="outline" className="bg-background/80">
                            {course.category}
                          </Badge>
                        </div>
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
                        <Button className="w-full mt-4" size="sm">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Course
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Add Assignment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Students
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card>
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
                          className="flex items-start space-x-3"
                        >
                          <div
                            className={`mt-1 h-2 w-2 rounded-full ${
                              assignment.status === "completed"
                                ? "bg-green-500"
                                : assignment.priority === "high"
                                ? "bg-red-500"
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
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center space-x-3"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.color}`}
                          >
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {activity.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                All Courses
              </h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-background/80">
                        {course.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{course.students} students</span>
                      <span>{course.progress}% complete</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    <div className="flex space-x-2">
                      <Button className="flex-1" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Assignments
              </h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {assignment.title}
                      </CardTitle>
                      <Badge
                        variant={
                          assignment.priority === "high"
                            ? "destructive"
                            : assignment.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {assignment.priority}
                      </Badge>
                    </div>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Due Date:</span>
                        <span className="font-medium">
                          {assignment.dueDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Status:</span>
                        <Badge
                          variant={
                            assignment.status === "completed"
                              ? "default"
                              : "outline"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1" size="sm">
                          {assignment.status === "completed"
                            ? "View"
                            : "Submit"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Analytics Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {course.title}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={course.progress}
                            className="w-20 h-2"
                          />
                          <span className="text-sm text-muted-foreground">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Students</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Completion</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Grade</span>
                      <span className="font-medium">B+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Satisfaction Rate</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
