import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/welcome"), 1500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-surface">
      <Image
        source={require("@/assets/images/logo_uib.webp")}
        style={{ width: 141, height: 128 }}
        contentFit="contain"
      />
      <Text className="mt-4 font-poppins-bold text-3xl text-primary">UIBScholar</Text>
    </View>
  );
}