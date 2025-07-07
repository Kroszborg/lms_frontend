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
import { Badge } from "@/components/ui/badge";
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
  Upload,
  Download,
  Eye,
  Search,
  Folder,
  File,
  FileImage,
  FileVideo,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileText,
  MoreHorizontal,
  Star,
  Share2,
  User,
  HardDrive,
  Lock,
  Globe,
} from "lucide-react";

export default function Files() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Dummy files data
  const files = [
    {
      id: 1,
      name: "React Fundamentals Guide.pdf",
      type: "pdf",
      size: "2.4 MB",
      course: "Web Development",
      uploadedBy: "John Teacher",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-15",
      downloads: 45,
      isPublic: true,
      isStarred: true,
      tags: ["react", "guide", "fundamentals"],
    },
    {
      id: 2,
      name: "CSS Grid Tutorial.mp4",
      type: "video",
      size: "156.7 MB",
      course: "Web Development",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2024-01-14",
      lastModified: "2024-01-14",
      downloads: 23,
      isPublic: true,
      isStarred: false,
      tags: ["css", "grid", "tutorial"],
    },
    {
      id: 3,
      name: "JavaScript Exercises.zip",
      type: "archive",
      size: "8.9 MB",
      course: "Web Development",
      uploadedBy: "Mike Davis",
      uploadDate: "2024-01-13",
      lastModified: "2024-01-13",
      downloads: 67,
      isPublic: false,
      isStarred: true,
      tags: ["javascript", "exercises", "practice"],
    },
    {
      id: 4,
      name: "Data Science Project.xlsx",
      type: "spreadsheet",
      size: "1.2 MB",
      course: "Data Science",
      uploadedBy: "Alice Johnson",
      uploadDate: "2024-01-12",
      lastModified: "2024-01-12",
      downloads: 12,
      isPublic: true,
      isStarred: false,
      tags: ["data-science", "project", "analysis"],
    },
    {
      id: 5,
      name: "UI Design Principles.pptx",
      type: "presentation",
      size: "15.3 MB",
      course: "UI/UX Design",
      uploadedBy: "Bob Smith",
      uploadDate: "2024-01-11",
      lastModified: "2024-01-11",
      downloads: 34,
      isPublic: true,
      isStarred: false,
      tags: ["ui", "design", "principles"],
    },
    {
      id: 6,
      name: "API Documentation.md",
      type: "document",
      size: "0.8 MB",
      course: "Backend Development",
      uploadedBy: "Carol Davis",
      uploadDate: "2024-01-10",
      lastModified: "2024-01-10",
      downloads: 28,
      isPublic: false,
      isStarred: true,
      tags: ["api", "documentation", "backend"],
    },
  ];

  const fileTypes = [
    { value: "all", label: "All Files", icon: File },
    { value: "pdf", label: "PDFs", icon: FileText },
    { value: "video", label: "Videos", icon: FileVideo },
    { value: "image", label: "Images", icon: FileImage },
    { value: "document", label: "Documents", icon: FileText },
    { value: "spreadsheet", label: "Spreadsheets", icon: FileSpreadsheet },
    { value: "presentation", label: "Presentations", icon: FileText },
    { value: "archive", label: "Archives", icon: FileArchive },
    { value: "code", label: "Code Files", icon: FileCode },
  ];

  const courses = [
    "All Courses",
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Backend Development",
    "Digital Marketing",
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "video":
        return <FileVideo className="h-5 w-5 text-purple-500" />;
      case "image":
        return <FileImage className="h-5 w-5 text-green-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-500" />;
      case "archive":
        return <FileArchive className="h-5 w-5 text-yellow-500" />;
      case "code":
        return <FileCode className="h-5 w-5 text-gray-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "PDF Document";
      case "video":
        return "Video File";
      case "image":
        return "Image File";
      case "document":
        return "Text Document";
      case "spreadsheet":
        return "Spreadsheet";
      case "presentation":
        return "Presentation";
      case "archive":
        return "Archive";
      case "code":
        return "Code File";
      default:
        return "File";
    }
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesType = activeTab === "all" || file.type === activeTab;
    return matchesSearch && matchesType;
  });

  const storageStats = {
    used: "2.4 GB",
    total: "10 GB",
    percentage: 24,
    files: files.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">File Manager</h1>
            <p className="text-muted-foreground">
              Upload, organize, and manage your files
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Folder className="mr-2 h-4 w-4" />
              New Folder
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {storageStats.used}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Storage Used
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <HardDrive className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{storageStats.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${storageStats.percentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {storageStats.files}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Files
                  </div>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <File className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <div className="text-sm text-muted-foreground">
                    Downloads Today
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-sm text-muted-foreground">
                    Shared Files
                  </div>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Share2 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fileTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
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

        {/* Files List */}
        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>
              {filteredFiles.length} files found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div>
                          <div className="font-medium flex items-center space-x-2">
                            <span>{file.name}</span>
                            {file.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {file.uploadDate}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getFileTypeLabel(file.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.course}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{file.uploadedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3 text-muted-foreground" />
                        <span>{file.downloads}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {file.isPublic ? (
                        <div className="flex items-center space-x-1">
                          <Globe className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Public</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Lock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Private</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Drag and drop files here or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
              <p className="text-muted-foreground mb-4">
                Support for PDF, DOC, XLS, PPT, Images, Videos, and more
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
                <span>Max file size: 15MB</span>
                <span>•</span>
                <span>
                  Supported formats: PDF, DOC, XLS, PPT, JPG, PNG, MP4, ZIP
                </span>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
