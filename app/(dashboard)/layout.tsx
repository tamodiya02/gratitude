// app/(dashboard)/layout.tsx
import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  return <DashboardShell>{children}</DashboardShell>
}
