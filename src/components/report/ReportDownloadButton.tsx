"use client";

export function ReportDownloadButton() {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="btn btn-red no-print"
      aria-label="Print or save report as PDF"
    >
      Print / Save PDF
    </button>
  );
}
