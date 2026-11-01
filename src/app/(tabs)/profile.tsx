import { useAuth } from "@/src/context/auth";
import { useSaved } from "@/src/context/saved";
import { IDENTIFIER_LABEL } from "@/src/types/user";
import { useRouter } from "expo-router";
import { ChevronRight, FilePlus2, LogOut, Pencil, Settings } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function MenuItem({ icon, label, onPress, danger }: { icon: ReactNode; label: string; onPress: () => void; danger?: boolean }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 border-b border-line px-4 py-4 active:opacity-70">
      {icon}
      <Text className={`flex-1 font-poppins-medium text-sm ${danger ? "text-red-600" : "text-primary"}`}>{label}</Text>
      {!danger && <ChevronRight size={18} color="#7A8494" />}
    </Pressable>
  );
}

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { saved } = useSaved();
  if (!user) return null;

  const canSubmit = user.role !== "Umum";

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScrollView contentContainerClassName="px-5 pb-32 pt-2" showsVerticalScrollIndicator={false}>
        <Text className="font-poppins-bold text-2xl text-primary">Profil</Text>

        <View className="mt-5 items-center rounded-2xl bg-white p-6">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Text className="font-poppins-bold text-3xl text-white">{user.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text className="mt-3 text-center font-poppins-bold text-lg text-primary">{user.name}</Text>
          <View className="mt-1 rounded-full bg-info-bg px-3 py-1">
            <Text className="font-poppins-semibold text-[11px] text-info">{user.role}</Text>
          </View>
          <Text className="mt-2 font-poppins text-xs text-muted">
            {IDENTIFIER_LABEL[user.role]}: {user.identifier}
          </Text>
          {user.studyProgram ? <Text className="font-poppins text-xs text-muted">{user.studyProgram}</Text> : null}
          <Text className="mt-3 font-poppins text-xs text-muted">{saved.length} penelitian tersimpan</Text>
        </View>

        <View className="mt-5 overflow-hidden rounded-2xl bg-white">
          <MenuItem icon={<Pencil size={18} color="#1F3F6E" />} label="Edit Profil" onPress={() => router.push("/edit-profile")} />
          {canSubmit && (
            <MenuItem icon={<FilePlus2 size={18} color="#1F3F6E" />} label="Ajukan Penelitian" onPress={() => router.push("/submit")} />
          )}
          <MenuItem icon={<Settings size={18} color="#1F3F6E" />} label="Pengaturan" onPress={() => router.push("/settings")} />
          <MenuItem
            icon={<LogOut size={18} color="#DC2626" />}
            label="Keluar"
            danger
            onPress={() => {
              logout();
              router.replace("/welcome");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
