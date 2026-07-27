# ResearchMate.ai

ResearchMate.ai is an AI-powered research tool for discovering academic papers, saving bookmarks, and exporting citations.

## What the app does

- Search papers using OpenAlex metadata.
- Display paper title, abstract, authors, year, and citation count.
- Export citations in:
  - Harvard format
  - APA format
  - BibTeX format
  - Plain text format
- Generate AI-based paper summaries and counter-arguments.
- Save bookmarks to a local library using browser storage.
- Responsive UI for desktop and mobile.

## Project layout

- `app/` - main pages and routing
- `components/` - reusable UI components
- `services/` - OpenAlex API integration
- `types/` - TypeScript models
- `public/manifest.json` - PWA manifest
- `electron/` - Electron desktop wrapper

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- The app uses `localStorage` for bookmarks.
- The AI analysis feature uses an OpenAI API key saved in local storage as `openai_key`.
- Citation downloads now format authors and metadata more accurately.

## Repository

https://github.com/adilinekun/ResearchMate-AI

