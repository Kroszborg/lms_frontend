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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Upload,
  Video,
  FileText,
  Image,
  File,
  Trash2,
  Edit,
  Eye,
  Move,
  Users,
  Settings,
  Save,
  ArrowLeft,
  Clock,
  Award,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function CreateCourse() {
  const { isAuthenticated, hasRole } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");

  if (!isAuthenticated || !hasRole("teacher")) {
    router.push("/login");
    return null;
  }

  // Dummy course content
  const [courseContent, setCourseContent] = useState([
    {
      id: 1,
      type: "video",
      title: "Introduction to Web Development",
      duration: "45 min",
      status: "published",
      order: 1,
    },
    {
      id: 2,
      type: "document",
      title: "HTML Basics - Study Guide",
      duration: "30 min",
      status: "draft",
      order: 2,
    },
    {
      id: 3,
      type: "quiz",
      title: "HTML Fundamentals Quiz",
      duration: "15 min",
      status: "published",
      order: 3,
    },
  ]);

  const contentTypes = [
    { value: "video", label: "Video", icon: Video },
    { value: "document", label: "Document", icon: FileText },
    { value: "image", label: "Image", icon: Image },
    { value: "quiz", label: "Quiz", icon: Award },
    { value: "assignment", label: "Assignment", icon: File },
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "quiz":
        return <Award className="h-4 w-4" />;
      case "assignment":
        return <File className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/teacher")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Studio</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create New Course
              </h1>
              <p className="text-muted-foreground">
                Set up your course structure and content
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Course
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                    <CardDescription>
                      Basic details about your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter course title"
                        defaultValue="Advanced Web Development with React"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Course Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your course..."
                        rows={4}
                        defaultValue="Learn advanced web development techniques using React, TypeScript, and modern development tools. This comprehensive course covers everything from basic concepts to advanced patterns."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue="web-development">
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web-development">
                              Web Development
                            </SelectItem>
                            <SelectItem value="data-science">
                              Data Science
                            </SelectItem>
                            <SelectItem value="digital-marketing">
                              Digital Marketing
                            </SelectItem>
                            <SelectItem value="mobile-development">
                              Mobile Development
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">Difficulty Level</Label>
                        <Select defaultValue="intermediate">
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Media</CardTitle>
                    <CardDescription>
                      Add course thumbnail and promotional video
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Course Thumbnail</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop an image here, or click to browse
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Image
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Promotional Video</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Video className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload a promotional video for your course
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Video
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Content Items
                      </span>
                      <span className="font-medium">
                        {courseContent.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Duration
                      </span>
                      <span className="font-medium">1h 30m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Published Items
                      </span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Draft Items
                      </span>
                      <span className="font-medium">1</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Content
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Invite Students
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Course Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>
                      Organize your course materials and lessons
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Move className="h-4 w-4 text-muted-foreground cursor-move" />
                            <span className="font-medium">{item.order}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getContentIcon(item.type)}
                            <span className="capitalize">{item.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{item.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{item.duration}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Course Visibility</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span>Public</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span>Private</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Completion Certificate</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Discussion Forums</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grading Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Grading Scale</Label>
                    <Select defaultValue="letter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="letter">
                          Letter Grades (A-F)
                        </SelectItem>
                        <SelectItem value="percentage">
                          Percentage (0-100)
                        </SelectItem>
                        <SelectItem value="pass-fail">Pass/Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Passing Grade</Label>
                    <Input type="number" defaultValue="70" />
                  </div>
                  <div className="space-y-2">
                    <Label>Weighted Assignments</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="enrollment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Settings</CardTitle>
                <CardDescription>
                  Configure how students can enroll in your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Enrollment Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          title="Allow self-enrollment"
                          type="checkbox"
                          id="self-enrollment"
                          defaultChecked
                        />
                        <Label htmlFor="self-enrollment">
                          Allow self-enrollment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          title="Require approval"
                          type="checkbox"
                          id="approval-required"
                        />
                        <Label htmlFor="approval-required">
                          Require approval
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          title="Enable waitlist"
                          type="checkbox"
                          id="waitlist"
                        />
                        <Label htmlFor="waitlist">Enable waitlist</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Capacity Settings</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Maximum Students</Label>
                        <Input type="number" defaultValue="50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Waitlist Capacity</Label>
                        <Input type="number" defaultValue="10" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Course</CardTitle>
                <CardDescription>
                  Review and publish your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Publishing Checklist</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Course title and description</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Course thumbnail</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span>At least one content item</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span>Enrollment settings</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Publishing Options</h3>
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        Save as Draft
                      </Button>
                      <Button className="w-full">Publish Course</Button>
                      <Button className="w-full" variant="outline">
                        Schedule Publication
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
