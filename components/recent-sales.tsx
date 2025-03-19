import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${i + 1}`} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Customer {i + 1}</p>
            <p className="text-sm text-muted-foreground">customer{i + 1}@example.com</p>
          </div>
          <div className="ml-auto font-medium">+${(Math.random() * 1000).toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

