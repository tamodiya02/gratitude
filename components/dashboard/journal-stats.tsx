import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, LineChart, Smile } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function JournalStats() {
  const session = await getServerSession(authOptions)

  // Default stats
  let stats = [
    {
      title: "Total Entries",
      value: "0",
      icon: BookOpen,
    },
    {
      title: "Most Common Mood",
      value: "None",
      icon: Smile,
    },
    {
      title: "Words Written",
      value: "0",
      icon: LineChart,
    },
  ]

  if (session?.user?.id) {
    // Get total entries
    const totalEntries = await prisma.journalEntry.count({
      where: {
        userId: session.user.id,
      },
    })

    // Get most common mood
    const moodCounts = await prisma.journalEntry.groupBy({
      by: ["mood"],
      where: {
        userId: session.user.id,
      },
      _count: {
        mood: true,
      },
      orderBy: {
        _count: {
          mood: "desc",
        },
      },
      take: 1,
    })

    // Calculate total words written
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        content: true,
      },
    })

    const totalWords = entries.reduce((acc, entry) => {
      return acc + entry.content.split(/\s+/).filter(Boolean).length
    }, 0)

    // Update stats with real data
    stats = [
      {
        title: "Total Entries",
        value: totalEntries.toString(),
        icon: BookOpen,
      },
     
      {
        title: "Most Common Mood",
        value: moodCounts.length > 0 ? moodCounts[0].mood : "None",
        icon: Smile,
      },
      {
        title: "Words Written",
        value: totalWords.toLocaleString(),
        icon: LineChart,
      },
    ]
  }

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
