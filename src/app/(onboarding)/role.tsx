import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const roles = ["Dosen", "Mahasiswa", "Alumni", "Umum"] as const;

export default function Role() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface px-6">
      <View className="mt-2 flex-row items-center gap-4">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-white"
        >
          <ChevronLeft color="#000" size={22} />
        </Pressable>
        <Text className="font-poppins-bold text-xl text-primary">Pilih peran kamu</Text>
      </View>

      <View className="mt-8 gap-4">
        {roles.map((role) => (
          <Pressable
            key={role}
            onPress={() => router.push({ pathname: "/login", params: { role } })}
            className="h-28 items-center justify-center rounded-3xl bg-white active:opacity-80"
          >
            <Text className="font-poppins-semibold text-base text-primary">{role}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}