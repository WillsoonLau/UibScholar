import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { Select } from "@/src/components/ui/Select";
import { useFilters } from "@/src/context/filters";
import { PUBLICATION_TYPES, STUDY_PROGRAMS } from "@/src/data/programs";
import { emptyFilters, uniqueTopics, uniqueYears } from "@/src/lib/search";
import { Filters } from "@/src/types/research";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Radio({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-2" hitSlop={8}>
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected ? "border-info" : "border-field"
        }`}
      >
        {selected && <View className="h-2.5 w-2.5 rounded-full bg-info" />}
      </View>
      <Text className="font-poppins text-sm text-primary">{label}</Text>
    </Pressable>
  );
}

export default function FilterScreen() {
  const router = useRouter();
  const { filters, setFilters } = useFilters();
  const [draft, setDraft] = useState<Filters>(filters);
  const patch = (p: Partial<Filters>) => setDraft((d) => ({ ...d, ...p }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Filter" />
      <ScrollView contentContainerClassName="gap-4 px-5 pb-8" keyboardShouldPersistTaps="handled">
        <Select label="Program Studi" value={draft.studyProgram} options={STUDY_PROGRAMS} onChange={(v) => patch({ studyProgram: v })} />
        <Select label="Tahun Publikasi" value={draft.year} options={uniqueYears()} onChange={(v) => patch({ year: v })} />
        <Select label="Jenis Publikasi" value={draft.publicationType} options={PUBLICATION_TYPES} onChange={(v) => patch({ publicationType: v })} />
        <Select label="Topik" value={draft.topic} options={uniqueTopics()} onChange={(v) => patch({ topic: v })} />

        <View>
          <Text className="mb-1.5 font-poppins-semibold text-sm text-primary">Metode Penelitian</Text>
          <TextInput
            value={draft.method}
            onChangeText={(t) => patch({ method: t })}
            placeholder="mis. Kualitatif"
            placeholderTextColor="#9AA3B2"
            className="h-12 rounded-lg border border-field bg-white px-4 font-poppins text-sm text-primary"
          />
        </View>

        <View className="mt-2 flex-row gap-8 px-2">
          <Radio label="Semua" selected={!draft.onlyVerified} onPress={() => patch({ onlyVerified: false })} />
          <Radio label="Terverifikasi" selected={draft.onlyVerified} onPress={() => patch({ onlyVerified: true })} />
        </View>

        <View className="mt-4 flex-row gap-3">
          <Pressable
            onPress={() => setDraft(emptyFilters)}
            className="h-12 flex-1 items-center justify-center rounded-lg border border-field bg-white active:opacity-80"
          >
            <Text className="font-poppins-semibold text-base text-black">Reset</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setFilters(draft);
              router.back();
            }}
            className="h-12 flex-[1.4] items-center justify-center rounded-lg bg-primary active:opacity-80"
          >
            <Text className="font-poppins-semibold text-base text-white">Terapkan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
