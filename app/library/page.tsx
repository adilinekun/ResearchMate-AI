"use client";
import { useEffect, useState } from "react";
import { Library } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import Footer from "@/components/Footer";
import type { Paper } from "@/types/paper";

export default function LibraryPage() {
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Paper[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem("bookmarked-papers");
      if (saved) {
        setBookmarkedPapers(JSON.parse(saved) as Paper[]);
      }
    } catch {
      setBookmarkedPapers([]);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Library className="h-6 w-6 text-sky-500" />
          <div>
            <h1 className="text-2xl font-semibold">Your library</h1>
            <p className="text-sm text-gray-400">Saved papers and research notes in one place.</p>
          </div>
        </div>

        {bookmarkedPapers.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-800/60 p-8 text-center text-gray-400">
            <p>No papers saved yet.</p>
            <Link href="/" className="mt-3 inline-block text-sky-400 hover:text-sky-300">
              Search papers to add to your library
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookmarkedPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} isBookmarked={true} onToggleBookmark={toggleBookmark} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
