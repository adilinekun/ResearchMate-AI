"use client";
import { BookOpen, Brain, Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/types/paper";

interface Props {
  paper: Paper;
  isBookmarked: boolean;
  onToggleBookmark: (paper: Paper) => void;
}

export default function PaperCard({ paper, isBookmarked, onToggleBookmark }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-sky-500 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{paper.title}</h3>
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{paper.abstract}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {paper.authors.slice(0, 2).map(a => a.name).join(", ")}</span>
            <span>📅 {paper.year || "N/A"}</span>
            <span>📊 {paper.citationCount} citations</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleBookmark(paper)}
            className={`rounded-lg border px-3 py-2 text-sm ${isBookmarked ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-gray-700 bg-gray-900 text-gray-300 hover:border-sky-500 hover:text-sky-400"}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark paper"}
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          <Link
            href={`/paper/${paper.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 whitespace-nowrap"
          >
            <Brain className="w-4 h-4" />
            Analyze
          </Link>
        </div>
      </div>
    </div>
  );
}