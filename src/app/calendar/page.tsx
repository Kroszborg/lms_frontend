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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  BookOpen,
  FileText,
  Users,
  Bell,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Calendar() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [view, setView] = useState<"month" | "week" | "day">("month");

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy events data
  const events = [
    {
      id: 1,
      title: "Web Development Final Project Due",
      type: "assignment",
      course: "Web Development",
      date: new Date(2024, 11, 15),
      time: "11:59 PM",
      description: "Submit the final project for the web development course",
      priority: "high",
      status: "pending",
    },
    {
      id: 2,
      title: "Data Science Midterm Exam",
      type: "exam",
      course: "Data Science",
      date: new Date(2024, 11, 12),
      time: "2:00 PM",
      description: "Midterm examination covering chapters 1-5",
      priority: "high",
      status: "pending",
    },
    {
      id: 3,
      title: "Marketing Campaign Presentation",
      type: "presentation",
      course: "Digital Marketing",
      date: new Date(2024, 11, 10),
      time: "10:00 AM",
      description: "Present your marketing campaign proposal to the class",
      priority: "medium",
      status: "completed",
    },
    {
      id: 4,
      title: "Office Hours",
      type: "meeting",
      course: "General",
      date: new Date(2024, 11, 8),
      time: "3:00 PM",
      description: "Weekly office hours for student consultations",
      priority: "low",
      status: "pending",
    },
    {
      id: 5,
      title: "Machine Learning Assignment 3",
      type: "assignment",
      course: "Machine Learning",
      date: new Date(2024, 11, 18),
      time: "11:59 PM",
      description: "Implement and test a neural network model",
      priority: "medium",
      status: "pending",
    },
  ];

  // Get current month's events
  const getMonthEvents = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return events.filter(
      (event) =>
        event.date.getFullYear() === year && event.date.getMonth() === month
    );
  };

  // Get events for a specific date
  const getDateEvents = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    while (currentDateObj <= lastDay || days.length < 42) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthEvents = getMonthEvents();

  const getEventIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4" />;
      case "exam":
        return <BookOpen className="h-4 w-4" />;
      case "presentation":
        return <Users className="h-4 w-4" />;
      case "meeting":
        return <Clock className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and track important dates
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={view}
              onValueChange={(value: "month" | "week" | "day") =>
                setView(value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event or assignment deadline
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="Enter event title" />
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="presentation">
                          Presentation
                        </SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter event description"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Calendar Navigation */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold">
                  {formatDate(currentDate)}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((date, index) => {
                const dayEvents = getDateEvents(date);
                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                      !isCurrentMonth(date) ? "text-muted-foreground/50" : ""
                    } ${isToday(date) ? "bg-primary/10 border-primary" : ""}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="text-sm font-medium mb-1">
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getPriorityColor(
                            event.priority
                          )}`}
                        >
                          <div className="flex items-center space-x-1">
                            {getEventIcon(event.type)}
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your next {monthEvents.length} events this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`p-2 rounded-lg ${getPriorityColor(
                          event.priority
                        )}`}
                      >
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium truncate">
                            {event.title}
                          </h3>
                          <Badge
                            variant={
                              event.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{event.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{event.course}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Events</span>
                    <Badge variant="default">{monthEvents.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assignments</span>
                    <Badge variant="secondary">
                      {
                        monthEvents.filter((e) => e.type === "assignment")
                          .length
                      }
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Exams</span>
                    <Badge variant="outline">
                      {monthEvents.filter((e) => e.type === "exam").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Priority</span>
                    <Badge variant="destructive">
                      {monthEvents.filter((e) => e.priority === "high").length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Assignment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Plan Exam
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
