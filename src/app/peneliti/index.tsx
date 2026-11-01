import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { getResearchers } from "@/src/lib/search";
import { useRouter } from "expo-router";
import { ChevronRight, Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Peneliti() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const items = getResearchers().filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Nama Peneliti" />
      <View className="mx-5 mb-3 h-12 flex-row items-center gap-2 rounded-full border border-field bg-white px-4">
        <Search size={18} color="#1F3F6E" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari nama peneliti...."
          placeholderTextColor="#9AA3B2"
          className="flex-1 font-poppins text-sm text-primary"
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(p) => p.name}
        contentContainerClassName="gap-3 px-5 pb-10"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: "/peneliti/[name]", params: { name: item.name } })}
            className="flex-row items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 active:opacity-80"
          >
            <View className="h-11 w-11 items-center justify-center rounded-full bg-primary">
              <Text className="font-poppins-bold text-base text-white">{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View className="flex-1">
              <Text numberOfLines={1} className="font-poppins-bold text-sm text-primary">{item.name}</Text>
              <Text className="font-poppins text-[11px] text-muted">
                {item.programs.join(", ")} · {item.count} penelitian
              </Text>
            </View>
            <ChevronRight size={18} color="#1F3F6E" />
          </Pressable>
        )}
        ListEmptyComponent={<Text className="mt-10 text-center font-poppins text-sm text-muted">Peneliti tidak ditemukan.</Text>}
      />
    </SafeAreaView>
  );
}
