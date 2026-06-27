# AEO Visibility Lead Magnet

Calibrate Commerce lead magnet app for AI visibility scanning. Users submit their website, the backend crawls the site, runs visibility checks across enabled AI engines, calculates scores, stores results in Google Sheets, and displays a shareable report.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Zod validation
- Google Sheets (service account)
- OpenAI, Gemini, Perplexity (env-toggled)

## Getting Started

1. Copy `.env.example` to `.env` and fill in credentials.
2. Create a Google Sheet with tabs: `Leads`, `Scans`, `Prompts`, `AI_Observations`, `Reports` (header rows per spec).
3. Share the sheet with your service account email as Editor.
4. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Google Sheets credentials, the app uses in-memory storage (reports persist for the current server process only).

## API

- `POST /api/scan` — Create scan and generate report
- `GET /api/report/[scanId]` — Fetch report JSON
- `GET /api/config` — Enabled AI engines (public)

## Architecture

Clean architecture with `domain/`, `application/`, `infrastructure/`, and `components/` layers. AI providers and Google Sheets are behind interfaces for easy replacement.
