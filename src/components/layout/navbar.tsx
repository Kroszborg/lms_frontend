"use client";
import React from "react";
import {
  Moon,
  Sun,
  Menu,
  BookOpen,
  Users,
  Calendar,
  Bell,
  LogOut,
  User,
  Crown,
  GraduationCap,
  Settings,
  BarChart3,
  FileText,
  Target,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const getRoleIcon = () => {
    if (hasRole("admin")) return <Crown className="h-4 w-4 text-red-500" />;
    if (hasRole("teacher"))
      return <GraduationCap className="h-4 w-4 text-blue-500" />;
    return <User className="h-4 w-4 text-green-500" />;
  };

  const getRoleLabel = () => {
    if (hasRole("admin")) return "Admin";
    if (hasRole("teacher")) return "Teacher";
    return "Student";
  };

  const getDashboardPath = () => {
    if (hasRole("admin")) return "/admin";
    if (hasRole("teacher")) return "/teacher";
    return "/student";
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-bold">EduLMS</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form
              className="relative w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchTerm = formData.get("search") as string;
                if (searchTerm.trim()) {
                  router.push(
                    `/search?q=${encodeURIComponent(searchTerm.trim())}`
                  );
                }
              }}
            >
              <Input
                name="search"
                type="search"
                placeholder="Search courses, assignments..."
                className="w-full pl-10"
              />
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Navigation Links - Role-based */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-6">
                {/* Admin Navigation */}
                {hasRole("admin") && (
                  <>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/admin")}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/students")}
                    >
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/calendar")}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Calendar</span>
                    </Button>
                  </>
                )}

                {/* Teacher Navigation */}
                {hasRole("teacher") && (
                  <>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/teacher")}
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>Studio</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/students")}
                    >
                      <Users className="h-4 w-4" />
                      <span>Students</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/calendar")}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Schedule</span>
                    </Button>
                  </>
                )}

                {/* Student Navigation */}
                {hasRole("student") && (
                  <>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/student")}
                    >
                      <Target className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/calendar")}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Calendar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => router.push("/assignments")}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Assignments</span>
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Notifications - Only show when authenticated */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => router.push("/notifications")}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hover:bg-accent"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    {getRoleIcon()}
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {getRoleIcon()}
                        <span className="text-xs text-muted-foreground">
                          {getRoleLabel()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(getDashboardPath())}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {hasRole("admin") && (
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleSignIn}>Sign In</Button>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
