"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateUserProfile } from "@/app/actions/auth"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function SettingsForm() {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState(session?.user?.name || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    setIsSaving(true)
    const fd = new FormData()
    fd.set("userId", userId)
    fd.set("name", name)

    const res = await updateUserProfile(fd)

    if (!("error" in res)) {
      toast({ title: "Profile updated!" })
      router.refresh()
    } else {
      toast({ title: "Error", description: res.error, variant: "destructive" })
    }
    setIsSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={session?.user?.email || ""} disabled />
      </div>

      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}
