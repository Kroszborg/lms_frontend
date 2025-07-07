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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Plus,
  Search,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Pin,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Discussions() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [showNewThread, setShowNewThread] = useState(false);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy discussion data
  const discussions = [
    {
      id: 1,
      title: "Help with React Hooks - useState vs useEffect",
      author: "Alice Johnson",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      course: "Web Development",
      category: "Technical Help",
      replies: 12,
      views: 156,
      likes: 8,
      isPinned: true,
      isSolved: false,
      lastActivity: "2 hours ago",
      tags: ["react", "hooks", "javascript"],
    },
    {
      id: 2,
      title: "Best practices for responsive design",
      author: "Bob Smith",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      course: "UI/UX Design",
      category: "Design Discussion",
      replies: 8,
      views: 89,
      likes: 15,
      isPinned: false,
      isSolved: true,
      lastActivity: "1 day ago",
      tags: ["css", "responsive", "design"],
    },
    {
      id: 3,
      title: "Data Science project ideas for portfolio",
      author: "Carol Davis",
      authorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      course: "Data Science",
      category: "Project Ideas",
      replies: 23,
      views: 234,
      likes: 32,
      isPinned: false,
      isSolved: false,
      lastActivity: "3 hours ago",
      tags: ["data-science", "portfolio", "projects"],
    },
    {
      id: 4,
      title: "How to handle authentication in Node.js",
      author: "David Wilson",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      course: "Backend Development",
      category: "Technical Help",
      replies: 6,
      views: 67,
      likes: 4,
      isPinned: false,
      isSolved: false,
      lastActivity: "5 hours ago",
      tags: ["nodejs", "authentication", "backend"],
    },
  ];

  const categories = [
    "All Discussions",
    "Technical Help",
    "Design Discussion",
    "Project Ideas",
    "General Discussion",
    "Course Feedback",
  ];

  const courses = [
    "All Courses",
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Backend Development",
    "Digital Marketing",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Discussion Forum
            </h1>
            <p className="text-muted-foreground">
              Connect with fellow learners and get help
            </p>
          </div>
          <Button onClick={() => setShowNewThread(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        {/* New Thread Modal */}
        {showNewThread && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Start a New Discussion</CardTitle>
              <CardDescription>
                Share your thoughts, ask questions, or start a conversation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter discussion title..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Course (Optional)</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.slice(1).map((course) => (
                      <SelectItem key={course} value={course.toLowerCase()}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Write your discussion content..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (Optional)</label>
                <Input placeholder="Enter tags separated by commas..." />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowNewThread(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button>Post Discussion</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search discussions..." className="pl-10" />
              </div>
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category.toLowerCase().replace(" ", "-")}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem
                      key={course}
                      value={course.toLowerCase().replace(" ", "-")}
                    >
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Discussions List */}
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  {/* Author Avatar */}
                  <Avatar className="h-10 w-10">
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

                  {/* Discussion Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {discussion.isPinned && (
                            <Pin className="h-4 w-4 text-blue-500" />
                          )}
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.isSolved && (
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-600"
                            >
                              Solved
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.lastActivity}</span>
                          <span>•</span>
                          <span>{discussion.course}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{discussion.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Topics */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Popular Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { topic: "React Development", count: 45, icon: "⚛️" },
                  { topic: "CSS & Styling", count: 32, icon: "🎨" },
                  { topic: "JavaScript Tips", count: 28, icon: "📝" },
                  { topic: "Project Ideas", count: 23, icon: "💡" },
                  { topic: "Career Advice", count: 19, icon: "🚀" },
                  { topic: "Study Groups", count: 15, icon: "👥" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.topic}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.count} discussions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
