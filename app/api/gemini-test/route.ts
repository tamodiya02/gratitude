// app/api/gemini-test/route.ts

import { NextResponse } from "next/server"
import { analyzeMoodAndTags } from "@/lib/gemini" // adjust path if needed

export async function GET() {
  const journal = "I’m feeling really tired and stressed. Exams are killing me."

  const result = await analyzeMoodAndTags(journal)

  console.log("🧠 Gemini TEST result:", result)

  return NextResponse.json(result)
}
