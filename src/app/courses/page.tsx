"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Star,
  Users,
  Clock,
  BookOpen,
  CheckCircle,
  Heart,
  Flame,
  Plus,
} from "lucide-react";

export default function CourseCatalog() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy courses data
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description:
        "Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js",
      instructor: "John Smith",
      instructorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "Web Development",
      level: "Beginner",
      duration: "45 hours",
      students: 12450,
      rating: 4.8,
      reviews: 2340,
      price: 89.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      isEnrolled: false,
      isFeatured: true,
      isNew: false,
      tags: ["html", "css", "javascript", "react", "nodejs"],
      lessons: 156,
      certificate: true,
    },
    {
      id: 2,
      title: "Data Science Masterclass",
      description:
        "Master data science with Python, pandas, numpy, and machine learning algorithms",
      instructor: "Sarah Johnson",
      instructorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "Data Science",
      level: "Intermediate",
      duration: "32 hours",
      students: 8920,
      rating: 4.9,
      reviews: 1567,
      price: 129.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      isEnrolled: true,
      isFeatured: false,
      isNew: true,
      tags: ["python", "pandas", "numpy", "machine-learning"],
      lessons: 98,
      certificate: true,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description:
        "Learn modern UI/UX design principles, tools, and best practices",
      instructor: "Mike Davis",
      instructorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      category: "Design",
      level: "Beginner",
      duration: "28 hours",
      students: 5670,
      rating: 4.7,
      reviews: 890,
      price: 79.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
      isEnrolled: false,
      isFeatured: false,
      isNew: false,
      tags: ["ui", "ux", "design", "figma"],
      lessons: 84,
      certificate: true,
    },
    {
      id: 4,
      title: "Advanced React & TypeScript",
      description:
        "Take your React skills to the next level with TypeScript and advanced patterns",
      instructor: "Alice Johnson",
      instructorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "Web Development",
      level: "Advanced",
      duration: "38 hours",
      students: 3450,
      rating: 4.9,
      reviews: 678,
      price: 149.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      isEnrolled: false,
      isFeatured: true,
      isNew: false,
      tags: ["react", "typescript", "advanced", "patterns"],
      lessons: 112,
      certificate: true,
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      description:
        "Learn comprehensive digital marketing strategies for business growth",
      instructor: "Bob Wilson",
      instructorAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      category: "Marketing",
      level: "Intermediate",
      duration: "25 hours",
      students: 7890,
      rating: 4.6,
      reviews: 1234,
      price: 69.99,
      originalPrice: 139.99,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      isEnrolled: false,
      isFeatured: false,
      isNew: false,
      tags: ["marketing", "strategy", "social-media", "seo"],
      lessons: 76,
      certificate: true,
    },
    {
      id: 6,
      title: "Mobile App Development",
      description:
        "Build native mobile apps for iOS and Android using React Native",
      instructor: "Carol Davis",
      instructorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "42 hours",
      students: 4560,
      rating: 4.8,
      reviews: 945,
      price: 119.99,
      originalPrice: 239.99,
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
      isEnrolled: false,
      isFeatured: false,
      isNew: true,
      tags: ["react-native", "mobile", "ios", "android"],
      lessons: 134,
      certificate: true,
    },
  ];

  const categories = [
    "All Categories",
    "Web Development",
    "Data Science",
    "Design",
    "Marketing",
    "Mobile Development",
    "Business",
    "Photography",
  ];

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
  const prices = ["All Prices", "Free", "Paid", "Under $50", "Under $100"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesPrice =
      selectedPrice === "all" ||
      (selectedPrice === "Free" && course.price === 0) ||
      (selectedPrice === "Paid" && course.price > 0) ||
      (selectedPrice === "Under $50" && course.price < 50) ||
      (selectedPrice === "Under $100" && course.price < 100);

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const featuredCourses = courses.filter((course) => course.isFeatured);
  const newCourses = courses.filter((course) => course.isNew);
  const enrolledCourses = courses.filter((course) => course.isEnrolled);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Course Catalog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of courses from top instructors around the world
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
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
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {prices.map((price) => (
                    <SelectItem
                      key={price}
                      value={price.toLowerCase().replace(" ", "-")}
                    >
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Courses ({filteredCourses.length})
            </TabsTrigger>
            <TabsTrigger value="featured">
              Featured ({featuredCourses.length})
            </TabsTrigger>
            <TabsTrigger value="new">New ({newCourses.length})</TabsTrigger>
            <TabsTrigger value="enrolled">
              My Courses ({enrolledCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course }: { course: typeof courses[0] }) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {course.isFeatured && (
            <Badge className="bg-orange-500">
              <Flame className="mr-1 h-3 w-3" />
              Featured
            </Badge>
          )}
          {course.isNew && (
            <Badge className="bg-green-500">
              <Plus className="mr-1 h-3 w-3" />
              New
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {course.isEnrolled && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-green-500">
              <CheckCircle className="mr-1 h-3 w-3" />
              Enrolled
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline">{course.category}</Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({course.reviews})
            </span>
          </div>
        </div>

        <h3
          className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer"
          onClick={() => router.push(`/courses/${course.id}`)}
        >
          {course.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={course.instructorAvatar}
              alt={course.instructor}
            />
            <AvatarFallback className="text-xs">
              {course.instructor
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {course.instructor}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{course.lessons} lessons</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {course.price === 0 ? (
              <span className="font-semibold text-green-600">Free</span>
            ) : (
              <>
                <span className="font-semibold">${course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => router.push(`/courses/${course.id}`)}
          >
            {course.isEnrolled ? "Continue" : "Enroll Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
