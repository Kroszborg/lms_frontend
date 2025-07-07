"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  User,
  Crown,
  GraduationCap,
  Users,
} from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(username, password);

    if (success) {
      // Redirect based on role
      if (username === "admin") {
        router.push("/admin");
      } else if (username === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    } else {
      setError(
        "Invalid username or password. Please check the credentials below."
      );
    }

    setIsLoading(false);
  };

  const quickLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
            <span className="text-3xl font-bold">EduLMS</span>
          </div>
          <p className="text-muted-foreground">Learning Management System</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Accounts */}
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Demo Accounts
              </CardTitle>
              <CardDescription className="text-center">
                Click on any account to auto-fill credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="admin"
                    className="flex items-center gap-2"
                  >
                    <Crown className="h-4 w-4" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger
                    value="teacher"
                    className="flex items-center gap-2"
                  >
                    <GraduationCap className="h-4 w-4" />
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger
                    value="student"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Student
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="admin" className="space-y-4 mt-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Admin Dashboard</h3>
                      <Badge variant="destructive">Full Access</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete system control, user management, course
                      oversight, and analytics.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Username:</strong> admin
                      </div>
                      <div>
                        <strong>Password:</strong> admin
                      </div>
                    </div>
                    <Button
                      onClick={() => quickLogin("admin", "admin")}
                      className="w-full mt-3"
                      variant="outline"
                    >
                      Use Admin Account
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4 mt-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Teacher Studio</h3>
                      <Badge variant="default">Course Management</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create courses, manage content, grade assignments, and
                      track student progress.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Username:</strong> teacher
                      </div>
                      <div>
                        <strong>Password:</strong> teacher
                      </div>
                    </div>
                    <Button
                      onClick={() => quickLogin("teacher", "teacher")}
                      className="w-full mt-3"
                      variant="outline"
                    >
                      Use Teacher Account
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="student" className="space-y-4 mt-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Student Portal</h3>
                      <Badge variant="secondary">Learning Access</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access courses, submit assignments, take quizzes, and
                      track your progress.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Username:</strong> student
                      </div>
                      <div>
                        <strong>Password:</strong> student
                      </div>
                    </div>
                    <Button
                      onClick={() => quickLogin("student", "student")}
                      className="w-full mt-3"
                      variant="outline"
                    >
                      Use Student Account
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
