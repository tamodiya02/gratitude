"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, Settings } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/journal",
      label: "Journal",
      icon: BookOpen,
      active: pathname === "/journal" || pathname.startsWith("/journal/"),
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  // Only show the main nav on mobile, as desktop uses the sidebar
  return (
    <nav className="flex items-center space-x-4 md:hidden">
      <Link href="/dashboard" className="items-center space-x-2 flex">
        <span className="font-bold text-xl">Gratitude</span>
      </Link>
    </nav>
  )
}
