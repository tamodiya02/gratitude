import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { JournalEntries } from "@/components/journal/journal-entries"
import { JournalFilters } from "@/components/journal/journal-filters"

export default async function JournalPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Journal" text="View and manage your journal entries." />
      <div className="space-y-4">
        <JournalFilters />
        <JournalEntries />
      </div>
    </DashboardShell>
  )
}
