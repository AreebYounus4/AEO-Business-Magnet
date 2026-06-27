import { z } from "zod";

export const emailAddressSchema = z
  .string()
  .trim()
  .email("Please enter a valid work email.");

export function parseEmailAddress(value: string): string {
  return emailAddressSchema.parse(value);
}
