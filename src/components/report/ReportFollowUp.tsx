"use client";

import { ReportFollowUpModal } from "@/components/report/ReportFollowUpModal";

interface ReportFollowUpProps {
  scanId: string;
  brandName: string;
}

export function ReportFollowUp({ scanId, brandName }: ReportFollowUpProps) {
  return <ReportFollowUpModal scanId={scanId} brandName={brandName} />;
}
