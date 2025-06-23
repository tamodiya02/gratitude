export const dynamic = "force-dynamic"
export const dynamicParams = true

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { JournalEntryView } from "@/components/journal/journal-entry-view"

interface Props {
  params: { id: string }
}

export default async function JournalEntryPage(props: Props) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/sign-in")

  const id = props.params.id

  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!entry) redirect("/journal")

  return (
    <DashboardShell>
      <DashboardHeader
        heading={entry.title}
        text={`Created on ${new Date(entry.createdAt).toLocaleDateString()}`}
      />
      <JournalEntryView entry={entry} />
    </DashboardShell>
  )
}
