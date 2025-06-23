import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getDailyPrompt } from "@/lib/getDailyPrompts";

export function DailyPrompt() {
  const prompt = getDailyPrompt();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          Daily Prompt
        </CardTitle>
        <CardDescription>A thought-provoking question to inspire your journaling.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium italic">"{prompt}"</p>
      </CardContent>
      <CardFooter>
        <Link href={`/journal/new?prompt=${encodeURIComponent(prompt)}`} className="w-full">
          <Button className="w-full">Write About This</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}