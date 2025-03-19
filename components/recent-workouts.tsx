import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentWorkouts = [
  {
    id: 1,
    name: "HIIT Cardio Blast",
    trainer: "Alex Johnson",
    trainerAvatar: "/placeholder.svg?height=32&width=32",
    trainerInitials: "AJ",
    category: "HIIT",
    created: "2 hours ago",
  },
  {
    id: 2,
    name: "Strength Foundation",
    trainer: "Maria Garcia",
    trainerAvatar: "/placeholder.svg?height=32&width=32",
    trainerInitials: "MG",
    category: "Strength",
    created: "Yesterday",
  },
  {
    id: 3,
    name: "Yoga Flow",
    trainer: "David Kim",
    trainerAvatar: "/placeholder.svg?height=32&width=32",
    trainerInitials: "DK",
    category: "Yoga",
    created: "2 days ago",
  },
  {
    id: 4,
    name: "Sprint Intervals",
    trainer: "Sarah Williams",
    trainerAvatar: "/placeholder.svg?height=32&width=32",
    trainerInitials: "SW",
    category: "Cardio",
    created: "3 days ago",
  },
]

export function RecentWorkouts() {
  return (
    <div className="space-y-8">
      {recentWorkouts.map((workout) => (
        <div key={workout.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={workout.trainerAvatar} alt={workout.trainer} />
            <AvatarFallback>{workout.trainerInitials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{workout.name}</p>
            <p className="text-sm text-muted-foreground">by {workout.trainer}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <Badge variant="outline">{workout.category}</Badge>
            <p className="text-xs text-muted-foreground">{workout.created}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

