import { Paper } from "@/types/paper";

function reconstructAbstract(invertedIndex: Record<string, number[]> | null): string {
  if (!invertedIndex) return "No abstract available";
  const entries = Object.entries(invertedIndex);
  if (entries.length === 0) return "No abstract available";
  
  const maxPos = Math.max(...entries.flatMap(([_, positions]) => positions));
  const words: string[] = new Array(maxPos + 1);
  
  entries.forEach(([word, positions]) => {
    positions.forEach((pos) => { words[pos] = word; });
  });
  
  return words.join(" ");
}

export async function searchPapers(query: string): Promise<Paper[]> {
  const res = await fetch(
    `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=10`
  );
  if (!res.ok) throw new Error("Failed to fetch");
  
  const data = await res.json();
  return (data.results || []).map((work: any) => ({
    id: work.id.split("/").pop(),
    title: work.display_name || "Untitled",
    abstract: reconstructAbstract(work.abstract_inverted_index),
    authors: (work.authorships || []).map((a: any) => ({ name: a.author?.display_name || "Unknown" })),
    year: work.publication_year || null,
    citationCount: work.cited_by_count || 0,
    fieldsOfStudy: (work.concepts || []).slice(0, 3).map((c: any) => c.display_name),
  }));
}

export async function getPaperById(id: string): Promise<Paper | null> {
  const res = await fetch(`https://api.openalex.org/works/${id}`);
  if (!res.ok) return null;
  
  const work = await res.json();
  return {
    id: work.id.split("/").pop(),
    title: work.display_name || "Untitled",
    abstract: reconstructAbstract(work.abstract_inverted_index),
    authors: (work.authorships || []).map((a: any) => ({ name: a.author?.display_name || "Unknown" })),
    year: work.publication_year || null,
    citationCount: work.cited_by_count || 0,
    fieldsOfStudy: (work.concepts || []).slice(0, 3).map((c: any) => c.display_name),
  };
}