"use client"

import type React from "react"
import type { JournalEntry } from "@prisma/client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoodSelector } from "@/components/journal/mood-selector"
import { TagInput } from "@/components/journal/tag-input"
import { useToast } from "@/hooks/use-toast"
import { createJournalEntry, updateJournalEntry } from "@/app/actions/journal"

interface JournalEntryFormProps {
  entry?: JournalEntry
  promptTitle?: string
}

export function JournalEntryForm({ entry, promptTitle }: JournalEntryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMood, setSelectedMood] = useState(entry?.mood || "")
  const [tags, setTags] = useState<string[]>(entry?.tags || [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.set("mood", selectedMood)
    formData.set("tags", tags.join(","))

    try {
      let result

      if (entry) {
        result = await updateJournalEntry(entry.id, formData)
      } else {
        result = await createJournalEntry(formData)
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      toast({
        title: "Success",
        description: entry ? "Journal entry updated" : "Journal entry created",
      })

      router.push(entry ? `/journal/${entry.id}` : "/journal")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={entry?.title || promptTitle}
              placeholder="Give your entry a title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>How are you feeling today?</Label>
            <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Journal Entry</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={entry?.content}
              placeholder="Write your thoughts here..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <TagInput tags={tags} setTags={setTags} />
            <p className="text-sm text-muted-foreground">Press enter to add a tag</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (entry ? "Updating..." : "Saving...") : entry ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
