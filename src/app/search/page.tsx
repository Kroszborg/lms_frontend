"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  BookOpen,
  FileText,
  Users,
  Calendar,
  Star,
  Clock,
  ArrowRight,
  Eye,
  Download,
  Share,
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  History,
  Lightbulb,
} from "lucide-react";

export default function SearchPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [isSearching, setIsSearching] = useState(false);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy search data
  const searchResults = {
    courses: [
      {
        id: 1,
        title: "Introduction to Web Development",
        instructor: "Dr. Sarah Johnson",
        description:
          "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
        rating: 4.8,
        students: 124,
        duration: "8 weeks",
        level: "Beginner",
        tags: ["HTML", "CSS", "JavaScript", "Web Development"],
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
        lastUpdated: "2 days ago",
      },
      {
        id: 2,
        title: "Advanced Data Science with Python",
        instructor: "Prof. Michael Chen",
        description:
          "Master data science techniques using Python, pandas, and scikit-learn.",
        rating: 4.9,
        students: 89,
        duration: "12 weeks",
        level: "Advanced",
        tags: ["Python", "Data Science", "Machine Learning", "Pandas"],
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
        lastUpdated: "1 week ago",
      },
    ],
    assignments: [
      {
        id: 1,
        title: "Web Development Final Project",
        course: "Web Development",
        description:
          "Create a responsive website using HTML, CSS, and JavaScript.",
        dueDate: "Dec 15, 2024",
        status: "pending",
        type: "Project",
        difficulty: "Medium",
        estimatedTime: "20 hours",
      },
      {
        id: 2,
        title: "Data Analysis Report",
        course: "Data Science",
        description:
          "Analyze a dataset and create a comprehensive report with visualizations.",
        dueDate: "Dec 12, 2024",
        status: "pending",
        type: "Report",
        difficulty: "Hard",
        estimatedTime: "15 hours",
      },
    ],
    students: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@email.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        courses: ["Web Development", "Data Science"],
        progress: 85,
        lastActive: "2 hours ago",
        grade: "A-",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@email.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        courses: ["Data Science", "Machine Learning"],
        progress: 72,
        lastActive: "1 day ago",
        grade: "B+",
      },
    ],
    content: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        type: "Lecture",
        course: "Web Development",
        description: "Introduction to JavaScript programming language basics.",
        duration: "45 minutes",
        views: 156,
        lastAccessed: "3 days ago",
        tags: ["JavaScript", "Programming", "Basics"],
      },
      {
        id: 2,
        title: "Data Visualization with Matplotlib",
        type: "Tutorial",
        course: "Data Science",
        description:
          "Learn to create effective data visualizations using Python.",
        duration: "60 minutes",
        views: 89,
        lastAccessed: "1 week ago",
        tags: ["Python", "Data Visualization", "Matplotlib"],
      },
    ],
  };

  // Filter results based on search term and filter
  const getFilteredResults = () => {
    if (!searchTerm) return searchResults;

    const term = searchTerm.toLowerCase();
    const filtered = { ...searchResults };

    if (filter === "all" || filter === "courses") {
      filtered.courses = searchResults.courses.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          course.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    if (filter === "all" || filter === "assignments") {
      filtered.assignments = searchResults.assignments.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(term) ||
          assignment.description.toLowerCase().includes(term) ||
          assignment.course.toLowerCase().includes(term)
      );
    }

    if (filter === "all" || filter === "students") {
      filtered.students = searchResults.students.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term) ||
          student.courses.some((course) => course.toLowerCase().includes(term))
      );
    }

    if (filter === "all" || filter === "content") {
      filtered.content = searchResults.content.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  };

  const filteredResults = getFilteredResults();
  const totalResults = Object.values(filteredResults).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 500);
  };

  const getSearchSuggestions = () => {
    if (!searchTerm) return [];

    const suggestions = [
      "Web Development",
      "Data Science",
      "JavaScript",
      "Python",
      "Machine Learning",
      "HTML CSS",
      "React",
      "Node.js",
    ];

    return suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  };

  const suggestions = getSearchSuggestions();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Search EduLMS</h1>
          <p className="text-muted-foreground text-center mb-6">
            Find courses, assignments, students, and content across the platform
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for courses, assignments, students, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-24 h-12 text-lg"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>

          {/* Search Suggestions */}
          {suggestions.length > 0 && !searchTerm.includes(" ") && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        {searchTerm && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                    <SelectItem value="assignments">Assignments</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {totalResults} results found for "{searchTerm}"
              </p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Most relevant first
                </span>
              </div>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
                <TabsTrigger value="courses">
                  Courses ({filteredResults.courses.length})
                </TabsTrigger>
                <TabsTrigger value="assignments">
                  Assignments ({filteredResults.assignments.length})
                </TabsTrigger>
                <TabsTrigger value="students">
                  Students ({filteredResults.students.length})
                </TabsTrigger>
                <TabsTrigger value="content">
                  Content ({filteredResults.content.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {/* Courses */}
                {filteredResults.courses.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Courses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredResults.courses.map((course) => (
                        <Card
                          key={course.id}
                          className="hover:shadow-lg transition-all duration-300"
                        >
                          <div className="aspect-video bg-muted relative overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary">{course.level}</Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {course.title}
                            </CardTitle>
                            <CardDescription>
                              {course.instructor}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {course.description}
                            </p>
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
                            <div className="flex flex-wrap gap-1 mb-3">
                              {course.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button className="w-full">View Course</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assignments */}
                {filteredResults.assignments.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Assignments
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredResults.assignments.map((assignment) => (
                        <Card
                          key={assignment.id}
                          className="hover:shadow-lg transition-all duration-300"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                {assignment.title}
                              </CardTitle>
                              <Badge
                                variant={
                                  assignment.status === "pending"
                                    ? "secondary"
                                    : "default"
                                }
                              >
                                {assignment.status}
                              </Badge>
                            </div>
                            <CardDescription>
                              {assignment.course}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {assignment.description}
                            </p>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span>Due Date:</span>
                                <span className="font-medium">
                                  {assignment.dueDate}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Type:</span>
                                <Badge variant="outline">
                                  {assignment.type}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Difficulty:</span>
                                <Badge variant="outline">
                                  {assignment.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <Button className="w-full">View Assignment</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Students */}
                {filteredResults.students.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Students
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredResults.students.map((student) => (
                        <Card
                          key={student.id}
                          className="hover:shadow-lg transition-all duration-300"
                        >
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={student.avatar}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-medium">{student.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {student.email}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge variant="outline">
                                    {student.grade}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {student.progress}% complete
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-sm text-muted-foreground mb-2">
                                Enrolled in:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {student.courses.map((course) => (
                                  <Badge
                                    key={course}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button className="w-full mt-4">
                              View Profile
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                {filteredResults.content.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Content
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredResults.content.map((item) => (
                        <Card
                          key={item.id}
                          className="hover:shadow-lg transition-all duration-300"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                {item.title}
                              </CardTitle>
                              <Badge variant="outline">{item.type}</Badge>
                            </div>
                            <CardDescription>{item.course}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{item.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                <span>{item.views} views</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button className="w-full">View Content</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Individual tab contents would go here for specific filters */}
              <TabsContent value="courses" className="space-y-6">
                {/* Same as courses section above */}
              </TabsContent>
              <TabsContent value="assignments" className="space-y-6">
                {/* Same as assignments section above */}
              </TabsContent>
              <TabsContent value="students" className="space-y-6">
                {/* Same as students section above */}
              </TabsContent>
              <TabsContent value="content" className="space-y-6">
                {/* Same as content section above */}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Recent Searches */}
        {!searchTerm && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Web Development",
                    "Data Science",
                    "JavaScript",
                    "Python",
                    "Machine Learning",
                  ].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      onClick={() => setSearchTerm(term)}
                      className="text-sm"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
