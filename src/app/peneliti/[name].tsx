import { ResultCard } from "@/src/components/ResultCard";
import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { researches } from "@/src/data/research";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResearcherProfile() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const items = researches.filter((r) => r.author === name);
  const first = items[0];
  const totalCitations = items.reduce((sum, r) => sum + r.citations, 0);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader title="Profil Peneliti" />
      <FlatList
        data={items}
        keyExtractor={(r) => r.id}
        contentContainerClassName="gap-3 px-5 pb-10"
        ListHeaderComponent={
          <View className="mb-3 items-center rounded-2xl bg-white p-5">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Text className="font-poppins-bold text-3xl text-white">{String(name ?? "?").charAt(0).toUpperCase()}</Text>
            </View>
            <Text className="mt-3 text-center font-poppins-bold text-lg text-primary">{name}</Text>
            {first && <Text className="font-poppins text-xs text-muted">{first.institution}</Text>}
            <View className="mt-4 w-full flex-row">
              <View className="flex-1 items-center">
                <Text className="font-poppins-bold text-lg text-primary">{items.length}</Text>
                <Text className="font-poppins text-[11px] text-muted">Penelitian</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="font-poppins-bold text-lg text-primary">{totalCitations}</Text>
                <Text className="font-poppins text-[11px] text-muted">Total Sitasi</Text>
              </View>
            </View>
            <Text className="mt-4 self-start font-poppins-bold text-base text-primary">Daftar Penelitian</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ResultCard item={item} onPress={() => router.push({ pathname: "/paper/[id]", params: { id: item.id } })} />
        )}
        ListEmptyComponent={<Text className="mt-6 text-center font-poppins text-sm text-muted">Belum ada penelitian.</Text>}
      />
    </SafeAreaView>
  );
}
