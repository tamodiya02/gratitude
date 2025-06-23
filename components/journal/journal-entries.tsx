"use client"

import Link from "next/link"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

// Define the type for journal entries
interface JournalEntry {
  id: string
  title: string
  content: string
  createdAt: string
  mood?: string
  tags?: string[]
}

export function JournalEntries() {
  // Initialize with proper type
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true)
      
      try {
        // Use the search API endpoint with the current search parameters
        const response = await fetch(`/api/journal/search?${searchParams.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch journal entries')
        }
        
        const data = await response.json()
        setEntries(data.entries)
      } catch (err) {
        console.error("Error fetching journal entries:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [searchParams]) // Re-fetch when search params change

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>All Journal Entries</CardTitle>
          <CardDescription>Browse through your past reflections and thoughts.</CardDescription>
        </div>
        <Link href="/journal/new" className="ml-auto">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading entries...</p>
          </div>
        ) : entries.length > 0 ? (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="flex flex-col space-y-3 rounded-lg border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {entry.mood && <div className="text-2xl">{entry.mood}</div>}
                    <h3 className="font-semibold">{entry.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(entry.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
                <p>{entry.content.substring(0, 150)}...</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex justify-end">
                  <Link href={`/journal/${entry.id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No journal entries found.</p>
            <Link href="/journal/new" className="mt-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Entry
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}