"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import type { SortOption } from "@/types/paper";

interface Props {
  onSearch: (query: string, sortBy: SortOption) => void;
  loading: boolean;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "most-relevant", label: "Most relevant" },
  { value: "most-citations", label: "Most citations" },
  { value: "least-citations", label: "Least citations" },
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

export default function SearchBar({ onSearch, loading, sortBy, onSortChange }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim(), sortBy);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter research topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-3 shadow-sm">
          <span className="text-sm font-medium text-slate-300">Filter</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            style={{
              minWidth: 180,
              backgroundColor: "#111827",
              color: "#ffffff",
              border: "1px solid #475569",
              borderRadius: 10,
              padding: "10px 12px",
            }}
            className="text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Search
          </button>
        </div>
      </div>
    </form>
  );
}