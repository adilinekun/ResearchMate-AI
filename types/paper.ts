export interface Author {
  name: string;
}

export type SortOption = "most-citations" | "least-citations" | "latest" | "oldest" | "most-relevant";

export interface Paper {
  id: string;
  title: string;
  abstract: string;
  authors: Author[];
  year: number | null;
  citationCount: number;
  fieldsOfStudy: string[];
}