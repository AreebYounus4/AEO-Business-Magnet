"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { LeadCaptureModal } from "./LeadCaptureModal";

interface ScoreCheckContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ScoreCheckContext = createContext<ScoreCheckContextValue | null>(null);

export function ScoreCheckProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    window.requestAnimationFrame(() => trigger?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <ScoreCheckContext.Provider value={{ open, close, isOpen }}>
      {children}
      <LeadCaptureModal open={isOpen} onClose={close} />
    </ScoreCheckContext.Provider>
  );
}

export function useScoreCheck() {
  const ctx = useContext(ScoreCheckContext);
  if (!ctx) {
    throw new Error("useScoreCheck must be used within ScoreCheckProvider");
  }
  return ctx;
}

interface OpenScoreCheckButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onOpen?: () => void;
}

export function OpenScoreCheckButton({
  children,
  className = "btn btn-red",
  style,
  onOpen,
}: OpenScoreCheckButtonProps) {
  const { open } = useScoreCheck();

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        onOpen?.();
        open();
      }}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}
