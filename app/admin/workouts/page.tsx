import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Clock, Dumbbell } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WorkoutsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Workout
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workout Programs</CardTitle>
          <CardDescription>Manage your workout programs and routines.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search workouts..." className="pl-8" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workout Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Exercises</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Full Body Blast",
                  category: "HIIT",
                  difficulty: "Intermediate",
                  duration: "45 min",
                  exercises: 12,
                },
                {
                  name: "Core Strength",
                  category: "Strength",
                  difficulty: "Beginner",
                  duration: "30 min",
                  exercises: 8,
                },
                {
                  name: "Power Yoga Flow",
                  category: "Yoga",
                  difficulty: "Intermediate",
                  duration: "60 min",
                  exercises: 15,
                },
                {
                  name: "Sprint Intervals",
                  category: "Cardio",
                  difficulty: "Advanced",
                  duration: "25 min",
                  exercises: 6,
                },
                {
                  name: "Upper Body Focus",
                  category: "Strength",
                  difficulty: "Intermediate",
                  duration: "40 min",
                  exercises: 10,
                },
              ].map((workout, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{workout.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{workout.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        workout.difficulty === "Beginner"
                          ? "secondary"
                          : workout.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {workout.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {workout.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                      {workout.exercises}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

