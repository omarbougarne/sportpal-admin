import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TrainersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Trainers</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Trainer
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Trainer Management</CardTitle>
          <CardDescription>Manage your fitness trainers and instructors.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search trainers..." className="pl-8" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trainer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Workouts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Alex Johnson",
                  email: "alex@example.com",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "AJ",
                  specialization: "HIIT",
                  workouts: 24,
                  status: "Active",
                },
                {
                  name: "Maria Garcia",
                  email: "maria@example.com",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "MG",
                  specialization: "Strength",
                  workouts: 18,
                  status: "Active",
                },
                {
                  name: "David Kim",
                  email: "david@example.com",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "DK",
                  specialization: "Yoga",
                  workouts: 15,
                  status: "Active",
                },
                {
                  name: "Sarah Williams",
                  email: "sarah@example.com",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "SW",
                  specialization: "Cardio",
                  workouts: 22,
                  status: "Inactive",
                },
                {
                  name: "James Wilson",
                  email: "james@example.com",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "JW",
                  specialization: "Strength",
                  workouts: 12,
                  status: "Active",
                },
              ].map((trainer, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={trainer.avatar} alt={trainer.name} />
                        <AvatarFallback>{trainer.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{trainer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{trainer.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trainer.specialization === "HIIT"
                          ? "hiit"
                          : trainer.specialization === "Strength"
                            ? "strength"
                            : trainer.specialization === "Yoga"
                              ? "yoga"
                              : "cardio"
                      }
                    >
                      {trainer.specialization}
                    </Badge>
                  </TableCell>
                  <TableCell>{trainer.workouts}</TableCell>
                  <TableCell>
                    <Badge variant={trainer.status === "Active" ? "success" : "destructive"}>{trainer.status}</Badge>
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

