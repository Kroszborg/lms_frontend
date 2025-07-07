"use client";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Star,
  Edit,
  Save,
  Camera,
  Bell,
  Shield,
  Globe,
  GraduationCap,
  Trophy,
  Target,
  Settings,
  Download,
  Share2,
  Plus,
  CheckCircle,
  Users,
  BarChart3,
} from "lucide-react";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // Dummy user profile data
  const profileData = {
    name: "Admin User",
    email: "admin@edulms.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2024",
    role: "Administrator",
    department: "Information Technology",
    bio: "Experienced educator and administrator with a passion for technology-enhanced learning. Specializing in web development and data science education.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=200&fit=crop",
  };

  // Dummy course progress data
  const courseProgress = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      grade: "A-",
      lastAccessed: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Advanced Data Science",
      instructor: "Prof. Michael Chen",
      progress: 45,
      grade: "B+",
      lastAccessed: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      instructor: "Ms. Emily Rodriguez",
      progress: 90,
      grade: "A",
      lastAccessed: "3 days ago",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    },
  ];

  // Dummy achievements data
  const achievements = [
    {
      id: 1,
      title: "First Course Completed",
      description: "Successfully completed your first course",
      icon: Trophy,
      date: "March 15, 2024",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Achieved 100% on an assignment",
      icon: Star,
      date: "February 28, 2024",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Consistent Learner",
      description: "Logged in for 30 consecutive days",
      icon: Target,
      date: "January 20, 2024",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "Helpful Contributor",
      description: "Helped 10 other students",
      icon: Users,
      date: "December 10, 2023",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // Dummy statistics
  const stats = [
    {
      label: "Courses Enrolled",
      value: "12",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Courses Completed",
      value: "8",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Average Grade",
      value: "A-",
      icon: Award,
      color: "text-purple-600",
    },
    {
      label: "Study Hours",
      value: "156",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      label: "Achievements",
      value: "15",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      label: "Certificates",
      value: "6",
      icon: GraduationCap,
      color: "text-indigo-600",
    },
  ];

  // Dummy recent activity
  const recentActivity = [
    {
      id: 1,
      action: "Completed assignment",
      course: "Web Development",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      action: "Joined discussion",
      course: "Data Science",
      time: "4 hours ago",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      action: "Downloaded resource",
      course: "Digital Marketing",
      time: "1 day ago",
      icon: Download,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      action: "Earned achievement",
      course: "Machine Learning",
      time: "2 days ago",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg relative overflow-hidden">
            <img
              src={profileData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 ml-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-2xl">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 text-white">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold">{profileData.name}</h1>
                <Badge variant="secondary">{profileData.role}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">
                {profileData.department}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>12 courses enrolled</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditing && (
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div
                  className={`mx-auto mb-2 p-2 rounded-full ${stat.color
                    .replace("text-", "bg-")
                    .replace("-600", "-100")}`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bio Section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        placeholder="Tell us about yourself..."
                        defaultValue={profileData.bio}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.bio}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        {isEditing ? (
                          <Input defaultValue={profileData.email} />
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {profileData.email}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        {isEditing ? (
                          <Input defaultValue={profileData.phone} />
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {profileData.phone}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        {isEditing ? (
                          <Input defaultValue={profileData.location} />
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {profileData.location}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        {isEditing ? (
                          <Input defaultValue={profileData.department} />
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            {profileData.department}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Achievements */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.slice(0, 3).map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center space-x-3"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${achievement.color}`}
                          >
                            <achievement.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {achievement.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {achievement.date}
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
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Enroll in Course
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseProgress.map((course) => (
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
                        {course.grade}
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
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button className="flex-1" size="sm">
                        Continue
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Achievements</h2>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="text-center">
                  <CardContent className="pt-6">
                    <div
                      className={`mx-auto mb-4 p-4 rounded-full ${achievement.color}`}
                    >
                      <achievement.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
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
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.course} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified in real-time
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Course Updates</p>
                      <p className="text-sm text-muted-foreground">
                        New content and announcements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">
                        Allow others to view your profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Progress</p>
                      <p className="text-sm text-muted-foreground">
                        Display course progress publicly
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Feed</p>
                      <p className="text-sm text-muted-foreground">
                        Share your learning activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Globe className="mr-2 h-4 w-4" />
                      Change Language
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      Delete Account
                    </Button>
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
