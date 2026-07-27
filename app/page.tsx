"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import PaperCard from "@/components/PaperCard";
import Footer from "@/components/Footer";
import { searchPapers } from "@/services/paperService";
import type { Paper, SortOption } from "@/types/paper";

function sortPapers(items: Paper[], sortBy: SortOption): Paper[] {
  const sorted = [...items];

  switch (sortBy) {
    case "most-citations":
      return sorted.sort((a, b) => b.citationCount - a.citationCount);
    case "least-citations":
      return sorted.sort((a, b) => a.citationCount - b.citationCount);
    case "latest":
      return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    case "oldest":
      return sorted.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    case "most-relevant":
    default:
      return sorted;
  }
}

export default function Home() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("most-relevant");
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Paper[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem("bookmarked-papers");
      if (saved) {
        const parsed = JSON.parse(saved) as Paper[];
        setBookmarkedPapers(parsed);
      }
    } catch {
      setBookmarkedPapers([]);
    }
  }, []);

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setPapers((current) => sortPapers(current, value));
  };

  const handleSearch = async (query: string, currentSortBy: SortOption) => {
    setLoading(true);
    setError("");
    setSortBy(currentSortBy);
    try {
      const results = await searchPapers(query);
      setPapers(sortPapers(results, currentSortBy));
    } catch {
      setError("Failed to fetch papers.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = (paper: Paper) => {
    setBookmarkedPapers((current) => {
      const exists = current.some((item) => item.id === paper.id);
      const next = exists ? current.filter((item) => item.id !== paper.id) : [...current, paper];

      if (typeof window !== "undefined") {
        window.localStorage.setItem("bookmarked-papers", JSON.stringify(next));
      }

      return next;
    });
  };

  const isBookmarked = (paper: Paper) => bookmarkedPapers.some((item) => item.id === paper.id);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Hero />
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

        <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {papers.map((p) => <PaperCard key={p.id} paper={p} isBookmarked={isBookmarked(p)} onToggleBookmark={toggleBookmark} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}