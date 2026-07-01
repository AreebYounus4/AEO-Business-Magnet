"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const glow = document.getElementById("cursor-glow");
    const trail = document.getElementById("cursor-trail");
    if (!glow || !trail) return;

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      glow.style.left = `${mx}px`;
      glow.style.top = `${my}px`;
    };

    const animTrail = () => {
      tx += (mx - tx) * 0.18;
      ty += (my - ty) * 0.18;
      trail.style.left = `${tx}px`;
      trail.style.top = `${ty}px`;
      frame = requestAnimationFrame(animTrail);
    };

    const hide = () => {
      glow.style.opacity = "0";
      trail.style.opacity = "0";
    };

    const show = () => {
      glow.style.opacity = "1";
      trail.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide, { passive: true });
    document.addEventListener("mouseenter", show, { passive: true });
    animTrail();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div id="cursor-glow" aria-hidden="true" />
      <div id="cursor-trail" aria-hidden="true" />
    </>
  );
}
