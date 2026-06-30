"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";
import { ArrowIcon, LogoMark } from "@/components/landing/icons";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav${scrolled ? " scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="Calibrate Commerce home">
          <div className="logo-mark" aria-hidden="true">
            <LogoMark />
          </div>
          <div>
            <div className="logo-text">Calibrate Commerce</div>
            <div className="logo-sub">Growth Partner</div>
          </div>
        </Link>

        <div className="nav-links">
          <a href="#how">How It Works</a>
          <a href="#framework">Our Framework</a>
          <a href="#why">Why Calibrate</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-cta">
          <a
            href="#audit"
            className="btn btn-outline"
            style={{ padding: "10px 18px", fontSize: "0.83rem" }}
          >
            See How We Work
          </a>
          <OpenScoreCheckButton
            className="btn btn-red"
            style={{ padding: "10px 18px", fontSize: "0.83rem" }}
          >
            Check Your Website Score
            <ArrowIcon size={13} />
          </OpenScoreCheckButton>
        </div>
      </div>
    </nav>
  );
}
