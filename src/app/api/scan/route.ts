import { NextResponse } from "next/server";
import { createScanRequestSchema } from "@/application/dto/CreateScanRequest";
import { getCreateScanUseCase } from "@/infrastructure/di/container";
import { AppError } from "@/lib/errors/AppError";
import { ValidationError } from "@/lib/errors/ValidationError";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { ZodError } from "zod";

export const maxDuration = 300;

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
    const parsed = createScanRequestSchema.parse(body);
    const result = await getCreateScanUseCase().execute(parsed);

    return NextResponse.json({
      success: true,
      scanId: result.scanId,
      reportUrl: result.reportUrl,
      partialResults: result.partialResults ?? false,
    });
  } catch (error) {
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

    if (error instanceof ValidationError || error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: error.statusCode },
      );
    }

    console.error("Scan failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SCAN_FAILED",
          message: "Unable to complete scan. Please try again.",
        },
      },
      { status: 500 },
    );
  }
}
