import Link from "next/link";
import { getReportRepository } from "@/infrastructure/di/container";
import { ScoreCheckProvider } from "@/components/forms/ScoreCheckContext";
import { ScoreSummary } from "@/components/report/ScoreSummary";
import { PlatformScoreCard } from "@/components/report/PlatformScoreCard";
import { FindingsList } from "@/components/report/FindingsList";
import { RecommendationsList } from "@/components/report/RecommendationsList";
import { ReportDownloadButton } from "@/components/report/ReportDownloadButton";
import { ReportFollowUp } from "@/components/report/ReportFollowUp";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ scanId: string }>;
}) {
  const { scanId } = await params;
  const report = await getReportRepository().getReportByScanId(scanId);

  if (!report) {
    return (
      <ScoreCheckProvider>
        <div className="min-h-screen bg-off">
          <SiteNav />
          <main className="wrap py-20 text-center">
            <h1 className="mb-4 text-2xl font-extrabold text-navy">Report not found</h1>
            <p className="mb-6 text-text-muted">
              This report may have expired or the scan ID is invalid.
            </p>
            <Link href="/" className="btn-red">
              Back to Home
            </Link>
          </main>
          <SiteFooter />
        </div>
      </ScoreCheckProvider>
    );
  }

  return (
    <ScoreCheckProvider>
      <div className="min-h-screen bg-off">
      <div className="no-print">
        <SiteNav />
      </div>
      <main className="wrap space-y-6 py-10">
        <div className="no-print flex justify-end">
          <ReportDownloadButton />
        </div>

        <ScoreSummary
          overallScore={report.overallScore}
          scoreBand={report.scoreBand}
          brandName={report.brandName}
          websiteUrl={report.websiteUrl}
          generatedAt={report.generatedAt}
        />

        {report.partialResults ? (
          <div className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
            Some checks could not be completed. The score is based on successfully
            completed engines.
          </div>
        ) : null}

        <section>
          <h2 className="mb-4 text-xl font-extrabold text-navy">Platform Scores</h2>
          <PlatformScoreCard platformScores={report.platformScores} />
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <FindingsList findings={report.keyFindings} />
          <RecommendationsList recommendations={report.recommendations} />
        </div>

        <div className="rounded-lg border border-border bg-white p-5 text-xs text-text-muted">
          <strong className="text-navy">Disclaimer:</strong> This report is a
          directional diagnostic based on automated AI visibility checks at the time
          of scanning. Scores reflect observed AI responses and should be used as
          a starting point for strategic optimisation, not as a guarantee of future
          visibility.
        </div>
      </main>
      <div className="no-print">
        <SiteFooter />
      </div>
      <ReportFollowUp scanId={scanId} brandName={report.brandName} />
    </div>
    </ScoreCheckProvider>
  );
}
