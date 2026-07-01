"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";
import { ArrowIcon } from "@/components/landing/icons";
import { CALIBRATE_LOGO } from "@/components/landing/logos";

const NAV_LINKS = [
  { href: "#how", label: "How It Works" },
  { href: "#framework", label: "Our Framework" },
  { href: "#why", label: "Why Calibrate" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    const firstLink = menuRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      className={`nav${scrolled ? " scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="Calibrate Commerce home">
          <Image
            src={CALIBRATE_LOGO}
            alt=""
            width={140}
            height={32}
            className="nav-logo-img"
            style={{ width: "auto", height: 32 }}
            priority
          />
        </Link>

        <div className="nav-links" aria-label="Section links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-cta">
          <a
            href="#how"
            className="btn btn-outline nav-cta-secondary"
          >
            See How We Work
          </a>
          <OpenScoreCheckButton className="btn btn-red nav-cta-primary">
            <span className="nav-cta-label-full">Check Your Website Score</span>
            <span className="nav-cta-label-short">Check Score</span>
            <ArrowIcon size={13} />
          </OpenScoreCheckButton>

          <button
            ref={toggleRef}
            type="button"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-menu-icon" aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          ref={menuRef}
          className="nav-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="nav-mobile-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-mobile-actions">
            <a href="#how" className="btn btn-outline" onClick={closeMenu}>
              See How We Work
            </a>
            <OpenScoreCheckButton
              className="btn btn-red"
              onOpen={closeMenu}
            >
              Check Your Website Score
              <ArrowIcon size={13} />
            </OpenScoreCheckButton>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
