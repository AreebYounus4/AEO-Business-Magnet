import type { BrandProfile } from "../entities/BrandProfile";
import type { VisibilityPrompt } from "../entities/VisibilityPrompt";
import type { PromptCategory } from "../enums";
import { wordCount } from "@/lib/utils/text";
import { createPromptId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/date";

const CATEGORY_DISTRIBUTION: PromptCategory[] = [
  "category_discovery",
  "category_discovery",
  "problem_solution",
  "problem_solution",
  "commercial_investigation",
  "commercial_investigation",
  "reputation_branded",
  "transactional",
];

function buildPrompt(
  scanId: string,
  category: PromptCategory,
  prompt: string,
): VisibilityPrompt {
  return {
    id: createPromptId(),
    scanId,
    category,
    prompt,
    createdAt: nowIso(),
  };
}

function isValidPrompt(prompt: string): boolean {
  const count = wordCount(prompt);
  return count >= 7 && count <= 25;
}

export function generateVisibilityPrompts(
  scanId: string,
  profile: BrandProfile,
): VisibilityPrompt[] {
  const industry = profile.industry || "this industry";
  const market = profile.primaryMarket || "the market";
  const service = profile.productsOrServices[0] || "relevant services";
  const problem = profile.customerProblems[0] || "common business challenges";
  const brand = profile.brandName;

  const candidates = [
    `What are the best ${industry} companies in ${market}?`,
    `Who are leading providers of ${service} in ${market}?`,
    `How do businesses solve ${problem} effectively?`,
    `What solutions help with ${problem} for growing companies?`,
    `Which ${industry} brands are most trusted in ${market}?`,
    `Compare top options for ${service} in ${market}.`,
    `Is ${brand} a good choice for ${service}?`,
    `Where can I buy or hire ${service} from a reputable provider?`,
  ];

  const prompts: VisibilityPrompt[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < CATEGORY_DISTRIBUTION.length; i++) {
    const category = CATEGORY_DISTRIBUTION[i];
    let prompt = candidates[i];

    if (!isValidPrompt(prompt)) {
      prompt = `Who offers the best ${service} solutions in ${market}?`;
    }

    const key = prompt.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    prompts.push(buildPrompt(scanId, category, prompt));
  }

  while (prompts.length < 8) {
    const filler = `What should I know before choosing a ${industry} provider?`;
    if (!seen.has(filler.toLowerCase())) {
      prompts.push(
        buildPrompt(scanId, "commercial_investigation", filler),
      );
      seen.add(filler.toLowerCase());
    } else {
      break;
    }
  }

  const nonBranded = prompts.filter(
    (p) => !p.prompt.toLowerCase().includes(brand.toLowerCase()),
  ).length;

  if (nonBranded < 4 && prompts.length >= 4) {
    const brandedIndex = prompts.findIndex((p) =>
      p.prompt.toLowerCase().includes(brand.toLowerCase()),
    );
    if (brandedIndex >= 0) {
      prompts[brandedIndex] = buildPrompt(
        scanId,
        prompts[brandedIndex].category,
        `What criteria matter when selecting ${service} providers?`,
      );
    }
  }

  return prompts.slice(0, 8);
}
