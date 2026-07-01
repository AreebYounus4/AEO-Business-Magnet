import type { PlatformId } from "./logos";

export { LOGO_STRIP, CLIENT_LOGOS, CALIBRATE_LOGO } from "./logos";

export const HERO_TRUST_STATS = [
  { num: "12+", label: "Years in market" },
  { num: "80+", label: "Enterprise brands" },
  { num: "$1B+", label: "Revenue influenced" },
  { num: "6+", label: "Markets served" },
];

export const QUERY_CARDS: {
  platform: PlatformId;
  platformLabel: string;
  query: string;
  note: string;
  visible: boolean;
}[] = [
  {
    platform: "chatgpt",
    platformLabel: "ChatGPT",
    query: "Who is the best agency for SEO in the UAE?",
    note: "Your brand, not mentioned",
    visible: false,
  },
  {
    platform: "gemini",
    platformLabel: "Gemini",
    query: "What is the best CRM for real estate in Saudi Arabia?",
    note: "Your brand, not cited",
    visible: false,
  },
  {
    platform: "perplexity",
    platformLabel: "Perplexity",
    query: "What are the top ecommerce platforms for fashion brands?",
    note: "Your brand, no entity signal",
    visible: false,
  },
  {
    platform: "claude",
    platformLabel: "Claude",
    query: "Which university should I consider for an MBA in Dubai?",
    note: "Your brand, not recommended",
    visible: false,
  },
  {
    platform: "google-ai",
    platformLabel: "Google AI",
    query: "What are the top brands in this category in GCC?",
    note: "Calibrate clients, featured",
    visible: true,
  },
  {
    platform: "chatgpt",
    platformLabel: "ChatGPT",
    query: "Which delivery service is most reliable in the UAE right now?",
    note: "Your brand, not visible",
    visible: false,
  },
];

export const WIN_STEPS = [
  {
    num: "01",
    title: "Find",
    desc: "Can AI discover your brand and content? Without crawlable, indexed, well-structured content, AI platforms can't include you in answers.",
  },
  {
    num: "02",
    title: "Understand",
    desc: "Does AI accurately understand what you do and who you serve? Clear entity signals and comprehensive content enable accurate AI representation.",
  },
  {
    num: "03",
    title: "Trust",
    desc: "Do you have the authority and credibility signals AI looks for? E-E-A-T, third-party citations, and editorial coverage build AI trust.",
  },
  {
    num: "04",
    title: "Verify",
    desc: "Can AI validate your claims through trusted sources? Corroborated information from authoritative third parties strengthens your citation eligibility.",
  },
  {
    num: "05",
    title: "Recommend",
    desc: "Does your brand appear when buyers are ready to decide? The goal is to be the brand AI names when someone asks about your category.",
  },
];

export const FRAMEWORK_STEPS = [
  {
    icon: "🔍",
    num: "Step 01",
    title: "AI Visibility Audit",
    desc: "Understand how visible your brand is across ChatGPT, Gemini, Claude, Perplexity, and Google AI. We map exactly where you appear, where you're absent, and why, across every relevant query in your category.",
  },
  {
    icon: "⚙️",
    num: "Step 02",
    title: "AI Readiness Optimization",
    desc: "Improve crawlability, structured data, entity signals, and technical foundations that help AI understand your business. This is the infrastructure layer that makes everything else possible.",
  },
  {
    icon: "🏛️",
    num: "Step 03",
    title: "Authority & Citation Building",
    desc: "Strengthen the trust signals, references, and credibility indicators that influence AI recommendations. Editorial coverage, verified citations, and E-E-A-T signals that cause AI to treat your brand as authoritative.",
  },
  {
    icon: "✍️",
    num: "Step 04",
    title: "Answer Asset Creation",
    desc: "Develop content specifically designed to answer the questions your customers are asking AI. Comprehensive, structured, and authoritative content that AI platforms select when generating recommendations.",
  },
  {
    icon: "📊",
    num: "Step 05",
    title: "Visibility Monitoring",
    desc: "Track your AI visibility, recommendation presence, citation growth, and discoverability performance over time. Monthly reporting tied to business outcomes, not just presence metrics.",
  },
];

export const OUTCOMES = [
  {
    icon: "📡",
    title: "Increased AI Visibility",
    desc: "Appear more often across AI-generated answers and recommendations. When your category is searched by buyers in ChatGPT, Gemini, or Perplexity, your brand is in the response.",
  },
  {
    icon: "🎯",
    title: "More Qualified Traffic",
    desc: "Attract visitors who arrive already informed and closer to making a decision. AI-referred visitors have higher intent than typical organic traffic because they have been pre-sold by an AI recommendation.",
  },
  {
    icon: "🏆",
    title: "Stronger Brand Authority",
    desc: "Build credibility through trusted signals and authoritative references. The signals that drive AI citations also strengthen your broader brand reputation across every digital channel.",
  },
  {
    icon: "💡",
    title: "Higher-Intent Leads",
    desc: "Generate opportunities from prospects actively researching solutions. These are buyers deep in their decision process, pre-qualified by the AI that sent them to you.",
  },
  {
    icon: "📉",
    title: "Lower Acquisition Costs",
    desc: "Reduce dependency on paid channels by improving discoverability. AI visibility creates a compounding organic acquisition channel that doesn't require spend to maintain.",
  },
  {
    icon: "⭐",
    title: "Greater Brand Preference",
    desc: "Increase the likelihood that your brand is considered and selected. When AI recommends you before a buyer even searches, you've already won the consideration battle.",
  },
];

export const TRUST_STATS = [
  { num: "12+", label: "Years of growth expertise" },
  { num: "80+", label: "Enterprise brands served" },
  { num: "$1B+", label: "Revenue influenced" },
  { num: "6+", label: "Markets across GCC and beyond" },
];

export const WHY_CARDS = [
  {
    icon: "🔦",
    title: "Found",
    desc: "Across search engines, AI platforms, and emerging discovery channels. Technical infrastructure, indexation, and crawlability built to perform on every discovery surface.",
  },
  {
    icon: "🧠",
    title: "Understood",
    desc: "So AI accurately represents what you do and who you serve. Entity optimization, structured data, and content architecture that gives AI systems the context they need.",
  },
  {
    icon: "🛡️",
    title: "Trusted",
    desc: "Through evidence, authority signals, and citations. E-E-A-T development, editorial coverage, and third-party corroboration that causes AI to treat your brand as a reliable source.",
  },
  {
    icon: "🏆",
    title: "Chosen",
    desc: "When buyers are ready to act, your brand becomes the recommendation. The full framework builds toward this outcome, converting discoverability into commercial growth.",
  },
  {
    icon: "📊",
    title: "Commercially Accountable",
    desc: "Success metrics tied to revenue, qualified demand, and business outcomes. We don't sell rankings or impressions. We build measurable commercial growth from organic and AI discovery channels.",
  },
  {
    icon: "🌍",
    title: "Deep GCC Market Expertise",
    desc: "12+ years operating across UAE, Saudi Arabia, and wider GCC. We understand regional search behaviour, Arabic and English content strategy, and the competitive dynamics unique to this market.",
  },
];

export const DEMO_SIGNALS = [
  {
    icon: "🏛️",
    title: "Entity Authority",
    desc: "A clear, consistent brand entity that AI knowledge graphs recognize as authoritative within your category, the foundation of all AI citation.",
  },
  {
    icon: "📋",
    title: "Content Comprehensiveness",
    desc: "AI cites brands whose content comprehensively covers topics buyers are asking about. Thin content is invisible to AI. We engineer depth at scale.",
  },
  {
    icon: "🔗",
    title: "Third-Party Corroboration",
    desc: "Editorial coverage, reviews, and expert mentions from credible third-party sources that verify your brand's claims and strengthen citation eligibility.",
  },
  {
    icon: "🏷️",
    title: "Structured Data Signals",
    desc: "Rich schema markup that gives AI systems the context needed to accurately represent your brand, products, services, and expertise.",
  },
  {
    icon: "🎓",
    title: "E-E-A-T Demonstration",
    desc: "Experience, expertise, authoritativeness, and trustworthiness signals that cause AI platforms to treat your brand as a reliable, citable source.",
  },
];

export type FaqCategory = "all" | "aeo" | "process" | "markets";

export const FAQ_ITEMS: {
  category: Exclude<FaqCategory, "all">;
  question: string;
  answer: string;
}[] = [
  {
    category: "aeo",
    question: "What is AI Search Optimization (AEO)?",
    answer:
      "AI Search Optimization, also called Answer Engine Optimization (AEO), is the practice of optimizing your brand's content, authority signals, and entity presence so it appears in AI-generated recommendations from ChatGPT, Gemini, Claude, Perplexity, and Google AI. Unlike traditional SEO that targets ranked links, AEO focuses on making your brand recommended by AI when buyers ask for solutions in your category.",
  },
  {
    category: "aeo",
    question: "Why doesn't ranking #1 on Google mean I'm recommended by AI?",
    answer:
      "Traditional SEO was built for rankings in blue-link search results. AI search is built for answers and recommendations. AI platforms don't show websites. They synthesize information and recommend brands based on entity authority, content comprehensiveness, trusted citations, and credibility signals. A brand can rank #1 on Google and still be completely absent from AI-generated recommendations.",
  },
  {
    category: "aeo",
    question: "Which AI platforms does Calibrate Commerce optimize for?",
    answer:
      "We optimize for visibility across ChatGPT, Google Gemini, Anthropic Claude, Perplexity, and Google AI Overviews, the primary AI platforms where buying journeys now begin. Each platform has different ranking signals, content requirements, and citation criteria, and our framework addresses all of them systematically.",
  },
  {
    category: "aeo",
    question: "How does AI decide which brands to recommend?",
    answer:
      "AI recommends brands it can Find (discover your content), Understand (accurately comprehend what you do), Trust (verified authority and credibility signals), Verify (validate claims through trusted third-party sources), and Recommend (confidently present when buyers are ready to decide). Most brands are missing one or more of these signals. Our framework builds every one of them.",
  },
  {
    category: "aeo",
    question: "What is an AI Visibility Audit?",
    answer:
      "An AI Visibility Audit is our diagnostic assessment of how your brand appears, or fails to appear, across ChatGPT, Gemini, Claude, Perplexity, and Google AI. It identifies specific gaps in your entity signals, content comprehensiveness, authority citations, and structured data that prevent AI platforms from recommending your brand, and provides a prioritized action plan to close those gaps.",
  },
  {
    category: "aeo",
    question: "Do I still need traditional SEO if I invest in AEO?",
    answer:
      "Yes. Traditional search remains a significant channel, and strong technical SEO, content quality, and authority signals underpin both Google rankings and AI visibility. The most effective approach combines traditional SEO foundations with AEO-specific optimizations. Our framework addresses both simultaneously, because the signals that power AI visibility also strengthen traditional search performance.",
  },
  {
    category: "process",
    question: "How long does it take to appear in AI recommendations?",
    answer:
      "Initial improvements in AI citation signals can emerge within 6 to 12 weeks of structured optimization work. Meaningful, consistent AI recommendation presence typically builds over 3 to 6 months as entity authority and content comprehensiveness accumulate. AI platforms continuously update their knowledge, so progress is measurable and trackable. We set clear milestone expectations during onboarding and report against them monthly.",
  },
  {
    category: "process",
    question: "How do you measure AI search visibility?",
    answer:
      "We measure AI visibility through systematic query monitoring across AI platforms, tracking citation frequency, brand recommendation rate versus competitors, Share of AI Voice, Google AI Overview appearances, and correlated changes in brand search volume and direct traffic. Monthly reports tie these metrics to commercial outcomes, not just presence data.",
  },
  {
    category: "process",
    question: "What does the AI Visibility Audit booking involve?",
    answer:
      "After you submit your details, a senior Calibrate strategist will conduct a pre-call diagnostic of your brand's current visibility across key AI platforms. The audit session is a focused 45 to 60 minute conversation covering your specific visibility gaps, the most impactful opportunities in your category, and a strategic direction tailored to your commercial goals. There is no obligation and no generic pitch.",
  },
  {
    category: "process",
    question: "Do you guarantee AI search results?",
    answer:
      "No. AI platforms change their algorithms and knowledge bases continuously, and no credible partner can guarantee specific citation outcomes. What we commit to is a rigorous, transparent strategy with measurable outputs: visibility growth, citation frequency, and commercial outcomes. Our accountability model is tied to business results, not promises no one can keep.",
  },
  {
    category: "markets",
    question: "What markets does Calibrate Commerce serve?",
    answer:
      "Calibrate Commerce works with brands across UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman, the UK, Europe, and the US. We have particular depth in GCC ecommerce, retail, DTC, and enterprise brands, including bilingual Arabic and English strategy for markets where both languages drive significant search and AI discovery volume.",
  },
  {
    category: "markets",
    question: "What industries do you specialise in?",
    answer:
      "Our deepest expertise is in ecommerce, retail, DTC, and marketplace brands. We have extensive experience across fashion, electronics, food delivery and QSR, financial services, telecommunications, real estate, and B2B technology. We understand the commercial dynamics of both growth-stage and enterprise brands in regional and international markets.",
  },
];

export const AUDIT_PROMISES = [
  "Diagnostic across ChatGPT, Gemini, Claude, Perplexity & Google AI, completed before the call",
  "45 to 60 min session with a senior Calibrate strategist, not a junior account manager",
  "Clear visibility gaps, competitor citation analysis, and priority opportunities identified",
  "No obligation. No generic audit deck. A genuine strategic conversation.",
  "We respond within one business day",
];
