"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  FileText,
  Calendar,
  Award,
  Video,
  Download,
  TrendingUp,
  Bookmark,
  Eye,
} from "lucide-react";

export default function StudentDashboard() {
  const { isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  if (!isAuthenticated || !hasRole("student")) {
    router.push("/login");
    return null;
  }

  // Dummy data for student dashboard
  const studentStats = [
    {
      label: "Enrolled Courses",
      value: "4",
      change: "2 active",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Overall Progress",
      value: "78%",
      change: "+5% this week",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Tasks",
      value: "3",
      change: "Due this week",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Average Grade",
      value: "A-",
      change: "Excellent",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "John Smith",
      progress: 85,
      grade: "A-",
      nextLesson: "React Components",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      lastAccessed: "2 hours ago",
    },
    {
      id: 2,
      title: "Data Science Basics",
      instructor: "Sarah Johnson",
      progress: 62,
      grade: "B+",
      nextLesson: "Data Visualization",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      lastAccessed: "1 day ago",
    },
    {
      id: 3,
      title: "Digital Marketing",
      instructor: "Mike Davis",
      progress: 45,
      grade: "B",
      nextLesson: "Social Media Strategy",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      lastAccessed: "3 days ago",
    },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Final Project Submission",
      course: "Web Development",
      dueDate: "Dec 20, 2024",
      type: "Project",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Data Analysis Quiz",
      course: "Data Science",
      dueDate: "Dec 18, 2024",
      type: "Quiz",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      title: "Marketing Campaign Report",
      course: "Digital Marketing",
      dueDate: "Dec 22, 2024",
      type: "Assignment",
      status: "in-progress",
      priority: "low",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "video",
      title: "Watched: React Hooks Tutorial",
      course: "Web Development",
      time: "2 hours ago",
      duration: "45 min",
    },
    {
      id: 2,
      type: "assignment",
      title: "Submitted: CSS Grid Assignment",
      course: "Web Development",
      time: "1 day ago",
      grade: "A",
    },
    {
      id: 3,
      type: "quiz",
      title: "Completed: JavaScript Basics Quiz",
      course: "Web Development",
      time: "2 days ago",
      score: "92%",
    },
  ];

  const learningPath = [
    {
      week: 1,
      title: "HTML & CSS Fundamentals",
      status: "completed",
      grade: "A",
    },
    {
      week: 2,
      title: "JavaScript Basics",
      status: "completed",
      grade: "A-",
    },
    {
      week: 3,
      title: "React Introduction",
      status: "in-progress",
      grade: null,
    },
    {
      week: 4,
      title: "Advanced React Concepts",
      status: "upcoming",
      grade: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Student Portal
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Continue your learning journey
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Courses
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {studentStats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300"
            >
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
                      {stat.change}
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Continue Learning */}
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrolledCourses.slice(0, 2).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {course.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Next: {course.nextLesson}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress
                            value={course.progress}
                            className="w-16 h-1"
                          />
                          <span className="text-xs">{course.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          assignment.priority === "high"
                            ? "bg-red-100"
                            : assignment.priority === "medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                        }`}
                      >
                        <FileText
                          className={`h-4 w-4 ${
                            assignment.priority === "high"
                              ? "text-red-600"
                              : assignment.priority === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {assignment.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {assignment.course} • Due: {assignment.dueDate}
                        </div>
                      </div>
                      <Badge
                        variant={
                          assignment.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg border"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "video"
                            ? "bg-blue-100"
                            : activity.type === "assignment"
                            ? "bg-green-100"
                            : "bg-purple-100"
                        }`}
                      >
                        {activity.type === "video" ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : activity.type === "assignment" ? (
                          <FileText className="h-4 w-4 text-green-600" />
                        ) : (
                          <Award className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {activity.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.course} • {activity.time}
                        </div>
                        {activity.grade && (
                          <div className="text-xs text-green-600 mt-1">
                            Grade: {activity.grade}
                          </div>
                        )}
                        {activity.score && (
                          <div className="text-xs text-green-600 mt-1">
                            Score: {activity.score}
                          </div>
                        )}
                        {activity.duration && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Duration: {activity.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2" variant="default">
                      {course.progress}% Complete
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {course.title}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Instructor:
                        </span>
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress:
                          </span>
                          <span className="font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grade:</span>
                        <Badge variant="outline">{course.grade}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Last accessed:
                        </span>
                        <span>{course.lastAccessed}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">
                        <Play className="mr-1 h-3 w-3" />
                        Continue
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>
                  Track your assignments, quizzes, and projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div className="font-medium">{assignment.title}</div>
                        </TableCell>
                        <TableCell>{assignment.course}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {assignment.status === "completed" ? (
                            <Badge variant="outline">A-</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Learning Path */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Path</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {learningPath.map((week, index) => (
                      <div
                        key={week.week}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            week.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : week.status === "in-progress"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {week.status === "completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            week.week
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{week.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {week.status === "completed" &&
                              week.grade &&
                              `Grade: ${week.grade}`}
                            {week.status === "in-progress" && "In Progress"}
                            {week.status === "upcoming" && "Upcoming"}
                          </div>
                        </div>
                        {week.status === "completed" && (
                          <Badge variant="default">{week.grade}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Overall Progress
                      </span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-3" />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          4
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Courses
                        </div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          12
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Assignments
                        </div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          A-
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg Grade
                        </div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          45h
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Study Time
                        </div>
                      </div>
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
