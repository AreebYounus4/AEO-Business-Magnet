import logoData from "./logo-data.json";

export type PlatformId =
  | "chatgpt"
  | "gemini"
  | "claude"
  | "perplexity"
  | "google-ai";

export const PLATFORM_META: Record<
  PlatformId,
  { label: string; bg: string; logo: string }
> = {
  chatgpt: {
    label: "ChatGPT",
    bg: "#10A37F",
    logo: "/logos/platforms/chatgpt.svg",
  },
  gemini: {
    label: "Gemini",
    bg: "#131314",
    logo: "/logos/platforms/gemini.svg",
  },
  claude: {
    label: "Claude",
    bg: "#D97757",
    logo: "/logos/platforms/claude.svg",
  },
  perplexity: {
    label: "Perplexity",
    bg: "#20808D",
    logo: "/logos/platforms/perplexity.svg",
  },
  "google-ai": {
    label: "Google AI",
    bg: "#4285F4",
    logo: "/logos/platforms/google-ai.svg",
  },
};

export const ENGINE_TO_PLATFORM: Record<string, PlatformId> = {
  openai: "chatgpt",
  gemini: "gemini",
  claude: "claude",
  perplexity: "perplexity",
};

export const LOGO_STRIP = logoData.strip;
export const CLIENT_LOGOS = logoData.clients;

export const CALIBRATE_LOGO = "/logos/calibrate-commerce.svg";
