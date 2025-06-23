import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { JournalEntryForm } from "@/components/journal/journal-entry-form"

interface Props {
  searchParams: { prompt?: string }
}

export default async function NewJournalEntryPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="New Journal Entry" text="Write a new journal entry for today." />
      <JournalEntryForm promptTitle={searchParams.prompt} />
    </DashboardShell>
  )
}
