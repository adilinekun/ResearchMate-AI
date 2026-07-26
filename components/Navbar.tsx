"use client";
import { Library, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Search className="w-6 h-6 text-sky-500" />
          <h1 className="text-xl font-bold text-white">ResearchMate.ai</h1>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/library" className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-800/70 px-3 py-2 text-sm text-gray-300 hover:border-sky-500 hover:text-white">
            <Library className="h-4 w-4 text-sky-500" />
            Library
          </Link>
          <Link href="/reference" className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-sm text-violet-200 hover:border-violet-400 hover:text-white">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Reference
          </Link>
          <p className="text-sm text-gray-500">AI Research Assistant</p>
        </div>
      </div>
    </header>
  );
}