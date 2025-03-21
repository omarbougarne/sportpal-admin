import Link from "next/link"
import { Home, Users, Dumbbell, BarChart, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <SidebarLink href="/admin" icon={<Home size={20} />} label="Dashboard" />
          <SidebarLink href="/admin/users" icon={<Users size={20} />} label="Users" />
          <SidebarLink href="/admin/workouts" icon={<Dumbbell size={20} />} label="Workouts" />
          <SidebarLink href="/admin/groups" icon={<BarChart size={20} />} label="Groups" />
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}

// Sidebar link component
function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}