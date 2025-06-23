import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create a test user if it doesn't exist
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      settings: {
        create: {
          reminderTime: "20:00",
          dailyPromptsEnabled: true,
          weeklyEmailEnabled: true,
          aiAnalysisEnabled: true,
          theme: "system",
        },
      },
    },
  })

  console.log(`Created user: ${user.name} (${user.email})`)

  // Create some sample journal entries
  const entries = [
    {
      title: "First day of journaling",
      content:
        "Today I started using this journal app and I'm excited to document my thoughts and feelings. I hope this helps me become more mindful and Gratitude.",
      mood: "😊",
      tags: ["beginning", "excited", "mindfulness"],
      userId: user.id,
    },
    {
      title: "Productive workday",
      content:
        "I managed to complete all my tasks today and even had time to start on a new project. Feeling accomplished and motivated to keep up this momentum.",
      mood: "🚀",
      tags: ["work", "productivity", "accomplishment"],
      userId: user.id,
    },
    {
      title: "Reflecting on goals",
      content:
        "Spent some time thinking about my long-term goals today. I need to be more intentional about working towards them each day. Maybe I should create a vision board.",
      mood: "🤔",
      tags: ["goals", "reflection", "planning"],
      userId: user.id,
    },
  ]

  for (const entry of entries) {
    const result = await prisma.journalEntry.create({
      data: entry,
    })
    console.log(`Created journal entry: ${result.title}`)
  }

  console.log("Database seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
