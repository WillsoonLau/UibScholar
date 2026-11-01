import { Button } from "@/src/components/ui/Button";
import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { notifications } from "@/src/data/notifications";
import { researches } from "@/src/data/research";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Building2, Check, FileText, Plus, User } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const notif = notifications.find((n) => n.id === id);
  const research = researches.find((r) => r.id === notif?.researchId);

  if (!notif || !research) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScreenHeader title="Detail Notifikasi" />
        <Text className="mt-10 text-center font-poppins text-sm text-muted">Notifikasi tidak ditemukan.</Text>
      </SafeAreaView>
    );
  }

  const verified = notif.kind === "verified";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Detail Notifikasi" />
      <ScrollView contentContainerClassName="items-center px-5 pb-10">
        <View className={`mt-6 h-28 w-28 items-center justify-center rounded-full ${verified ? "bg-success" : "bg-info"}`}>
          {verified ? <Check size={64} color="#fff" strokeWidth={3} /> : <Plus size={64} color="#fff" strokeWidth={3} />}
        </View>
        <Text className="mt-5 text-center font-poppins-bold text-2xl text-black">{notif.title}</Text>
        <Text className="mt-1 font-poppins text-sm text-muted">{notif.datetime}</Text>

        <View className="mt-6 w-full rounded-2xl bg-[#F1F1F6] p-4">
          <Text className="font-poppins text-sm leading-6 text-primary">{notif.body}</Text>
          {verified && (
            <Text className="mt-3 font-poppins text-sm leading-6 text-primary">
              Penelitian ini sekarang telah tersedia dan dapat ditemukan melalui UIBScholar.
            </Text>
          )}
        </View>

        <View className="mt-6 w-full flex-row gap-4">
          <View className="h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface">
            <FileText size={24} color="#9AA3B2" />
          </View>
          <View className="flex-1">
            <Text className="font-poppins-bold text-sm text-primary">{research.title}</Text>
            <View className="mt-1 flex-row items-center gap-1.5">
              <User size={11} color="#7A8494" />
              <Text className="flex-1 font-poppins text-[11px] text-muted">{research.author}</Text>
            </View>
            <View className="mt-0.5 flex-row items-center gap-1.5">
              <Building2 size={11} color="#7A8494" />
              <Text className="flex-1 font-poppins text-[11px] text-muted">{research.institution}</Text>
            </View>
          </View>
        </View>

        <View className="mt-6 w-full">
          <Button label="Lihat Penelitian" onPress={() => router.push({ pathname: "/paper/[id]", params: { id: research.id } })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
