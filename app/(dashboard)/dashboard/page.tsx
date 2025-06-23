// app/(dashboard)/dashboard/page.tsx
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { JournalStats } from "@/components/dashboard/journal-stats"
import { RecentEntries } from "@/components/dashboard/recent-entries"
import { DailyPrompt } from "@/components/dashboard/daily-prompt"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <>
      {/* Dashboard header */}
      <DashboardHeader 
        heading="Dashboard"
        text="View your journaling stats and recent entries."
      />

      {/* Journal statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <JournalStats />
      </div>

      {/* Recent entries + daily prompt */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RecentEntries />
        </div>
        <div className="col-span-3">
          <DailyPrompt />
        </div>
      </div>
    </>
  )
}
