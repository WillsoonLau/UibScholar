import { createContext, ReactNode, useContext, useState } from "react";

type SavedValue = { saved: string[]; toggleSave: (id: string) => void };

const SavedContext = createContext<SavedValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return <SavedContext.Provider value={{ saved, toggleSave }}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved harus dipakai di dalam SavedProvider");
  return ctx;
}
