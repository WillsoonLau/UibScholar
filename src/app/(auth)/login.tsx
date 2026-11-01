import { Button } from "@/src/components/ui/Button";
import { Image } from "@/src/components/ui/Image";
import { Input } from "@/src/components/ui/Input";
import { useAuth } from "@/src/context/auth";
import { IDENTIFIER_LABEL, parseRole } from "@/src/types/user";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const role = parseRole(params.role);
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  const onLogin = () => {
    // Pesan error sengaja umum, tidak membocorkan mana yang salah.
    if (!login({ role, identifier, password })) {
      setError("Data login tidak valid. Periksa kembali dan coba lagi.");
      return;
    }
    router.replace("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 items-center justify-center px-12"
      >
        <Image
          className="mb-5 h-[85px] w-[94px] rounded-lg"
          source={require("@/assets/images/logo_uib.webp")}
          contentFit="contain"
        />

        <View className="mb-8 items-center">
          <Text className="font-poppins-bold text-3xl text-primary">UIBScholar</Text>
          <Text className="mt-1 font-poppins text-xs text-muted">Masuk sebagai {role}</Text>
        </View>

        <Text className="mb-4 font-poppins-medium text-lg text-black">Masuk ke Akun Anda</Text>

        <View className="w-full gap-3">
          <Input
            placeholder={IDENTIFIER_LABEL[role]}
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType={role === "Umum" ? "email-address" : role === "Dosen" ? "default" : "number-pad"}
          />
          <Input placeholder="Password" value={password} onChangeText={setPassword} isPassword error={error} />
        </View>

        <View className="mt-6 w-full">
          <Button label="Login" onPress={onLogin} />
        </View>

        <View className="mt-4 flex-row justify-center">
          <Text className="font-poppins text-sm text-black">Belum punya akun? </Text>
          <Link href={{ pathname: "/register", params: { role } }} className="font-poppins-medium text-sm text-accent">
            Daftar
          </Link>
        </View>

        <Text className="mt-8 text-center font-poppins text-[11px] text-muted">
          Mode demo: isi identitas apa saja dan password minimal 6 karakter.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
