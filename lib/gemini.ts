import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function analyzeMoodAndTags(content: string) {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = `
You are an assistant that reads short journal entries and performs two tasks:
1. Determine the overall mood using **one emoji**, strictly from this list: 😊, 😢, 😡, 😌, 😕, 😴, 🤩, 😰
2. Extract 3 to 5 meaningful tags (as lowercase strings with no # or quotes around them)

Respond in this JSON format:
{
  "mood": "😰",
  "tags": ["stress", "exams", "overwhelmed"]
}

Journal:
"""${content}"""
`
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    })

    const response = await result.response
const text = await response.text()

console.log("🧪 Gemini raw output:", text)

const cleaned = text
  .replace(/```json/i, "")
  .replace(/```/, "")
  .trim()

const json = JSON.parse(cleaned)

return {
  mood: json.mood || "😐",
  tags: json.tags || [],
}

  } catch (err) {
    console.error("Gemini parse error:", err)
    return {
      mood: "😐",
      tags: [],
    }
  }
}
