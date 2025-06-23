import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to search journal entries" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get("query") || ""

    // Fix: Declare the query object correctly
    const query = {
      where: {
        userId: session.user.id,
        ...(searchQuery
          ? {
              OR: [
                {
                  title: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  content: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    }

    // Now using the `query` variable in the findMany function
    const entries = await prisma.journalEntry.findMany(query)

    return NextResponse.json({ entries })
  } catch (error) {
    console.error("Error searching journal entries:", error)
    return NextResponse.json(
      { error: "Failed to search journal entries" },
      { status: 500 }
    )
  }
}
