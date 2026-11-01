import { researches } from "@/src/data/research";
import { Filters, Research } from "@/src/types/research";

export const emptyFilters: Filters = { method: "", onlyVerified: false };

export function countActiveFilters(f: Filters): number {
  return [f.studyProgram, f.year, f.publicationType, f.topic, f.method.trim(), f.onlyVerified]
    .filter(Boolean).length;
}

// Semua pencarian lewat sini, jadi saat backend siap cukup ganti isi fungsi ini dengan panggilan API.
export function searchResearches(query: string, filters: Filters): Research[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const method = filters.method.trim().toLowerCase();

  return researches.filter((r) => {
    if (filters.onlyVerified && !r.verified) return false;
    if (filters.studyProgram && r.studyProgram !== filters.studyProgram) return false;
    if (filters.year && String(r.year) !== filters.year) return false;
    if (filters.publicationType && r.journalIndex !== filters.publicationType) return false;
    if (filters.topic && !r.keywords.some((k) => k.toLowerCase() === filters.topic?.toLowerCase())) return false;
    if (method && !r.method.toLowerCase().includes(method)) return false;

    if (words.length === 0) return true;
    const haystack = [r.title, r.author, r.studyProgram, r.journal, ...r.keywords].join(" ").toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
}

export function uniqueYears(): string[] {
  return [...new Set(researches.map((r) => String(r.year)))].sort((a, b) => Number(b) - Number(a));
}

export function uniqueTopics(): string[] {
  return [...new Set(researches.flatMap((r) => r.keywords))].sort((a, b) => a.localeCompare(b));
}

export type Researcher = { name: string; institution: string; count: number; programs: string[] };

export function getResearchers(): Researcher[] {
  const map = new Map<string, Researcher>();
  for (const r of researches) {
    const cur = map.get(r.author);
    if (cur) {
      cur.count += 1;
      if (!cur.programs.includes(r.studyProgram)) cur.programs.push(r.studyProgram);
    } else {
      map.set(r.author, { name: r.author, institution: r.institution, count: 1, programs: [r.studyProgram] });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function countByProgram(program: string): number {
  return researches.filter((r) => r.studyProgram === program).length;
}
