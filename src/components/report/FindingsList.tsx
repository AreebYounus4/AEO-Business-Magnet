export function FindingsList({ findings }: { findings: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6">
      <h2 className="mb-4 text-lg font-extrabold text-navy">Key Findings</h2>
      <ul className="space-y-3">
        {findings.map((finding) => (
          <li key={finding} className="flex gap-3 text-sm text-text-mid">
            <span className="mt-0.5 text-red">•</span>
            <span>{finding}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
