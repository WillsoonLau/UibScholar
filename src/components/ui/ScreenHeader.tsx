import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = { title: string; right?: ReactNode };

export function ScreenHeader({ title, right }: Props) {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
      <View className="flex-1 flex-row items-center gap-2">
        <Pressable onPress={() => router.back()} hitSlop={10} className="-ml-1 h-10 w-10 items-center justify-center">
          <ChevronLeft size={26} color="#1F3F6E" />
        </Pressable>
        <Text numberOfLines={1} className="flex-1 font-poppins-bold text-xl text-primary">
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}
