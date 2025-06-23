// app/actions/auth.ts
"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function registerUser(formData: FormData) { /* unchanged */ }

export async function updateUserProfile(formData: FormData) {
  const userId = formData.get("userId") as string
  const name = formData.get("name") as string

  try {
    const user = await prisma.user.update({ where: { id: userId }, data: { name } })
    return { success: true, user }
  } catch (err) {
    console.error("Error updating profile:", err)
    return { error: "Failed to update profile" }
  }
}
