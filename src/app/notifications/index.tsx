import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { notifications } from "@/src/data/notifications";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const router = useRouter();
  const groups = ["Hari ini", "Kemarin"] as const;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Notifikasi" />
      <ScrollView contentContainerClassName="px-5 pb-10">
        {groups.map((g) => {
          const items = notifications.filter((n) => n.group === g);
          if (items.length === 0) return null;
          return (
            <View key={g}>
              <Text className="mb-2 mt-4 font-poppins-bold text-base text-primary">{g}</Text>
              <View className="gap-3">
                {items.map((n) => (
                  <Pressable
                    key={n.id}
                    onPress={() => router.push({ pathname: "/notifications/[id]", params: { id: n.id } })}
                    className="rounded-2xl border border-field bg-white p-4 active:opacity-80"
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="font-poppins-bold text-sm text-primary">{n.title}</Text>
                      {n.unread && <View className="h-2 w-2 rounded-full bg-red-500" />}
                    </View>
                    <Text className="mt-1 font-poppins text-xs leading-5 text-primary">{n.body}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
