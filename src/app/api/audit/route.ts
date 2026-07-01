import { NextResponse } from "next/server";
import { auditBookingRequestSchema } from "@/application/dto/AuditBookingRequest";
import { getLeadRepository } from "@/infrastructure/di/container";
import { createLeadId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/date";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please try again later.",
        },
      },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const parsed = auditBookingRequestSchema.parse(body);
    const leadId = createLeadId();
    const now = nowIso();

    await getLeadRepository().createLead({
      id: leadId,
      scanId: `audit-${leadId}`,
      fullName: parsed.name,
      workEmail: parsed.email,
      phoneNumber: "",
      websiteUrl: parsed.website,
      brandName: parsed.company,
      company: parsed.company,
      revenue: parsed.revenue ?? "",
      market: parsed.market ?? "",
      challenge: parsed.challenge,
      enabledEngines: [],
      reportUrl: "",
      status: "audit_request",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, leadId });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_JSON",
            message: "Request body must be valid JSON.",
          },
        },
        { status: 400 },
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: error.issues[0]?.message ?? "Invalid request.",
          },
        },
        { status: 400 },
      );
    }

    console.error("Audit booking failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "AUDIT_BOOKING_FAILED",
          message: "Unable to submit your request. Please try again.",
        },
      },
      { status: 500 },
    );
  }
}
