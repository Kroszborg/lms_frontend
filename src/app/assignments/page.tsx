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
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Eye,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

export default function Assignments() {
  const { isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  if (!isAuthenticated || !hasRole("student")) {
    router.push("/login");
    return null;
  }

  // Dummy assignments data
  const assignments = [
    {
      id: 1,
      title: "Final Project Submission",
      course: "Web Development Fundamentals",
      type: "Project",
      dueDate: "Dec 20, 2024",
      status: "pending",
      priority: "high",
      description: "Create a complete web application using React and Node.js",
      points: 100,
      submittedAt: null,
      grade: null,
    },
    {
      id: 2,
      title: "Data Analysis Quiz",
      course: "Data Science Basics",
      type: "Quiz",
      dueDate: "Dec 18, 2024",
      status: "pending",
      priority: "medium",
      description: "Multiple choice quiz on data analysis concepts",
      points: 50,
      submittedAt: null,
      grade: null,
    },
    {
      id: 3,
      title: "Marketing Campaign Report",
      course: "Digital Marketing",
      type: "Assignment",
      dueDate: "Dec 22, 2024",
      status: "in-progress",
      priority: "low",
      description: "Write a comprehensive report on a marketing campaign",
      points: 75,
      submittedAt: null,
      grade: null,
    },
    {
      id: 4,
      title: "CSS Grid Assignment",
      course: "Web Development Fundamentals",
      type: "Assignment",
      dueDate: "Dec 15, 2024",
      status: "completed",
      priority: "medium",
      description: "Create a responsive layout using CSS Grid",
      points: 30,
      submittedAt: "Dec 14, 2024",
      grade: "A",
    },
    {
      id: 5,
      title: "JavaScript Basics Quiz",
      course: "Web Development Fundamentals",
      type: "Quiz",
      dueDate: "Dec 12, 2024",
      status: "completed",
      priority: "medium",
      description: "Quiz on JavaScript fundamentals",
      points: 40,
      submittedAt: "Dec 11, 2024",
      grade: "A-",
    },
  ];

  const pendingAssignments = assignments.filter((a) => a.status === "pending");
  const inProgressAssignments = assignments.filter(
    (a) => a.status === "in-progress"
  );
  const completedAssignments = assignments.filter(
    (a) => a.status === "completed"
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground">
              Track and submit your assignments
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {pendingAssignments.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {inProgressAssignments.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    In Progress
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {completedAssignments.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">A-</div>
                  <div className="text-sm text-muted-foreground">
                    Average Grade
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>
                  View all your assignments across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {assignment.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {assignment.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{assignment.course}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{assignment.dueDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {assignment.grade ? (
                            <Badge variant="default">{assignment.grade}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {assignment.status !== "completed" && (
                              <Button variant="ghost" size="sm">
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
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

          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(assignment.priority)}>
                        {assignment.priority} Priority
                      </Badge>
                      <Badge variant="outline">{assignment.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">
                      {assignment.title}
                    </CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span className="font-medium">
                          {assignment.dueDate}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Points:</span>
                        <span className="font-medium">{assignment.points}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(assignment.priority)}>
                        {assignment.priority} Priority
                      </Badge>
                      <Badge variant="outline">{assignment.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">
                      {assignment.title}
                    </CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span className="font-medium">
                          {assignment.dueDate}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Points:</span>
                        <span className="font-medium">{assignment.points}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-600"
                      >
                        Completed
                      </Badge>
                      <Badge variant="outline">{assignment.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">
                      {assignment.title}
                    </CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Submitted:
                        </span>
                        <span className="font-medium">
                          {assignment.submittedAt}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grade:</span>
                        <Badge variant="default">{assignment.grade}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Points:</span>
                        <span className="font-medium">{assignment.points}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
