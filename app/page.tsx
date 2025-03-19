import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">Fitness Admin Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">Manage your users, groups, workouts, and trainers</p>
        <Button asChild className="mt-6">
          <Link href="/admin">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

