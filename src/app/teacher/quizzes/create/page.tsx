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
  Plus,
  Trash2,
  Edit,
  Eye,
  Save,
  ArrowLeft,
  Clock,
  Award,
  FileText,
  CheckCircle,
  AlertCircle,
  Move,
  Play,
} from "lucide-react";

export default function CreateQuiz() {
  const { isAuthenticated, hasRole } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("questions");
  const [questions] = useState([
    {
      id: 1,
      type: "multiple-choice",
      question: "What is the primary purpose of JavaScript?",
      options: [
        "To create interactive web pages",
        "To manage server-side logic",
        "To style web pages",
      ],
      correctAnswer: 0,
      points: 5,
      order: 1,
    },
    {
      id: 2,
      type: "true-false",
      question: "React is a JavaScript library for building user interfaces.",
      correctAnswer: true,
      points: 3,
      order: 2,
    },
    {
      id: 3,
      type: "short-answer",
      question: "Explain the difference between props and state in React.",
      points: 10,
      order: 3,
    },
  ]);

  if (!isAuthenticated || !hasRole("teacher")) {
    router.push("/login");
    return null;
  }

  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice", icon: CheckCircle },
    { value: "true-false", label: "True/False", icon: CheckCircle },
    { value: "short-answer", label: "Short Answer", icon: FileText },
    { value: "essay", label: "Essay", icon: FileText },
    { value: "file-upload", label: "File Upload", icon: FileText },
  ];

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return <CheckCircle className="h-4 w-4" />;
      case "true-false":
        return <CheckCircle className="h-4 w-4" />;
      case "short-answer":
        return <FileText className="h-4 w-4" />;
      case "essay":
        return <FileText className="h-4 w-4" />;
      case "file-upload":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

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
                Create Quiz
              </h1>
              <p className="text-muted-foreground">
                Design and configure your quiz
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
              Save Quiz
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Questions List */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Quiz Questions</CardTitle>
                        <CardDescription>
                          Add and organize your quiz questions
                        </CardDescription>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={question.id} className="border-2">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  <Move className="h-4 w-4 text-muted-foreground cursor-move" />
                                  <Badge variant="outline">
                                    Q{question.order}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getQuestionIcon(question.type)}
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {question.type.replace("-", " ")}
                                  </span>
                                </div>
                                <Badge variant="secondary">
                                  {question.points} pts
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium mb-3">
                              {question.question}
                            </p>
                            {question.type === "multiple-choice" && (
                              <div className="space-y-2">
                                {question.options?.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="radio"
                                      checked={
                                        optIndex === question.correctAnswer
                                      }
                                      readOnly
                                    />
                                    <span
                                      className={
                                        optIndex === question.correctAnswer
                                          ? "font-medium text-green-600"
                                          : ""
                                      }
                                    >
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {question.type === "true-false" && (
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={question.correctAnswer === true}
                                    readOnly
                                  />
                                  <span
                                    className={
                                      question.correctAnswer === true
                                        ? "font-medium text-green-600"
                                        : ""
                                    }
                                  >
                                    True
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    checked={question.correctAnswer === false}
                                    readOnly
                                  />
                                  <span
                                    className={
                                      question.correctAnswer === false
                                        ? "font-medium text-green-600"
                                        : ""
                                    }
                                  >
                                    False
                                  </span>
                                </div>
                              </div>
                            )}
                            {(question.type === "short-answer" ||
                              question.type === "essay") && (
                              <div className="border rounded p-3 bg-muted/50">
                                <p className="text-sm text-muted-foreground">
                                  Student will provide a written answer
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quiz Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Questions
                      </span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Points
                      </span>
                      <span className="font-medium">{totalPoints}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Estimated Time
                      </span>
                      <span className="font-medium">15 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Question Types
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(new Set(questions.map((q) => q.type))).map(
                          (type) => (
                            <Badge
                              key={type}
                              variant="outline"
                              className="text-xs"
                            >
                              {type.replace("-", " ")}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Question Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          // Add new question logic
                        }}
                      >
                        <type.icon className="mr-2 h-4 w-4" />
                        {type.label}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiz-title">Quiz Title</Label>
                    <Input
                      id="quiz-title"
                      placeholder="Enter quiz title"
                      defaultValue="React Fundamentals Quiz"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiz-description">Description</Label>
                    <Textarea
                      id="quiz-description"
                      placeholder="Describe the quiz..."
                      rows={3}
                      defaultValue="Test your knowledge of React fundamentals including components, props, state, and lifecycle methods."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Time Limit</Label>
                      <Select defaultValue="15">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No limit</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Attempts Allowed</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 attempt</SelectItem>
                          <SelectItem value="2">2 attempts</SelectItem>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quiz Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        title="Shuffle questions"
                        type="checkbox"
                        id="shuffle-questions"
                        defaultChecked
                      />
                      <Label htmlFor="shuffle-questions">
                        Shuffle questions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        title="Show correct answers after submission"
                        type="checkbox"
                        id="show-correct-answers"
                      />
                      <Label htmlFor="show-correct-answers">
                        Show correct answers after submission
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        title="Allow backtracking"
                        type="checkbox"
                        id="allow-backtracking"
                      />
                      <Label htmlFor="allow-backtracking">
                        Allow backtracking
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        title="Enable proctoring"
                        type="checkbox"
                        id="proctored"
                      />
                      <Label htmlFor="proctored">Enable proctoring</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Passing Score (%)</Label>
                    <Input type="number" defaultValue="70" min="0" max="100" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Preview</CardTitle>
                <CardDescription>
                  Preview how your quiz will appear to students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-8 border rounded-lg">
                    <h2 className="text-2xl font-bold mb-2">
                      React Fundamentals Quiz
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Test your knowledge of React fundamentals including
                      components, props, state, and lifecycle methods.
                    </p>
                    <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>15 minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{totalPoints} points</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{questions.length} questions</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="border">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">
                              Question {index + 1}
                            </h3>
                            <Badge variant="secondary">
                              {question.points} pts
                            </Badge>
                          </div>
                          <p className="mb-4">{question.question}</p>

                          {question.type === "multiple-choice" && (
                            <div className="space-y-2">
                              {question.options?.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    title={option}
                                    type="radio"
                                    name={`q${question.id}`}
                                  />
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type === "true-false" && (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  title="True"
                                  type="radio"
                                  name={`q${question.id}`}
                                />
                                <span>True</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  title="False"
                                  type="radio"
                                  name={`q${question.id}`}
                                />
                                <span>False</span>
                              </div>
                            </div>
                          )}

                          {(question.type === "short-answer" ||
                            question.type === "essay") && (
                            <Textarea
                              placeholder="Enter your answer here..."
                              rows={3}
                            />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button size="lg">
                      <Play className="mr-2 h-4 w-4" />
                      Start Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Quiz</CardTitle>
                <CardDescription>
                  Configure publishing settings and assign to courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Publishing Checklist</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Quiz title and description</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>At least one question</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Time limit and settings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span>Assign to course</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Course Assignment</h3>
                    <div className="space-y-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-dev">
                            Web Development Fundamentals
                          </SelectItem>
                          <SelectItem value="react">Advanced React</SelectItem>
                          <SelectItem value="data-science">
                            Data Science Basics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input type="datetime-local" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button className="flex-1">Publish Quiz</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
