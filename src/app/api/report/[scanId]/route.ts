import { NextResponse } from "next/server";
import { getReportRepository } from "@/infrastructure/di/container";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ scanId: string }> },
) {
  const { scanId } = await params;
  const report = await getReportRepository().getReportByScanId(scanId);

  if (!report) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Report not found.",
        },
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    scanId: report.scanId,
    brandName: report.brandName,
    websiteUrl: report.websiteUrl,
    overallScore: report.overallScore,
    scoreBand: report.scoreBand,
    enabledEngines: report.enabledEngines,
    platformScores: report.platformScores,
    keyFindings: report.keyFindings,
    recommendations: report.recommendations,
    partialResults: report.partialResults ?? false,
    generatedAt: report.generatedAt,
  });
}
