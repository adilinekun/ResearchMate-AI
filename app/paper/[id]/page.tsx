"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Loader2, Download } from "lucide-react";
import Link from "next/link";
import { getPaperById } from "@/services/paperService";
import { Paper } from "@/types/paper";
import Navbar from "@/components/Navbar";

const SYSTEM_PROMPT = `You are an expert academic peer reviewer. Analyze the paper and generate counter-arguments, weaknesses, and opposing search terms. Format with emojis: 📋 PAPER SUMMARY, 🔑 KEY CLAIMS, ⚠️ WEAKNESSES (🔴High 🟡Medium 🟢Low), 💡 COUNTER-ARGUMENTS (numbered), 🔍 SUGGESTED SEARCH TERMS.`;

function downloadTextFile(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function buildCitation(paper: Paper, format: "apa" | "bibtex" | "txt" | "harvard") {
  const authorList = paper.authors.map((a) => a.name).join(", ");
  const year = paper.year ?? "n.d.";
  const title = paper.title;
  const citations = paper.citationCount;

  switch (format) {
    case "apa":
      return `${authorList} (${year}). ${title}. ${citations} citations.`;
    case "bibtex":
      return `@article{${paper.id},\n  title={${title}},\n  author={${authorList}},\n  year={${year}},\n  note={${citations} citations}\n}`;
    case "harvard":
      return `${authorList} (${year}) ${title}. ${citations} citations.`;
    case "txt":
    default:
      return `${authorList} (${year}). ${title}. Citations: ${citations}.`;
  }
}

export default function PaperPage() {
  const { id } = useParams() as { id: string };
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    setApiKey(localStorage.getItem("openai_key") || "");
    if (id) getPaperById(id).then(setPaper).finally(() => setLoading(false));
  }, [id]);

  const analyze = async () => {
    if (!paper) return;
    setAnalyzing(true);
    const prompt = `Title: ${paper.title}\nAbstract: ${paper.abstract}\nAuthors: ${paper.authors.map(a => a.name).join(", ")}\nYear: ${paper.year}\n\nAnalyze and generate counter-arguments.`;

    try {
      if (apiKey) {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: prompt }], temperature: 0.7, max_tokens: 2000 }),
        });
        const data = await res.json();
        setAnalysis(data.choices?.[0]?.message?.content || "No analysis.");
      } else {
        await new Promise(r => setTimeout(r, 1500));
        setAnalysis(`📋 PAPER SUMMARY\n"${paper.title}" presents research with notable contributions but several methodological concerns limit its conclusions.\n\n🔑 KEY CLAIMS\n• Claims novel findings without addressing contradictory evidence\n• Generalizes results beyond the studied sample\n\n⚠️ WEAKNESSES\n🔴 High: Small sample size limits statistical power\n🟡 Medium: Potential selection bias in methodology\n🟢 Low: Findings may not apply to broader contexts\n\n💡 COUNTER-ARGUMENTS\n1. Methodological Limitations\n   The study lacks sufficient controls. Without RCTs or longitudinal data, causal claims are speculative.\n\n2. Overgeneralization\n   Results from one population/setting may not transfer. Ecological validity is questionable.\n\n3. Confounding Variables\n   Socioeconomic status, prior knowledge, and environmental factors are not adequately controlled.\n\n🔍 SUGGESTED SEARCH TERMS\n• "${paper.title.split(" ").slice(0, 3).join(" ")} limitations"\n• "${paper.title.split(" ").slice(0, 3).join(" ")} criticism"\n• "meta-analysis ${paper.fieldsOfStudy?.[0] || "this topic"}"`);
      }
    } catch {
      setAnalysis("Error. Check API key.");
    } finally {
      setAnalyzing(false);
    }
  };

  const download = () => {
    if (!analysis || !paper) return;
    const fileName = `analysis-${paper.title.slice(0, 30).replace(/\s+/g, "-")}.txt`;
    downloadTextFile(analysis, fileName);
  };

  const downloadCitation = (format: "apa" | "bibtex" | "txt" | "harvard") => {
    if (!paper) return;
    const content = buildCitation(paper, format);
    const extension = format === "bibtex" ? "bib" : format;
    const fileName = `citation-${paper.title.slice(0, 30).replace(/\s+/g, "-")}.${extension}`;
    downloadTextFile(content, fileName);
  };

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><Loader2 className="w-10 h-10 text-sky-500 animate-spin" /></div>;
  if (!paper) return <div className="min-h-screen bg-gray-900 text-white p-8">Paper not found. <Link href="/" className="text-sky-400">Go back</Link></div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-3">{paper.title}</h2>
          <p className="text-gray-400 mb-4">{paper.abstract}</p>
          <div className="text-sm text-gray-500">{paper.authors.map(a => a.name).join(", ")} • {paper.year || "N/A"} • {paper.citationCount} citations</div>
        </div>

        {!analysis && !analyzing && (
          <button onClick={analyze} className="w-full py-4 bg-gradient-to-r from-sky-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" /> Analyze with AI
          </button>
        )}

        {analyzing && <div className="bg-gray-800 rounded-xl p-12 text-center"><Loader2 className="w-10 h-10 text-sky-500 animate-spin mx-auto mb-4" /><p className="text-gray-400">Analyzing...</p></div>}

        {analysis && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-violet-500" /> AI Analysis</h3>
            <div className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">{analysis}</div>
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-700">
              <button onClick={download} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"><Download className="w-4 h-4" /> Download analysis</button>
              <button onClick={() => downloadCitation("txt")} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"><Download className="w-4 h-4" /> Citations (.txt)</button>
              <button onClick={() => downloadCitation("apa")} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"><Download className="w-4 h-4" /> Citations (APA)</button>
              <button onClick={() => downloadCitation("harvard")} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"><Download className="w-4 h-4" /> Citations (Harvard)</button>
              <button onClick={() => downloadCitation("bibtex")} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"><Download className="w-4 h-4" /> Citations (BibTeX)</button>
              <button onClick={analyze} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"><Brain className="w-4 h-4" /> Regenerate</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
