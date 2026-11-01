import { Research } from "@/src/types/research";
import { Bookmark, Building2, FileText, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
  item: Research;
  saved: boolean;
  onToggleSave: () => void;
  onPress?: () => void;
};

export function ResearchCard({ item, saved, onToggleSave, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="flex-row gap-3 rounded-2xl bg-white p-3 shadow-md active:opacity-90">
      <View className="h-24 w-[72px] items-center justify-center rounded-lg border border-line bg-surface">
        <FileText size={26} color="#9AA3B2" />
      </View>

      <View className="flex-1">
        <View className="flex-row items-start gap-2">
          <Text numberOfLines={2} className="flex-1 font-poppins-semibold text-sm text-primary">
            {item.title}
          </Text>
          <Pressable onPress={onToggleSave} hitSlop={10}>
            <Bookmark
              size={20}
              color={saved ? "#F5B301" : "#1F3F6E"}
              fill={saved ? "#F5B301" : "transparent"}
            />
          </Pressable>
        </View>

        <View className="mt-2 flex-row items-center gap-1.5">
          <User size={12} color="#7A8494" />
          <Text numberOfLines={1} className="flex-1 font-poppins text-[11px] text-muted">
            {item.author}
          </Text>
        </View>
        <View className="mt-1 flex-row items-center gap-1.5">
          <Building2 size={12} color="#7A8494" />
          <Text numberOfLines={1} className="flex-1 font-poppins text-[11px] text-muted">
            {item.institution}
          </Text>
        </View>

        <Text className="mt-auto self-end font-poppins text-[11px] text-muted">{item.publishedAt}</Text>
      </View>
    </Pressable>
  );
}
