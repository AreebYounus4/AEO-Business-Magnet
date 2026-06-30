"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

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

interface LeadCaptureFormProps {
  variant?: "modal" | "inline";
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

  const steps = BASE_STEPS.map((step) =>
    step === "Checking enabled AI engines" && enabledEngines.length > 0
      ? `Checking ${enabledEngines.join(", ")}`
      : step,
  );

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
    return <LoadingState steps={steps} currentStep={currentStep} />;
  }

  const formClassName =
    variant === "modal"
      ? "rounded-2xl bg-white p-7 pt-12 text-navy"
      : "rounded-2xl bg-white p-7 text-navy shadow-xl";

  return (
    <form onSubmit={handleSubmit} className={formClassName} noValidate>
      {variant === "modal" ? (
        <>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red/20 bg-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            AI Score Check · Live
          </div>
          <h3 className="mb-1 text-2xl font-extrabold text-navy">
            Check Your Website&apos;s AI Search Score — Free
          </h3>
          <p className="mb-6 text-sm text-text-muted">
            See how your brand appears across enabled AI engines in under 60 seconds.
          </p>
        </>
      ) : (
        <>
          <h3 className="mb-1 text-xl font-extrabold">Get Your AI Visibility Score</h3>
          <p className="mb-6 text-sm text-text-muted">
            Free scan across enabled AI engines. Results in under a minute.
          </p>
        </>
      )}

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
