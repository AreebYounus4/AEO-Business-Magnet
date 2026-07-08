# AEO Lead Magnet

Lead magnet and AI visibility scanner for [Calibrate Commerce](https://www.calibratecommerce.com). Visitors check how their brand appears across AI platforms, receive a scored report, and can request follow-up — with leads and scan data stored in Google Sheets.

## Features

- **AEO landing page** — Marketing site for AI Search Optimization (AEO) with score-check CTA and modal lead capture
- **AI visibility scan** — Crawls a submitted website and evaluates brand presence across enabled AI engines
- **Shareable reports** — Per-scan report pages with platform scores, findings, and recommendations
- **Multi-engine support** — OpenAI, Gemini, Perplexity, and Claude (env-toggled)
- **Google Sheets persistence** — Stores leads, scans, prompts, observations, and reports (with in-memory fallback for local dev)
- **Rate limiting** — Basic protection on scan and audit API routes
- **Noindex by default** — `robots.txt` and metadata block search engine indexing

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| Validation | Zod |
| AI | OpenAI, Google Gemini, Perplexity, Anthropic Claude |
| Storage | Google Sheets (service account) |
| Crawling | Cheerio |

## Prerequisites

- **Node.js** 20+
- **npm** 10+
- API keys for at least one enabled AI provider
- *(Optional)* Google Cloud service account with access to a Google Sheet

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/AreebYounus4/AEO-Business-Magnet.git
cd AEO-Business-Magnet
npm install
```

### 2. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

See [Environment Variables](#environment-variables) below for details.

### 3. Set up Google Sheets *(optional)*

If Google Sheets credentials are not configured, the app uses **in-memory storage** (data is lost when the server restarts).

1. Create a Google Sheet with these tabs:
   - `Leads`
   - `Scans`
   - `Prompts`
   - `AI_Observations`
   - `Reports`
2. Add header rows to each tab (matching the column order used by the repositories).
3. The `Leads` tab must include columns through `Challenge` for audit booking fields: `Company`, `Revenue`, `Market`, `Challenge`.
4. Share the sheet with your service account email as **Editor**.
5. Set `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` in `.env.local`.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Public base URL for report links |
| `AI_ENGINE_OPENAI_ENABLED` | No | `true` | Enable OpenAI engine |
| `AI_ENGINE_GEMINI_ENABLED` | No | `true` | Enable Gemini engine |
| `AI_ENGINE_PERPLEXITY_ENABLED` | No | `false` | Enable Perplexity engine |
| `AI_ENGINE_CLAUDE_ENABLED` | No | `false` | Enable Claude engine |
| `OPENAI_API_KEY` | If OpenAI enabled | — | OpenAI API key |
| `OPENAI_MODEL` | No | `gpt-4.1-mini` | OpenAI model name |
| `GEMINI_API_KEY` | If Gemini enabled | — | Google Gemini API key |
| `GEMINI_MODEL` | No | `gemini-1.5-flash` | Gemini model name |
| `PERPLEXITY_API_KEY` | If Perplexity enabled | — | Perplexity API key |
| `PERPLEXITY_MODEL` | No | `sonar` | Perplexity model name |
| `ANTHROPIC_API_KEY` | If Claude enabled | — | Anthropic API key |
| `ANTHROPIC_MODEL` | No | `claude-sonnet-4-6` | Claude model name |
| `GOOGLE_SHEET_ID` | No | — | Google Sheet ID |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | No | — | Service account email |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | No | — | Service account private key (use `\n` for newlines) |

> **Note:** If `AI_ENGINE_CLAUDE_ENABLED=true`, `ANTHROPIC_API_KEY` must be set or the server will fail to start.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/scan` | Create a visibility scan and generate a report |
| `GET` | `/api/report/[scanId]` | Fetch report JSON by scan ID |
| `POST` | `/api/audit` | Submit an AI visibility audit booking request |
| `GET` | `/api/config` | List enabled AI engines (public) |

### Example: create a scan

```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "workEmail": "jane@company.com",
    "websiteUrl": "https://example.com"
  }'
```

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages, API routes, layout)
├── application/            # Use cases, DTOs, and port interfaces
├── components/             # React UI (landing, forms, report)
├── domain/                 # Entities, value objects, domain services
├── infrastructure/         # AI providers, Google Sheets, crawler, DI
└── lib/                    # Shared utilities and errors
```

## Architecture

The codebase follows a **clean architecture** layout:

- **`domain/`** — Core business entities and rules (no framework dependencies)
- **`application/`** — Use cases and repository/provider interfaces (ports)
- **`infrastructure/`** — External integrations (AI APIs, Google Sheets, crawling)
- **`components/`** — Presentation layer (landing page, modals, report UI)

AI providers and storage backends are wired through interfaces in `application/ports/`, making them straightforward to swap or mock.

### Scan flow

1. User submits website via the lead capture modal
2. Backend crawls the site and extracts brand signals
3. Visibility prompts are generated and sent to enabled AI engines
4. Responses are evaluated and scored per platform
5. A report is persisted and a shareable URL is returned

## Deployment

This app is designed to deploy on [Vercel](https://vercel.com/) (or any Node.js host that supports Next.js).

1. Connect the GitHub repository
2. Add all required environment variables in the project settings
3. Set `NEXT_PUBLIC_APP_URL` to your production domain
4. Deploy from `master`

The site is configured as **non-crawlable** (`noindex` metadata + `robots.txt` disallow). Remove or adjust `src/app/robots.ts` and `metadata.robots` in `src/app/layout.tsx` if you want it indexed in production.

## License

Proprietary — © Calibrate Commerce. All rights reserved.
