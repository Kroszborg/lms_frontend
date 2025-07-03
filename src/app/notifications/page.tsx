"use client";
import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Mail,
  Users,
  BookOpen,
  FileText,
  Clock,
  Star,
  Trash2,
  Settings,
  Filter,
  MoreHorizontal,
  Eye,
  EyeOff,
  Archive,
  Star as StarIcon,
} from "lucide-react";

export default function Notifications() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [showRead, setShowRead] = useState(true);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      title: "New student enrolled in Web Development",
      message:
        "Alice Johnson has joined your Web Development course. Welcome them to the class!",
      type: "enrollment",
      priority: "medium",
      read: false,
      time: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      course: "Web Development",
      action: "View Profile",
    },
    {
      id: 2,
      title: "Assignment submitted for review",
      message:
        "Bob Smith has submitted the final project for Data Science. It's ready for grading.",
      type: "submission",
      priority: "high",
      read: false,
      time: "4 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      course: "Data Science",
      action: "Grade Assignment",
    },
    {
      id: 3,
      title: "Course content updated",
      message:
        "New lecture materials have been added to Digital Marketing Fundamentals.",
      type: "update",
      priority: "low",
      read: true,
      time: "1 day ago",
      avatar: null,
      course: "Digital Marketing",
      action: "View Content",
    },
    {
      id: 4,
      title: "Grades posted for Machine Learning",
      message:
        "Midterm exam grades are now available for all students in Machine Learning.",
      type: "grade",
      priority: "high",
      read: false,
      time: "2 days ago",
      avatar: null,
      course: "Machine Learning",
      action: "View Grades",
    },
    {
      id: 5,
      title: "Discussion forum activity",
      message: "There are 5 new posts in the Web Development discussion forum.",
      type: "discussion",
      priority: "medium",
      read: true,
      time: "3 days ago",
      avatar: null,
      course: "Web Development",
      action: "Join Discussion",
    },
    {
      id: 6,
      title: "System maintenance scheduled",
      message:
        "Scheduled maintenance will occur on Sunday from 2-4 AM. Some features may be temporarily unavailable.",
      type: "system",
      priority: "low",
      read: true,
      time: "1 week ago",
      avatar: null,
      course: null,
      action: "Learn More",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "enrollment":
        return <Users className="h-4 w-4" />;
      case "submission":
        return <FileText className="h-4 w-4" />;
      case "update":
        return <BookOpen className="h-4 w-4" />;
      case "grade":
        return <Star className="h-4 w-4" />;
      case "discussion":
        return <Mail className="h-4 w-4" />;
      case "system":
        return <Info className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "enrollment":
        return "bg-blue-100 text-blue-600";
      case "submission":
        return "bg-purple-100 text-purple-600";
      case "update":
        return "bg-green-100 text-green-600";
      case "grade":
        return "bg-orange-100 text-orange-600";
      case "discussion":
        return "bg-indigo-100 text-indigo-600";
      case "system":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (filter !== "all" && notification.type !== filter) return false;
    if (!showRead && notification.read) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high" && !n.read
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with all your important alerts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {notifications.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Notifications
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {unreadCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Unread</div>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {highPriorityCount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    High Priority
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">6</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="enrollment">Enrollments</SelectItem>
                  <SelectItem value="submission">Submissions</SelectItem>
                  <SelectItem value="update">Updates</SelectItem>
                  <SelectItem value="grade">Grades</SelectItem>
                  <SelectItem value="discussion">Discussions</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Switch checked={showRead} onCheckedChange={setShowRead} />
                <span className="text-sm">Show read notifications</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All ({filteredNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="high">
              High Priority ({highPriorityCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-lg transition-all duration-300 ${
                  !notification.read ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${getTypeColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3
                            className={`font-medium ${
                              !notification.read
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={getPriorityColor(notification.priority)}
                          >
                            {notification.priority}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{notification.time}</span>
                          </div>
                          {notification.course && (
                            <div className="flex items-center space-x-1">
                              <BookOpen className="h-3 w-3" />
                              <span>{notification.course}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            {notification.action}
                          </Button>
                          <Button variant="ghost" size="sm">
                            {notification.read ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {filteredNotifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card
                  key={notification.id}
                  className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-2 rounded-lg ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-foreground">
                              {notification.title}
                            </h3>
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={getPriorityColor(
                                notification.priority
                              )}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{notification.time}</span>
                            </div>
                            {notification.course && (
                              <div className="flex items-center space-x-1">
                                <BookOpen className="h-3 w-3" />
                                <span>{notification.course}</span>
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="high" className="space-y-4">
            {filteredNotifications
              .filter((n) => n.priority === "high")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-red-100 text-red-600">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-foreground">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                          </div>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{notification.time}</span>
                            </div>
                            {notification.course && (
                              <div className="flex items-center space-x-1">
                                <BookOpen className="h-3 w-3" />
                                <span>{notification.course}</span>
                              </div>
                            )}
                          </div>
                          <Button variant="destructive" size="sm">
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
