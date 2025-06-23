"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { analyzeMoodAndTags } from "@/lib/gemini" 

// Create a new journal entry
export async function createJournalEntry(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to create a journal entry" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    let mood = formData.get("mood") as string
    let tagsString = formData.get("tags") as string
    let tags = tagsString ? tagsString.split(",").filter(Boolean) : []

    if (!title || !content) {
      return { error: "Title and content are required" }
    }

    // 🔍 Auto-analyze mood & tags if not provided
    if (!mood || tags.length === 0) {
      const analysis = await analyzeMoodAndTags(content)
      if (!mood) mood = analysis.mood
      if (tags.length === 0) tags = analysis.tags
    }

    const entry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        mood,
        tags,
        userId: session.user.id,
      },
    })

    revalidatePath("/journal")
    revalidatePath("/dashboard")

    return { success: true, entry }
  } catch (error) {
    console.error("Error creating journal entry:", error)
    return { error: "Failed to create journal entry" }
  }
}
// Get all journal entries for the current user
export async function getJournalEntries() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return []
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return entries
  } catch (error) {
    console.error("Error fetching journal entries:", error)
    return []
  }
}

// Get recent journal entries for the current user
export async function getRecentJournalEntries(limit = 5) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return []
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return entries
  } catch (error) {
    console.error("Error fetching recent journal entries:", error)
    return []
  }
}

// Get a single journal entry by ID
export async function getJournalEntry(id: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return null
    }

    const entry = await prisma.journalEntry.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    return entry
  } catch (error) {
    console.error("Error fetching journal entry:", error)
    return null
  }
}

// Update a journal entry
export async function updateJournalEntry(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to update a journal entry" }
    }

    // Check if the entry exists and belongs to the user
    const existingEntry = await prisma.journalEntry.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingEntry) {
      return { error: "Journal entry not found or you do not have permission to update it" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const mood = formData.get("mood") as string
    const tagsString = formData.get("tags") as string
    const tags = tagsString ? tagsString.split(",").filter(Boolean) : []

    if (!title || !content) {
      return { error: "Title and content are required" }
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        mood,
        tags,
      },
    })

    revalidatePath("/journal")
    revalidatePath(`/journal/${id}`)
    revalidatePath("/dashboard")

    return { success: true, entry: updatedEntry }
  } catch (error) {
    console.error("Error updating journal entry:", error)
    return { error: "Failed to update journal entry" }
  }
}

// Delete a journal entry
export async function deleteJournalEntry(id: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to delete a journal entry" }
    }

    // Check if the entry exists and belongs to the user
    const existingEntry = await prisma.journalEntry.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingEntry) {
      return { error: "Journal entry not found or you do not have permission to delete it" }
    }

    await prisma.journalEntry.delete({
      where: {
        id,
      },
    })

    revalidatePath("/journal")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error deleting journal entry:", error)
    return { error: "Failed to delete journal entry" }
  }
}
