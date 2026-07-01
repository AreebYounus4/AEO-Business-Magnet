import { z } from "zod";

export const auditBookingRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  company: z.string().trim().min(1, "Company is required."),
  email: z.string().trim().email("Please enter a valid work email."),
  website: z.string().trim().min(1, "Website is required."),
  revenue: z.string().optional(),
  market: z.string().optional(),
  challenge: z.string().trim().min(1, "Please describe your primary challenge."),
});

export type AuditBookingRequest = z.infer<typeof auditBookingRequestSchema>;
