// app/layout.tsx
"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // ✅ only import CSS here
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  // ✅ Now includes all dashboard subpages: /dashboard, /journal, /settings
  const isDashboardRoute =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/journal") ||
    pathname?.startsWith("/settings")

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            
            {/* ✅ Show public navbar only on non-dashboard routes */}
            {!isDashboardRoute && (
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                  <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                      <span className="font-bold text-3xl">Gratitude</span>
                    </Link>
                  </div>
                  <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                      <Link href="/about"><Button variant="ghost">About</Button></Link>
                      <Link href="/contact"><Button variant="ghost">Contact</Button></Link>
                      <Link href="/sign-in"><Button variant="ghost">Sign In</Button></Link>
                      <Link href="/sign-up"><Button>Get Started</Button></Link>
                    </nav>
                  </div>
                </div>
              </header>
            )}

            {/* ✅ Actual page content */}
            <main className="flex-1">{children}</main>

            {/* ✅ Public footer only on non-dashboard routes */}
            {!isDashboardRoute && (
              <footer className="w-full border-t py-6">
                <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                  <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Gratitude. All rights reserved.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Terms</Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Privacy</Link>
                  </div>
                </div>
              </footer>
            )}

            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
