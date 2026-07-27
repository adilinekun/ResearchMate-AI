# ResearchMate.ai

ResearchMate.ai is an AI-powered research tool for discovering academic papers, saving bookmarks, generating AI-powered insights, and exporting citations.

## Live Demo

🔗 **Deployment:** https://research-mate-ai-v5nc.vercel.app/

🔗 **GitHub Repository:** https://github.com/adilinekun/ResearchMate-AI

---

## What the app does

- Search research papers using OpenAlex metadata.
- Display paper title, abstract, authors, publication year, and citation count.
- Export citations in:
  - Harvard
  - APA
  - BibTeX
  - Plain Text
- Generate AI-powered:
  - Paper summaries
  - Critical analysis
  - Counter-arguments
- Save bookmarks using browser local storage.
- Responsive design for desktop and mobile devices.

---

## Screenshots

### 🏠 Home Page

<p align="center">
  <img src="./screenshots/Home page.png" alt="Home Page" width="900"/>
</p>

---

### 🔍 Paper Search

<p align="center">
  <img src="./screenshots/paper search.png" alt="Paper Search" width="900"/>
</p>

---

### 📄 Paper Details

<p align="center">
  <img src="./screenshots/Paper detail.png" alt="Paper Details" width="900"/>
</p>

---

### 🤖 AI Analysis

<p align="center">
  <img src="./screenshots/AI Analysis.png" alt="AI Analysis" width="900"/>
</p>
---

## Project Structure

```
app/                 Main pages and routing
components/          Reusable UI components
services/            OpenAlex API integration
types/               TypeScript interfaces
public/manifest.json Progressive Web App manifest
electron/            Electron desktop wrapper
```

---

## Running the Project

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Troubleshooting

If `next: command not found` appears:

```bash
npm install
```

If PowerShell blocks npm or Next.js scripts on Windows:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Notes

- Uses OpenAlex for research paper discovery.
- Stores bookmarks using browser localStorage.
- AI features require an OpenAI API key stored as `openai_key` in local storage.
- Supports multiple citation formats.
- Citation downloads now format authors and metadata more accurately.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAlex API
- OpenAI API
- Vercel

