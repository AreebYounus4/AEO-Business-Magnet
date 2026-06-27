export function RecommendationsList({
  recommendations,
}: {
  recommendations: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-6">
      <h2 className="mb-4 text-lg font-extrabold text-navy">Recommended Actions</h2>
      <ol className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={rec} className="flex gap-3 text-sm text-text-mid">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-xs font-bold text-red">
              {index + 1}
            </span>
            <span>{rec}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
