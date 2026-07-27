# ResearchMate.ai

ResearchMate.ai is an AI-powered research assistant built with Next.js and TypeScript. It helps researchers discover academic papers, save bookmarks, generate summary insights, and export citation files in multiple reference formats.

## Key Features

- Search academic research using OpenAlex paper metadata.
- View paper details, abstract, author list, year, and citation count.
- Download citations as:
  - Harvard style
  - APA style
  - BibTeX
  - Plain text summary with abstract and metadata
- Generate AI-assisted paper analysis and counter-arguments.
- Save bookmarked papers to a local library using browser storage.
- Responsive layout for desktop and mobile screens.
- PWA-ready manifest file with icons and theme metadata.

## App Structure

- `app/`
  - `page.tsx` — Home search experience and paper results.
  - `paper/[id]/page.tsx` — Paper detail page with citation export and AI analysis.
  - `library/page.tsx` — Saved bookmarks library.
  - `reference/page.tsx` — AI reference assistant page.
  - `layout.tsx` — Root layout with global metadata and manifest linking.
- `components/`
  - `Navbar.tsx` — Navigation header.
  - `Hero.tsx` — Main homepage hero content.
  - `SearchBar.tsx` — Search input, sorting, and filter controls.
  - `PaperCard.tsx` — Search result card display.
- `services/`
  - `paperService.ts` — OpenAlex API integration and data mapping.
- `types/`
  - `paper.ts` — Paper and author TypeScript models.
- `public/manifest.json` — Progressive Web App metadata for installable behavior.
- `electron/` — Desktop wrapper files for Electron packaging.

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Environment

- `next` — App Router architecture
- `react` / `react-dom` — UI framework
- `typescript` — Static typing
- `tailwindcss` — Utility-first styling
- `lucide-react` — Icon components

## Citation Export Behavior

The paper detail page supports citation downloads with realistic formatting:

- **Harvard** — `Last, F. (Year) Title. Available from: OpenAlex.`
- **APA** — `Last, F. (Year). Title. Abstract...`
- **BibTeX** — `@article{...}` entry with title, author, year, abstract, and note.
- **Text** — simple citation summary including authors, abstract, and year.

## Deploy

This project can be deployed to Vercel, GitHub Pages, or any static-compatible hosting provider that supports Next.js.

To deploy to Vercel:

```bash
npm install -g vercel
vercel login
vercel deploy
```

## Notes

- OpenAlex is used for academic metadata; abstracts are reconstructed from the inverted index when available.
- The app stores bookmarks in `localStorage`.
- The AI analysis feature works with an OpenAI API key stored in local storage under `openai_key`.

## Repository

Source code is available at: https://github.com/adilinekun/ResearchMate-AI

