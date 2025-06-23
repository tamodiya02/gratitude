import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { getRecentJournalEntries } from "@/app/actions/journal"

export async function RecentEntries() {
  const entries = await getRecentJournalEntries(3)

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Recent Journal Entries</CardTitle>
          <CardDescription>Your latest thoughts and reflections.</CardDescription>
        </div>
        <Link href="/journal/new" className="ml-auto">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className="flex items-start space-x-4 rounded-md border p-4">
                <div className="text-2xl">{entry.mood}</div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{entry.title}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(entry.createdAt), "MMMM d, yyyy")}</p>
                  <p className="text-sm">{entry.content.substring(0, 100)}...</p>
                </div>
                <Link href={`/journal/${entry.id}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No journal entries yet.</p>
              <Link href="/journal/new" className="mt-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Entry
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/journal" className="w-full">
          <Button variant="outline" className="w-full">
            View All Entries
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
