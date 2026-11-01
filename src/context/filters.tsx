import { emptyFilters } from "@/src/lib/search";
import { Filters } from "@/src/types/research";
import { createContext, ReactNode, useContext, useState } from "react";

type FilterValue = { filters: Filters; setFilters: (f: Filters) => void; resetFilters: () => void };

const FilterContext = createContext<FilterValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters: () => setFilters(emptyFilters) }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters harus dipakai di dalam FilterProvider");
  return ctx;
}
