import type { Lead, UpdateLeadScoreInput } from "@/domain/entities/Lead";

export interface LeadRepository {
  createLead(lead: Lead): Promise<void>;
  updateLeadScore(input: UpdateLeadScoreInput): Promise<void>;
}
