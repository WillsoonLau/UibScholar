export type Research = {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  author: string;
  institution: string;
  publishedAt: string; // tampilan, mis. "12 Sep 2026"
  year: number;
  studyProgram: string;
  method: string;
  pages: number;
  language: string;
  journal: string;
  journalIndex: string; // mis. "Sinta 4"
  views: number;
  citations: number; // sitasi (nanti dari Google Scholar)
  authorCitations: number;
  link: string; // tautan ke halaman jurnal, bukan PDF
  verified: boolean; // true = Terverifikasi LPPM, false = On Review
};

export type Filters = {
  studyProgram?: string;
  year?: string;
  publicationType?: string;
  topic?: string;
  method: string;
  onlyVerified: boolean;
};
