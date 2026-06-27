interface LoadingStateProps {
  steps: string[];
  currentStep: number;
}

export function LoadingState({ steps, currentStep }: LoadingStateProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl border border-border">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-red" />
        <div>
          <h3 className="text-lg font-bold text-navy">Running your AI visibility scan</h3>
          <p className="text-sm text-text-muted">This may take up to a minute.</p>
        </div>
      </div>
      <ul className="space-y-3">
        {steps.map((step, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 text-sm ${
                isDone
                  ? "text-green-600"
                  : isActive
                    ? "text-navy font-semibold"
                    : "text-text-muted"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  isDone
                    ? "bg-green-100"
                    : isActive
                      ? "bg-red/10 text-red"
                      : "bg-off"
                }`}
              >
                {isDone ? "✓" : index + 1}
              </span>
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
