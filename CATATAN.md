# UIBScholar: catatan versi frontend

## Menjalankan
```
npm install
npx expo start -c      # -c wajib karena tailwind.config.js berubah (warna baru)
```

## Mode demo (belum ada backend)
- **Login/daftar** hanya simulasi: isi identitas apa saja + password minimal 6 karakter. Lihat `src/context/auth.tsx`.
- **Data penelitian** adalah contoh di `src/data/research.ts`. Semua pencarian lewat `src/lib/search.ts`, jadi saat API siap cukup ganti isi fungsi itu.
- Bookmark, filter, dan profil tersimpan di memori, hilang saat app ditutup.

## Peta layar
- Onboarding: splash → welcome (3 slide) → role → login / register
- Tab: Home, Explore, Saved, Profile
- Lainnya: filter (modal), paper/[id], compare, notifications (+ detail), program-studi, peneliti (+ profil), edit-profile, submit (hanya Dosen/Mahasiswa/Alumni), settings, terms

## Yang masih perlu diputuskan / dikerjakan
- DEC-02: Dosen NUPTK saja atau NUPTK/NIDN (sementara dua-duanya, `IDENTIFIER_LABEL` di `src/types/user.ts`)
- DEC-12: koneksi ke sistem UIB. Setelah itu ganti auth mock: token di `expo-secure-store`, hak akses diperiksa server
- DEC-13: alur approve metadata (`src/app/submit.tsx` baru menampilkan konfirmasi)
- DEC-16: reset password (belum ada layar)
- Gambar banner, ilustrasi onboarding, dan thumbnail kertas: export dari Figma ke `assets/images`
- Teks Syarat & Ketentuan resmi (`src/app/terms.tsx` berisi placeholder)
- Dark Mode belum dibuat
- Sitasi dari Google Scholar belum ada
