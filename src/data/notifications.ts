export type AppNotification = {
  id: string;
  group: "Hari ini" | "Kemarin";
  title: string;
  body: string;
  datetime: string;
  researchId: string;
  kind: "verified" | "new";
  unread: boolean;
};

// DATA CONTOH. Nanti dari server.
export const notifications: AppNotification[] = [
  {
    id: "n1",
    group: "Hari ini",
    title: "Penelitian Terverifikasi",
    body: "Penelitian “Implementasi Machine Learning untuk Prediksi Permintaan UMKM” telah terverifikasi oleh LPPM UIB.",
    datetime: "5 Oktober 2026 - 10:00",
    researchId: "1",
    kind: "verified",
    unread: true,
  },
  {
    id: "n2",
    group: "Hari ini",
    title: "Penelitian Baru",
    body: "Penelitian “Penerapan Artificial Intelligence dalam Mendukung Transformasi Digital UMKM” telah diterbitkan di UIBScholar.",
    datetime: "5 Oktober 2026 - 08:30",
    researchId: "2",
    kind: "new",
    unread: false,
  },
  {
    id: "n3",
    group: "Kemarin",
    title: "Penelitian Terverifikasi",
    body: "Penelitian “Analisis User Experience pada Mobile E-Commerce” telah terverifikasi oleh LPPM UIB.",
    datetime: "4 Oktober 2026 - 15:20",
    researchId: "3",
    kind: "verified",
    unread: false,
  },
];
