"use client";
import { useMemo, useState } from "react";
import { Sparkles, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { searchPapers } from "@/services/paperService";
import type { Paper } from "@/types/paper";

export default function ReferencePage() {
  const [prompt, setPrompt] = useState("");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    try {
      const results = await searchPapers(prompt.trim());
      setPapers(results);
    } catch {
      setError("Unable to fetch references right now.");
    } finally {
      setLoading(false);
    }
  };

  const referenceSummary = useMemo(() => {
    if (!papers.length) return "Enter a line of research intent and I’ll find related papers.";
    return `Found ${papers.length} related papers for your prompt.`;
  }, [papers]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-violet-400" />
          <div>
            <h1 className="text-2xl font-semibold">Reference assistant</h1>
            <p className="text-sm text-gray-400">Write a line of research intent and get related paper references.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-800 bg-gray-800/70 p-5">
          <label className="mb-2 block text-sm text-gray-300">What would you like references for?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Explain how transformer models are used in medical imaging research"
            className="min-h-28 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            {loading ? "Searching..." : "Find references"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-800/50 p-5">
          <p className="text-sm text-gray-300">{referenceSummary}</p>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          {!loading && papers.length > 0 && (
            <div className="mt-4 grid gap-3">
              {papers.map((paper) => (
                <div key={paper.id} className="rounded-xl border border-gray-700 bg-gray-900/70 p-4">
                  <h2 className="font-semibold text-white">{paper.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">{paper.abstract}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    {paper.authors.slice(0, 2).map((a) => a.name).join(", ")} • {paper.year || "N/A"} • {paper.citationCount} citations
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
