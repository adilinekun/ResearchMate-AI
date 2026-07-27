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

### Home Page

![Home Page](screenshots/home.png)

### Search Results

![Search Results](screenshots/search-results.png)

### Paper Details

![Paper Details](screenshots/paper-details.png)

### AI Analysis

![AI Analysis](screenshots/analysis.png)

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

## Screenshots

Add screenshots to the `screenshots/` folder with these filenames, then they will display here:

- `360c85c0-7303-4a98-b75d-bd894c4b1c9a.png` — Home Page
- `acde606e-ba55-43a0-baa7-fb85e3431a91.png` — Search Results
- `1cde8943-6347-45a9-92cf-26bce713ee8e.png` — Paper Details
- `afd8611f-0b42-4b9c-a20f-16560ae40e2b.png` — AI Analysis

Click the images to open them in your browser.

![Home Page](screenshots/360c85c0-7303-4a98-b75d-bd894c4b1c9a.png)
![Search Results](screenshots/acde606e-ba55-43a0-baa7-fb85e3431a91.png)
![Paper Details](screenshots/1cde8943-6347-45a9-92cf-26bce713ee8e.png)
![AI Analysis](screenshots/afd8611f-0b42-4b9c-a20f-16560ae40e2b.png)

---

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAlex API
- OpenAI API
- Vercel

