"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import {
  ENGINE_TO_PLATFORM,
  PLATFORM_META,
  type PlatformId,
} from "@/components/landing/logos";

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  workEmail: z.string().trim().email("Please enter a valid work email."),
  phoneNumber: z.string().trim().min(1, "Phone number is required."),
  websiteUrl: z.string().trim().min(1, "Website URL is required."),
  consentAccepted: z
    .boolean()
    .refine((v) => v === true, { message: "Consent is required." }),
});

const BASE_STEPS = [
  "Validating website",
  "Scanning website content",
  "Building brand profile",
  "Generating visibility prompts",
  "Checking enabled AI engines",
  "Calculating score",
  "Preparing report",
];

const DEFAULT_PLATFORMS = ["openai", "gemini", "claude", "perplexity", "google-ai"];

function getPlatformMeta(engine: string) {
  const platformId: PlatformId =
    ENGINE_TO_PLATFORM[engine] ?? (engine as PlatformId);
  return PLATFORM_META[platformId] ?? PLATFORM_META.chatgpt;
}

interface LeadCaptureFormProps {
  variant?: "modal" | "inline";
  onClose?: () => void;
}

function ScoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a.75.75 0 00-.75.75v2.25H5.75a.75.75 0 000 1.5h2.25v.75a.75.75 0 001.5 0v-.75h.75a.75.75 0 000-1.5H9.5V6.25A.75.75 0 008 5.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LeadCaptureForm({ variant = "inline" }: LeadCaptureFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phoneNumber: "",
    websiteUrl: "",
    consentAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [enabledEngines, setEnabledEngines] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(45);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setEnabledEngines(data.enabledEngines ?? []))
      .catch(() => setEnabledEngines([]));
  }, []);

  useEffect(() => {
    if (!isSubmitting) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, BASE_STEPS.length - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  useEffect(() => {
    if (variant !== "modal" || isSubmitting) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [variant, isSubmitting]);

  const steps = BASE_STEPS.map((step) =>
    step === "Checking enabled AI engines" && enabledEngines.length > 0
      ? `Checking ${enabledEngines.join(", ")}`
      : step,
  );

  const displayPlatforms =
    enabledEngines.length > 0 ? enabledEngines : DEFAULT_PLATFORMS;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setErrors({});

    const result = formSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setCurrentStep(0);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message ?? "Scan failed. Please try again.");
      }

      router.push(data.reportUrl);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof Error ? error.message : "Scan failed. Please try again.",
      );
    }
  }

  if (isSubmitting) {
    return (
      <LoadingState
        steps={steps}
        currentStep={currentStep}
        variant={variant === "modal" ? "modal" : "default"}
      />
    );
  }

  if (variant === "modal") {
    const timerPercent = (timerSeconds / 45) * 100;

    return (
      <form onSubmit={handleSubmit} className="flex flex-col bg-white" noValidate>
        <div className="shrink-0 bg-gradient-to-br from-navy to-[#0D2545] px-7 pb-7 pt-10 sm:px-9 sm:pt-11">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-red/35 bg-red/20 px-3 py-1 text-[0.67rem] font-bold uppercase tracking-wider text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            AI Score Check · Live
          </div>
          <h3 className="mb-2 text-[clamp(1.3rem,2.5vw,1.8rem)] font-extrabold leading-tight tracking-tight text-white">
            Check Your Website&apos;s
            <br />
            AI Search Score, Free
          </h3>
          <p className="max-w-xl text-[0.88rem] leading-relaxed text-white/60">
            See exactly how your brand appears (or doesn&apos;t) across ChatGPT,
            Gemini, Claude, Perplexity &amp; Google AI in under 60 seconds.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {displayPlatforms.map((engine) => {
              const meta = getPlatformMeta(engine);
              return (
                <div
                  key={engine}
                  className="flex items-center gap-1.5 rounded-full bg-white/7 px-2.5 py-1 text-[0.68rem] font-bold text-white/70"
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded"
                    style={{ background: meta.bg }}
                  >
                    <Image
                      src={meta.logo}
                      alt=""
                      width={10}
                      height={10}
                      className="object-contain"
                    />
                  </span>
                  {meta.label}
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-[0.7rem] font-semibold text-white/45">
              <span>Complete your details to unlock your score</span>
              <span>{timerSeconds}s</span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-sm bg-white/12">
              <div
                className="h-full rounded-sm bg-red transition-[width] duration-1000 ease-linear"
                style={{ width: `${timerPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-7 sm:px-9">
          {submitError ? (
            <div className="mb-4">
              <ErrorMessage message={submitError} />
            </div>
          ) : null}

          <div className="mb-5 grid grid-cols-1 gap-x-[0.9rem] gap-y-[0.85rem] sm:grid-cols-2">
            <Input
              label="Full Name *"
              name="fullName"
              dense
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              error={errors.fullName}
              placeholder="Your full name"
              autoComplete="name"
            />
            <Input
              label="Work Email *"
              name="workEmail"
              type="email"
              dense
              value={form.workEmail}
              onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
              error={errors.workEmail}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <Input
              label="Phone Number *"
              name="phoneNumber"
              type="tel"
              dense
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              error={errors.phoneNumber}
              placeholder="+971 50 000 0000"
              autoComplete="tel"
            />
            <Input
              label="Website URL *"
              name="websiteUrl"
              dense
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              error={errors.websiteUrl}
              placeholder="yoursite.com"
              autoComplete="url"
            />

            <label className="col-span-1 flex cursor-pointer items-start gap-2 text-[0.78rem] leading-relaxed text-text-muted sm:col-span-2">
              <input
                type="checkbox"
                checked={form.consentAccepted}
                onChange={(e) =>
                  setForm({ ...form, consentAccepted: e.target.checked })
                }
                className="mt-0.5 h-[15px] w-[15px] shrink-0 accent-red"
              />
              <span>
                I agree to receive my AI visibility report and understand my data
                will be used to personalise insights for my brand.
              </span>
            </label>
            {errors.consentAccepted ? (
              <p className="col-span-1 text-[0.72rem] text-red sm:col-span-2">
                {errors.consentAccepted}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red px-5 py-[15px] text-base font-bold tracking-tight text-white transition hover:-translate-y-px hover:bg-red-dark hover:shadow-[0_8px_24px_rgba(218,48,79,0.35)]"
          >
            <ScoreIcon />
            See My AI Website Score Now
          </button>
          <p className="mt-2.5 text-center text-[0.72rem] text-text-muted">
            🔒 Your details are private and used only to generate your score report.
          </p>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-7 text-navy shadow-xl"
      noValidate
    >
      <h3 className="mb-1 text-xl font-extrabold">Get Your AI Visibility Score</h3>
      <p className="mb-6 text-sm text-text-muted">
        Free scan across enabled AI engines. Results in under a minute.
      </p>

      {submitError ? (
        <div className="mb-4">
          <ErrorMessage message={submitError} />
        </div>
      ) : null}

      <Input
        label="Full Name *"
        name="fullName"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        error={errors.fullName}
        placeholder="Your full name"
        autoComplete="name"
      />
      <Input
        label="Work Email *"
        name="workEmail"
        type="email"
        value={form.workEmail}
        onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
        error={errors.workEmail}
        placeholder="you@company.com"
        autoComplete="email"
      />
      <Input
        label="Phone Number *"
        name="phoneNumber"
        type="tel"
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        error={errors.phoneNumber}
        placeholder="+971 50 000 0000"
        autoComplete="tel"
      />
      <Input
        label="Website URL *"
        name="websiteUrl"
        value={form.websiteUrl}
        onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
        error={errors.websiteUrl}
        placeholder="yoursite.com"
        autoComplete="url"
      />

      <label className="mb-6 flex items-start gap-3 text-sm text-text-mid">
        <input
          type="checkbox"
          checked={form.consentAccepted}
          onChange={(e) =>
            setForm({ ...form, consentAccepted: e.target.checked })
          }
          className="mt-1"
        />
        <span>
          I agree to receive my AI visibility report and understand my data will
          be used to personalise insights for my brand.
        </span>
      </label>
      {errors.consentAccepted ? (
        <p className="-mt-4 mb-4 text-sm text-red">{errors.consentAccepted}</p>
      ) : null}

      <Button type="submit" className="w-full justify-center">
        See My AI Website Score Now
      </Button>
      <p className="mt-4 text-center text-xs text-text-muted">
        Your details are private and used only to generate your score report.
      </p>
    </form>
  );
}
