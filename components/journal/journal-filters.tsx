"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function JournalFilters() {
  const [search, setSearch] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize search state from URL params on component mount
  useEffect(() => {
    const queryParam = searchParams.get("query") || ""
    if (queryParam !== search) {
      setSearch(queryParam)
    }
  }, []) // Only run once on mount

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (search.trim()) {
        params.set("query", search.trim())
      } else {
        params.delete("query")
      }

      // Use replace instead of push to avoid adding to browser history with every keystroke
      router.replace(`/journal?${params.toString()}`, { scroll: false })
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [search, searchParams, router])

  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search entries by title or content"
        className="pl-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
