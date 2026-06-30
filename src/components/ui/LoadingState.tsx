interface LoadingStateProps {
  steps: string[];
  currentStep: number;
  variant?: "default" | "modal";
}

export function LoadingState({
  steps,
  currentStep,
  variant = "default",
}: LoadingStateProps) {
  if (variant === "modal") {
    return (
      <div className="flex min-h-[420px] flex-col overflow-hidden bg-white">
        <div className="shrink-0 bg-gradient-to-br from-navy to-[#0D2545] px-9 py-8">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-red/35 bg-red/20 px-3 py-1 text-[0.67rem] font-bold uppercase tracking-wider text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            Scanning · Live
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Running your AI visibility scan
          </h3>
          <p className="mt-2 text-sm text-white/60">
            This may take up to a minute.
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-9 py-10">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-[3px] border-border border-t-red" />
          <p className="text-sm font-semibold text-text-muted">
            {steps[currentStep] ?? "Preparing report"}
          </p>
        </div>
        <div className="border-t border-border px-9 py-6">
          <ul className="grid gap-2 sm:grid-cols-2">
            {steps.map((step, index) => {
              const isDone = index < currentStep;
              const isActive = index === currentStep;
              return (
                <li
                  key={step}
                  className={`flex items-center gap-2.5 text-sm ${
                    isDone
                      ? "text-green-600"
                      : isActive
                        ? "font-semibold text-navy"
                        : "text-text-muted"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      isDone
                        ? "bg-green-100"
                        : isActive
                          ? "bg-red/10 text-red"
                          : "bg-off"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </span>
                  <span className="truncate">{step}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-8 shadow-xl">
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
