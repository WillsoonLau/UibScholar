export const ROLES = ["Dosen", "Mahasiswa", "Alumni", "Umum"] as const;
export type Role = (typeof ROLES)[number];

export type User = {
  name: string;
  role: Role; // terkunci, tidak bisa diubah di Edit Profil (DEC-08)
  identifier: string; // NUPTK/NIDN, NPM, atau email
  email: string;
  studyProgram: string;
};

// Label kolom identitas per role.
// TODO(DEC-02): Dosen memakai NUPTK saja atau NUPTK/NIDN? Sementara dua-duanya diterima.
export const IDENTIFIER_LABEL: Record<Role, string> = {
  Dosen: "NUPTK / NIDN",
  Mahasiswa: "NPM",
  Alumni: "NPM",
  Umum: "Email",
};

export function parseRole(value: string | string[] | undefined): Role {
  const v = Array.isArray(value) ? value[0] : value;
  return (ROLES as readonly string[]).includes(v ?? "") ? (v as Role) : "Umum";
}
