"use client";

export function ReportDownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-red no-print"
    >
      Download / Print Report
    </button>
  );
}
