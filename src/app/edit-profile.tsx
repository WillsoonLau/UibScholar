import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { Select } from "@/src/components/ui/Select";
import { useAuth } from "@/src/context/auth";
import { STUDY_PROGRAMS } from "@/src/data/programs";
import { IDENTIFIER_LABEL } from "@/src/types/user";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function LockedField({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="mb-1.5 font-poppins-semibold text-sm text-primary">{label}</Text>
      <View className="h-12 flex-row items-center justify-between rounded-lg border border-line bg-[#F1F1F6] px-4">
        <Text className="font-poppins text-sm text-muted">{value}</Text>
        <Lock size={16} color="#9AA3B2" />
      </View>
    </View>
  );
}

export default function EditProfile() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [program, setProgram] = useState<string | undefined>(user?.studyProgram || undefined);

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Edit Profil" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView contentContainerClassName="gap-4 px-5 pb-10" keyboardShouldPersistTaps="handled">
          <View>
            <Text className="mb-1.5 font-poppins-semibold text-sm text-primary">Nama</Text>
            <Input placeholder="Nama lengkap" value={name} onChangeText={setName} />
          </View>
          <View>
            <Text className="mb-1.5 font-poppins-semibold text-sm text-primary">Email</Text>
            <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          </View>
          <Select label="Program Studi" value={program} options={STUDY_PROGRAMS} onChange={setProgram} placeholder="Pilih program studi" allowAll={false} />

          {/* Role dan identitas terkunci (DEC-08): hanya bisa diubah lewat server/admin. */}
          <LockedField label="Role" value={user.role} />
          <LockedField label={IDENTIFIER_LABEL[user.role]} value={user.identifier} />

          <View className="mt-2">
            <Button
              label="Simpan"
              onPress={() => {
                updateProfile({ name: name.trim() || user.name, email: email.trim(), studyProgram: program ?? "" });
                router.back();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
