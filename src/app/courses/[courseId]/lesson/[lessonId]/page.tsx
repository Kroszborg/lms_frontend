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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Bookmark,
  Share2,
  MessageSquare,
  CheckCircle,
  Lock,
  ArrowLeft,
  ArrowRight,
  Star,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  Edit,
} from "lucide-react";

export default function VideoLesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1800); // 30 minutes in seconds
  const [showNotes, setShowNotes] = useState(false);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy lesson data
  const lesson = {
    id: params.lessonId,
    title: "Introduction to React Components",
    description:
      "Learn the fundamentals of React components, including functional and class components, props, and state management.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "30:15",
    course: "Web Development Fundamentals",
    instructor: "John Smith",
    instructorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    progress: 65,
    isCompleted: false,
    nextLesson: "React Hooks Basics",
    prevLesson: "JavaScript Fundamentals",
  };

  const courseContent = [
    {
      id: 1,
      title: "Course Introduction",
      type: "video",
      duration: "5:30",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      type: "video",
      duration: "25:45",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: "Introduction to React Components",
      type: "video",
      duration: "30:15",
      isCompleted: false,
      isLocked: false,
      isCurrent: true,
    },
    {
      id: 4,
      title: "React Hooks Basics",
      type: "video",
      duration: "28:20",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 5,
      title: "State Management",
      type: "video",
      duration: "35:10",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 6,
      title: "Component Quiz",
      type: "quiz",
      duration: "15 min",
      isCompleted: false,
      isLocked: true,
    },
  ];

  const notes = [
    {
      id: 1,
      content: "Components are reusable UI elements in React",
      timestamp: "2:30",
      author: "Alice Johnson",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      content: "Props are read-only and passed from parent to child",
      timestamp: "8:45",
      author: "Bob Smith",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      createdAt: "1 hour ago",
    },
  ];

  const discussions = [
    {
      id: 1,
      content:
        "Great explanation of components! When should we use functional vs class components?",
      author: "Carol Davis",
      authorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      createdAt: "3 hours ago",
      likes: 5,
      replies: 2,
    },
    {
      id: 2,
      content:
        "The props example was very clear. Can we see more complex prop passing examples?",
      author: "David Wilson",
      authorAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      createdAt: "1 hour ago",
      likes: 3,
      replies: 1,
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push(`/courses/${params.courseId}`)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Course</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {lesson.title}
              </h1>
              <p className="text-muted-foreground">{lesson.course}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Video Placeholder */}
                  <div className="aspect-video bg-black relative">
                    <iframe
                      src={lesson.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />

                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="space-y-2">
                        {/* Progress Bar */}
                        <div className="w-full bg-white/20 rounded-full h-1">
                          <div
                            className="bg-white h-1 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                              onClick={() => setIsPlaying(!isPlaying)}
                            >
                              {isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <span className="text-sm">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                              onClick={() => setIsMuted(!isMuted)}
                            >
                              {isMuted ? (
                                <VolumeX className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20"
                            >
                              <Maximize className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{lesson.title}</CardTitle>
                    <CardDescription>
                      Instructor: {lesson.instructor} • Duration:{" "}
                      {lesson.duration}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={lesson.isCompleted ? "default" : "secondary"}
                    >
                      {lesson.isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {lesson.description}
                </p>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    disabled={!lesson.prevLesson}
                    onClick={() =>
                      router.push(
                        `/courses/${params.courseId}/lesson/${
                          parseInt(params.lessonId) - 1
                        }`
                      )
                    }
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      // Mark as completed logic
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Complete
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!lesson.nextLesson}
                    onClick={() =>
                      router.push(
                        `/courses/${params.courseId}/lesson/${
                          parseInt(params.lessonId) + 1
                        }`
                      )
                    }
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Notes, Discussion, etc. */}
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="prose max-w-none">
                    <h3>Lesson Overview</h3>
                    <p>
                      In this lesson, you&apos;ll learn about React components,
                      the building blocks of React applications.
                    </p>

                    <h4>What you&apos;ll learn:</h4>
                    <ul>
                      <li>Understanding React components</li>
                      <li>Functional vs Class components</li>
                      <li>Props and how to pass data</li>
                      <li>Component composition</li>
                    </ul>

                    <h4>Prerequisites:</h4>
                    <ul>
                      <li>Basic JavaScript knowledge</li>
                      <li>Understanding of HTML and CSS</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Notes</h3>
                    <Button onClick={() => setShowNotes(!showNotes)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>

                  {showNotes && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Note Content</Label>
                            <Textarea
                              placeholder="Add your note here..."
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button>Save Note</Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowNotes(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-4">
                    {notes.map((note) => (
                      <Card key={note.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={note.authorAvatar}
                                alt={note.author}
                              />
                              <AvatarFallback>
                                {note.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium">
                                  {note.author}
                                </span>
                                <Badge variant="outline">
                                  {note.timestamp}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {note.createdAt}
                                </span>
                              </div>
                              <p>{note.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Discussion</h3>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ask Question
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {discussions.map((discussion) => (
                        <Card key={discussion.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={discussion.authorAvatar}
                                  alt={discussion.author}
                                />
                                <AvatarFallback>
                                  {discussion.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-medium">
                                    {discussion.author}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {discussion.createdAt}
                                  </span>
                                </div>
                                <p className="mb-3">{discussion.content}</p>
                                <div className="flex items-center space-x-4">
                                  <Button variant="ghost" size="sm">
                                    <ThumbsUp className="mr-1 h-3 w-3" />
                                    {discussion.likes}
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="mr-1 h-3 w-3" />
                                    Reply ({discussion.replies})
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Flag className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  4 of 6 lessons completed
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {courseContent.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        item.isCurrent
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {item.isLocked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : item.isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Play className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span
                          className={`text-sm ${
                            item.isCurrent ? "font-medium" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={lesson.instructorAvatar}
                      alt={lesson.instructor}
                    />
                    <AvatarFallback>
                      {lesson.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{lesson.instructor}</div>
                    <div className="text-sm text-muted-foreground">
                      Senior Web Developer
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">4.8 (1.2k reviews)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
