import { ResearchCard } from "@/src/components/ResearchCard";
import { useSaved } from "@/src/context/saved";
import { researches } from "@/src/data/research";
import { useRouter } from "expo-router";
import { Bookmark } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
  const router = useRouter();
  const { saved, toggleSave } = useSaved();
  const items = researches.filter((r) => saved.includes(r.id));

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="font-poppins-bold text-2xl text-primary">Tersimpan</Text>
        <Text className="mt-1 font-poppins text-xs text-muted">{items.length} penelitian di library kamu</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResearchCard
            item={item}
            saved
            onToggleSave={() => toggleSave(item.id)}
            onPress={() => router.push({ pathname: "/paper/[id]", params: { id: item.id } })}
          />
        )}
        contentContainerClassName="gap-3 px-5 pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="mt-20 items-center px-10">
            <Bookmark size={40} color="#9AA3B2" />
            <Text className="mt-3 text-center font-poppins text-sm text-muted">
              Belum ada penelitian tersimpan. Ketuk ikon bookmark pada penelitian untuk menyimpannya.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
