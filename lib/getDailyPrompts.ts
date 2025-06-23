// lib/getDailyPrompt.ts
import { prompts } from './prompt';
import { getDayOfYear } from './dateUtils';

export function getDailyPrompt(): string {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const index = dayOfYear % prompts.length;
  return prompts[index];
}
