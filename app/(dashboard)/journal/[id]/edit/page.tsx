export const dynamic = "force-dynamic"
export const dynamicParams = true;


import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { JournalEntryForm } from "@/components/journal/journal-entry-form"

export default async function EditJournalEntryPage(props: { params: { id: string } }) {
  const { params } = props

  const session = await getServerSession(authOptions)
  if (!session) redirect("/sign-in")

  if (!params?.id || typeof params.id !== "string") redirect("/journal")

  const entry = await prisma.journalEntry.findUnique({
    where: {
      id: params.id,
      userId: session.user.id
    }
  })

  if (!entry) redirect("/journal")

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Edit Journal Entry" 
        text="Update your thoughts and feelings."
      />
      <JournalEntryForm entry={entry} />
    </DashboardShell>
  )
}
