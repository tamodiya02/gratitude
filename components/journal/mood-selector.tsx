"use client"

import { Button } from "@/components/ui/button"

interface MoodSelectorProps {
  selectedMood: string
  onSelectMood: (mood: string) => void
}

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😌", label: "Calm" },
    { emoji: "🤔", label: "Thoughtful" },
    { emoji: "😴", label: "Tired" },
    { emoji: "🥳", label: "Excited" },
    { emoji: "😰", label: "Anxious" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <Button
          key={mood.emoji}
          type="button"
          variant={selectedMood === mood.emoji ? "default" : "outline"}
          className="flex items-center gap-2 h-10"
          onClick={() => onSelectMood(mood.emoji)}
        >
          <span className="text-lg">{mood.emoji}</span>
          <span>{mood.label}</span>
        </Button>
      ))}
    </div>
  )
}
