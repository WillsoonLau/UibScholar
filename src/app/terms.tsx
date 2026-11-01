import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Syarat & Ketentuan" />
      <ScrollView contentContainerClassName="px-5 pb-10">
        {/* TODO: ganti dengan teks resmi dari pihak UIB / LPPM. */}
        <Text className="font-poppins text-sm leading-6 text-muted">
          Teks Syarat & Ketentuan resmi menunggu dari pihak UIB / LPPM.
          {"\n\n"}
          Gambaran prinsip yang sudah disepakati di aplikasi:
          {"\n"}• UIBScholar menyimpan metadata penelitian dan tautan ke halaman jurnal, bukan file PDF.
          {"\n"}• Penelitian ditampilkan sebagai Terverifikasi setelah tautan dan metadata diperiksa admin.
          {"\n"}• Pengguna bertanggung jawab atas kebenaran data yang diajukan.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
