import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { ScreenHeader } from "@/src/components/ui/ScreenHeader";
import { useAuth } from "@/src/context/auth";
import { IDENTIFIER_LABEL, parseRole } from "@/src/types/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const role = parseRole(useLocalSearchParams<{ role?: string }>().role);
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string>();

  const onSubmit = () => {
    if (password !== confirm) return setError("Konfirmasi password tidak sama.");
    if (!register({ role, identifier, password, name, email })) {
      return setError("Lengkapi semua data. Password minimal 6 karakter.");
    }
    setError(undefined);
    Alert.alert(
      "Pendaftaran diterima",
      role === "Umum"
        ? "Akunmu sudah dibuat. Silakan login."
        : "Data kamu akan divalidasi oleh pihak UIB. Silakan login setelah disetujui.",
      [{ text: "OK", onPress: () => router.replace({ pathname: "/login", params: { role } }) }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader title="Daftar" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView contentContainerClassName="px-8 pb-10" keyboardShouldPersistTaps="handled">
          <Text className="mb-4 font-poppins text-sm text-muted">Daftar sebagai {role}</Text>
          <View className="gap-3">
            <Input placeholder="Nama lengkap" value={name} onChangeText={setName} />
            <Input
              placeholder={IDENTIFIER_LABEL[role]}
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              keyboardType={role === "Umum" ? "email-address" : role === "Dosen" ? "default" : "number-pad"}
            />
            {role !== "Umum" && (
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
            <Input placeholder="Password" value={password} onChangeText={setPassword} isPassword />
            <Input placeholder="Konfirmasi password" value={confirm} onChangeText={setConfirm} isPassword error={error} />
          </View>
          <View className="mt-6">
            <Button label="Daftar" onPress={onSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
