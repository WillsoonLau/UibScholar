import { Research } from "@/src/types/research";
import { Check } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = { item: Research; onPress?: () => void };

export function ResultCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="rounded-2xl border border-[#C9D3DF] bg-white p-4 active:opacity-90">
      <View
        className={`flex-row items-center gap-1 self-start rounded-full px-3 py-1 ${
          item.verified ? "bg-success" : "bg-warning"
        }`}
      >
        {item.verified && <Check size={12} color="#fff" />}
        <Text className="font-poppins-semibold text-xs text-white">
          {item.verified ? "Verified LPPM" : "On Review"}
        </Text>
      </View>

      <Text className="mt-2 font-poppins-bold text-sm text-primary">{item.title}</Text>
      <Text className="mt-1 font-poppins-medium text-xs text-muted">
        {item.author} · {item.studyProgram} · {item.year}
      </Text>
    </Pressable>
  );
}
