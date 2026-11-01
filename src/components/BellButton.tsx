import { notifications } from "@/src/data/notifications";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function BellButton() {
  const router = useRouter();
  const hasUnread = notifications.some((n) => n.unread);

  return (
    <Pressable
      onPress={() => router.push("/notifications")}
      className="h-11 w-11 items-center justify-center rounded-xl border border-line bg-white active:opacity-80"
    >
      <Bell size={20} color="#1F3F6E" />
      {hasUnread && <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />}
    </Pressable>
  );
}
