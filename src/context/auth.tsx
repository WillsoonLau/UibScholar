import { Role, User } from "@/src/types/user";
import { createContext, ReactNode, useContext, useState } from "react";

type LoginInput = { role: Role; identifier: string; password: string };
type RegisterInput = LoginInput & { name: string; email: string };

type AuthValue = {
  user: User | null;
  login: (input: LoginInput) => boolean;
  register: (input: RegisterInput) => boolean;
  updateProfile: (patch: Partial<Pick<User, "name" | "email" | "studyProgram">>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

/**
 * AUTH SEMENTARA (MOCK): hanya menyimpan user di memori, tanpa server.
 * Saat backend siap (DEC-12), ganti isi login/register dengan panggilan API:
 *  - server mengembalikan token + role, token disimpan di expo-secure-store (bukan AsyncStorage)
 *  - role dan hak akses ditentukan SERVER, role di app hanya menentukan form yang tampil
 *  - logout menghapus token dari perangkat
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = ({ role, identifier, password }: LoginInput) => {
    if (!identifier.trim() || password.length < 6) return false;
    const id = identifier.trim();
    setUser({
      name: role === "Umum" ? id.split("@")[0] : `${role} ${id}`,
      role,
      identifier: id,
      email: role === "Umum" ? id : "",
      studyProgram: "",
    });
    return true;
  };

  // Pendaftaran divalidasi pihak UIB (DEC-03): di sini hanya mensimulasikan "diterima".
  const register = ({ role, identifier, password, name, email }: RegisterInput) => {
    return Boolean(name.trim() && identifier.trim() && password.length >= 6 && (role === "Umum" || email.trim()));
  };

  const updateProfile: AuthValue["updateProfile"] = (patch) =>
    setUser((u) => (u ? { ...u, ...patch } : u));

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
