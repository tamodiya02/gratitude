// components/journal/journal-entry-view.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { deleteJournalEntry } from "@/app/actions/journal"
import type { JournalEntry } from "@prisma/client"

interface JournalEntryViewProps {
  entry: JournalEntry
}

export function JournalEntryView({ entry }: JournalEntryViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const result = await deleteJournalEntry(entry.id)
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        setIsDeleting(false)
        return
      }
      
      toast({
        title: "Success",
        description: "Journal entry deleted",
      })
      
      router.push("/journal")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }
  
  return (
    <>
      <div className="flex space-x-2 mb-4">
        <Button variant="outline" asChild>
          <Link href="/journal">Back to Journal</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/journal/${entry.id}/edit`}>Edit Entry</Link>
        </Button>
        <Button variant="destructive" onClick={() => setIsDeleteAlertOpen(true)}>
          Delete
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-2xl">{entry.mood}</div>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="prose max-w-none">
            {entry.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this journal entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your journal entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}