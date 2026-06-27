import { z } from "zod";

export const createScanRequestSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  workEmail: z.string().trim().email("Please enter a valid work email."),
  phoneNumber: z.string().trim().min(1, "Phone number is required."),
  websiteUrl: z.string().trim().min(1, "Website URL is required."),
  consentAccepted: z
    .boolean()
    .refine((v) => v === true, { message: "Consent is required." }),
});

export type CreateScanRequest = z.infer<typeof createScanRequestSchema>;

export interface CreateScanResponse {
  success: true;
  scanId: string;
  reportUrl: string;
}

export interface CreateScanErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
