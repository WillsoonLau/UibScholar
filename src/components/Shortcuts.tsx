import { useRouter } from "expo-router";
import { FileText, GraduationCap, UserSearch } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export function Shortcuts() {
  const router = useRouter();

  const items = [
    { label: "All research", Icon: FileText, onPress: () => router.push("/explore") },
    { label: "Nama Peneliti", Icon: UserSearch, onPress: () => router.push("/peneliti") },
    { label: "Program Studi", Icon: GraduationCap, onPress: () => router.push("/program-studi") },
  ];

  return (
    <View>
      <Text className="mb-3 mt-6 font-poppins-bold text-lg text-primary">Shortcut</Text>
      <View className="flex-row gap-5">
        {items.map(({ label, Icon, onPress }) => (
          <Pressable key={label} onPress={onPress} className="w-20 items-center active:opacity-80">
            <View className="h-16 w-16 items-center justify-center rounded-2xl border border-line bg-white">
              <Icon size={28} color="#1F3F6E" />
            </View>
            <Text className="mt-1.5 text-center font-poppins text-[11px] text-primary">{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
