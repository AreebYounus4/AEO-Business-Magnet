import Link from "next/link";
import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="wrap flex h-[70px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
            CC
          </div>
          <div>
            <div className="text-base font-extrabold leading-tight">Calibrate Commerce</div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-text-muted">
              AI Search Optimization
            </div>
          </div>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <a href="#problem" className="text-sm font-semibold text-text-mid hover:text-red">
            Why AEO
          </a>
          <a href="#framework" className="text-sm font-semibold text-text-mid hover:text-red">
            How it works
          </a>
          <a href="#faq" className="text-sm font-semibold text-text-mid hover:text-red">
            FAQ
          </a>
        </div>
        <OpenScoreCheckButton className="btn-red hidden text-sm md:inline-flex">
          Check Your Score
        </OpenScoreCheckButton>
      </div>
    </nav>
  );
}
