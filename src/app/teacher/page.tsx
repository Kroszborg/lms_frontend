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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Users,
  FileText,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  MessageSquare,
  Calendar,
  Upload,
  Award,
} from "lucide-react";

export default function TeacherDashboard() {
  const { isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  if (!isAuthenticated || !hasRole("teacher")) {
    router.push("/login");
    return null;
  }

  // Dummy data for teacher dashboard
  const teacherStats = [
    {
      label: "My Courses",
      value: "6",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Students",
      value: "142",
      change: "+15 this week",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Grades",
      value: "23",
      change: "Due this week",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Avg. Performance",
      value: "87%",
      change: "+5% this month",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const myCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      students: 45,
      progress: 78,
      status: "active",
      lastUpdated: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Advanced React & TypeScript",
      students: 32,
      progress: 65,
      status: "active",
      lastUpdated: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      students: 28,
      progress: 92,
      status: "active",
      lastUpdated: "3 days ago",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      student: "Alice Johnson",
      course: "Web Development",
      assignment: "Final Project",
      submittedAt: "2 hours ago",
      status: "pending",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      student: "Bob Smith",
      course: "Advanced React",
      assignment: "Component Library",
      submittedAt: "4 hours ago",
      status: "graded",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      student: "Carol Davis",
      course: "UI/UX Design",
      assignment: "Portfolio Design",
      submittedAt: "1 day ago",
      status: "pending",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const quickActions = [
    {
      title: "Create Course",
      description: "Set up a new course",
      icon: Plus,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Upload Content",
      description: "Add videos, documents, or files",
      icon: Upload,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Create Assignment",
      description: "Set up new assignments or quizzes",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Grade Submissions",
      description: "Review and grade student work",
      icon: CheckCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Web Dev Quiz Due",
      course: "Web Development",
      date: "Tomorrow, 11:59 PM",
      type: "quiz",
    },
    {
      id: 2,
      title: "React Project Review",
      course: "Advanced React",
      date: "Dec 15, 2:00 PM",
      type: "meeting",
    },
    {
      id: 3,
      title: "UI Design Assignment",
      course: "UI/UX Design",
      date: "Dec 18, 11:59 PM",
      type: "assignment",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Teacher Studio
            </h1>
            <p className="text-muted-foreground">
              Manage your courses and track student progress
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teacherStats.map((stat, index) => (
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
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className={`p-2 rounded-full ${action.bgColor}`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <div>
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={submission.avatar}
                          alt={submission.student}
                        />
                        <AvatarFallback>
                          {submission.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {submission.student}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {submission.assignment} - {submission.course}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {submission.submittedAt}
                        </div>
                      </div>
                      <Badge
                        variant={
                          submission.status === "graded"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-3 p-3 rounded-lg border"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          event.type === "quiz"
                            ? "bg-orange-100"
                            : event.type === "meeting"
                            ? "bg-blue-100"
                            : "bg-green-100"
                        }`}
                      >
                        {event.type === "quiz" ? (
                          <FileText className="h-4 w-4 text-orange-600" />
                        ) : event.type === "meeting" ? (
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.course}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => (
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
                      {course.status}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {course.title}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-medium">{course.students}</span>
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
                        <span className="text-muted-foreground">Updated:</span>
                        <span>{course.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  Track and manage your students across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={submission.avatar}
                                alt={submission.student}
                              />
                              <AvatarFallback>
                                {submission.student
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {submission.student}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {submission.assignment}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{submission.course}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={75} className="w-16 h-2" />
                            <span className="text-sm">75%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">A-</Badge>
                        </TableCell>
                        <TableCell>{submission.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
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

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Management</CardTitle>
                <CardDescription>
                  Create and manage assignments, quizzes, and assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Final Project",
                      type: "Project",
                      due: "Dec 20",
                      submissions: 12,
                      total: 15,
                    },
                    {
                      title: "React Quiz",
                      type: "Quiz",
                      due: "Dec 15",
                      submissions: 8,
                      total: 10,
                    },
                    {
                      title: "UI Design Assignment",
                      type: "Assignment",
                      due: "Dec 18",
                      submissions: 5,
                      total: 8,
                    },
                  ].map((assignment, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{assignment.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Due: {assignment.due}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-3">
                          {assignment.title}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Submissions:</span>
                            <span>
                              {assignment.submissions}/{assignment.total}
                            </span>
                          </div>
                          <Progress
                            value={
                              (assignment.submissions / assignment.total) * 100
                            }
                            className="h-2"
                          />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
