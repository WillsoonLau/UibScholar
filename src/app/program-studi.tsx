import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { useFilters } from "@/src/context/filters";
import { STUDY_PROGRAMS } from "@/src/data/programs";
import { countByProgram, emptyFilters } from "@/src/lib/search";
import { useRouter } from "expo-router";
import { ChevronRight, Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProgramStudi() {
  const router = useRouter();
  const { setFilters } = useFilters();
  const [query, setQuery] = useState("");

  const items = STUDY_PROGRAMS.filter((p) => p.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Program Studi" />
      <View className="mx-5 mb-3 h-12 flex-row items-center gap-2 rounded-full border border-field bg-white px-4">
        <Search size={18} color="#1F3F6E" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari program studi...."
          placeholderTextColor="#9AA3B2"
          className="flex-1 font-poppins text-sm text-primary"
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(p) => p}
        contentContainerClassName="gap-3 px-5 pb-10"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setFilters({ ...emptyFilters, studyProgram: item });
              router.dismissTo("/explore");
            }}
            className="flex-row items-center rounded-2xl border border-line bg-white px-5 py-4 active:opacity-80"
          >
            <View className="flex-1">
              <Text className="font-poppins-bold text-sm text-primary">{item}</Text>
              <Text className="font-poppins text-[11px] text-muted">{countByProgram(item)} penelitian</Text>
            </View>
            <ChevronRight size={18} color="#1F3F6E" />
          </Pressable>
        )}
        ListEmptyComponent={<Text className="mt-10 text-center font-poppins text-sm text-muted">Program studi tidak ditemukan.</Text>}
      />
    </SafeAreaView>
  );
}
