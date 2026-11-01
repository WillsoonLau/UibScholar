import { BellButton } from "@/src/components/BellButton";
import { ResultCard } from "@/src/components/ResultCard";
import { useFilters } from "@/src/context/filters";
import { countActiveFilters, searchResearches } from "@/src/lib/search";
import { useRouter } from "expo-router";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const router = useRouter();
  const { filters } = useFilters();
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchResearches(query, filters), [query, filters]);
  const activeCount = countActiveFilters(filters);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="px-5 pt-2">
        <View className="flex-row items-center justify-between">
          <Text className="font-poppins-bold text-2xl text-primary">Cari Penelitian</Text>
          <BellButton />
        </View>

        <View className="mt-4 flex-row items-center gap-3">
          <View className="h-12 flex-1 flex-row items-center gap-2 rounded-2xl bg-white px-4">
            <Search size={18} color="#1F3F6E" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Cari penelitian, dosen, atau topik..."
              placeholderTextColor="#9AA3B2"
              className="flex-1 font-poppins text-sm text-primary"
              returnKeyType="search"
            />
          </View>
          <Pressable
            onPress={() => router.push("/filter")}
            className="h-12 w-12 items-center justify-center rounded-2xl bg-white active:opacity-80"
          >
            <SlidersHorizontal size={18} color="#1F3F6E" />
            {activeCount > 0 && (
              <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1">
                <Text className="font-poppins-bold text-[10px] text-primary">{activeCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        <View className="mt-4 h-px bg-primary" />
        <Text className="mb-3 mt-3 font-poppins-semibold text-xs text-primary">
          {results.length} Hasil Ditemukan
        </Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResultCard
            item={item}
            onPress={() => router.push({ pathname: "/paper/[id]", params: { id: item.id } })}
          />
        )}
        contentContainerClassName="gap-3 px-5 pb-32"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="mt-10 text-center font-poppins text-sm text-muted">
            Tidak ada penelitian yang cocok.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
