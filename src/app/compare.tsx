import { ResultCard } from "@/src/components/ResultCard";
import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { researches } from "@/src/data/research";
import { Research } from "@/src/types/research";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ROWS: { label: string; get: (r: Research) => string }[] = [
  { label: "Jenis Publikasi", get: (r) => r.journalIndex },
  { label: "Jurnal", get: (r) => r.journal },
  { label: "Tahun Terbit", get: (r) => String(r.year) },
  { label: "Program Studi", get: (r) => r.studyProgram },
  { label: "Metode", get: (r) => r.method },
  { label: "Jumlah Halaman", get: (r) => String(r.pages) },
  { label: "Bahasa", get: (r) => r.language },
  { label: "Sitasi", get: (r) => String(r.citations) },
  { label: "Status", get: (r) => (r.verified ? "Terverifikasi" : "On Review") },
];

function MiniCard({ tag, item }: { tag: string; item: Research }) {
  return (
    <View className="rounded-2xl border border-line bg-white p-3 shadow-sm">
      <Text className="font-poppins-bold text-[11px] text-primary">{tag}</Text>
      <Text numberOfLines={2} className="font-poppins-semibold text-xs text-primary">{item.title}</Text>
      <Text numberOfLines={1} className="font-poppins text-[10px] text-muted">{item.author}</Text>
    </View>
  );
}

export default function Compare() {
  const { a, b } = useLocalSearchParams<{ a?: string; b?: string }>();
  const [bId, setBId] = useState<string | undefined>(b);

  const itemA = researches.find((r) => r.id === a);
  const itemB = researches.find((r) => r.id === bId);

  if (!itemA) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="Bandingkan" />
        <Text className="mt-10 text-center font-poppins text-sm text-muted">Penelitian tidak ditemukan.</Text>
      </SafeAreaView>
    );
  }

  // Langkah 1: pilih penelitian pembanding.
  if (!itemB) {
    const options = researches.filter((r) => r.id !== itemA.id);
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="Pilih pembanding" />
        <View className="px-5 pb-3">
          <MiniCard tag="Judul A" item={itemA} />
        </View>
        <FlatList
          data={options}
          keyExtractor={(r) => r.id}
          renderItem={({ item }) => <ResultCard item={item} onPress={() => setBId(item.id)} />}
          contentContainerClassName="gap-3 px-5 pb-10"
        />
      </SafeAreaView>
    );
  }

  // Langkah 2: tabel perbandingan. Header A/B menempel (sticky) saat discroll.
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader
        title="Bandingkan"
        right={
          <Pressable onPress={() => setBId(undefined)} hitSlop={8}>
            <Text className="font-poppins-medium text-xs text-info">Ganti B</Text>
          </Pressable>
        }
      />
      <ScrollView stickyHeaderIndices={[0]} contentContainerClassName="pb-10" showsVerticalScrollIndicator={false}>
        <View className="gap-2 bg-surface px-5 pb-3">
          <MiniCard tag="Judul A" item={itemA} />
          <MiniCard tag="Judul B" item={itemB} />
        </View>

        <View className="mx-5 rounded-2xl bg-white p-4">
          <View className="flex-row border-b border-line pb-2">
            <Text className="w-[28%] font-poppins-bold text-xs text-primary">Ket.</Text>
            <Text className="flex-1 font-poppins-bold text-xs text-primary">Judul A</Text>
            <Text className="flex-1 font-poppins-bold text-xs text-primary">Judul B</Text>
          </View>
          {ROWS.map((row) => {
            const va = row.get(itemA);
            const vb = row.get(itemB);
            return (
              <View key={row.label} className="flex-row border-b border-line/60 py-3">
                <Text className="w-[28%] pr-2 font-poppins text-xs text-primary">{row.label}</Text>
                <Text className="flex-1 pr-2 font-poppins text-xs text-muted">{va}</Text>
                <Text className={`flex-1 font-poppins text-xs ${va === vb ? "text-muted" : "text-primary"}`}>{vb}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
