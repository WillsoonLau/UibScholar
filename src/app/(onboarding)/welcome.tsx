import { Button } from "@/src/components/ui/Button";
import { useRouter } from "expo-router";
import { BookOpen, ChevronLeft, GraduationCap, Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Ilustrasi sementara pakai ikon. Ganti dengan gambar dari Figma bila sudah di-export.
const slides = [
  {
    title: "Jelajahi Penelitian Sivitas UIB",
    desc: "Temukan penelitian dari dosen, mahasiswa, dan alumni dalam satu platform terverifikasi.",
    Icon: BookOpen,
  },
  {
    title: "Temukan Penelitian yang Relevan",
    desc: "Cari penelitian berdasarkan topik, peneliti, program studi, dan kata kunci dengan mudah.",
    Icon: Search,
  },
  {
    title: "Perluas Wawasan Akademik",
    desc: "Temukan berbagai penelitian, bandingkan informasi, dan dapatkan wawasan baru untuk mendukung penelitianmu.",
    Icon: GraduationCap,
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const next = () => (isLast ? router.replace("/role") : setIndex((i) => i + 1));
  const back = () => index > 0 && setIndex((i) => i - 1);

  return (
    <SafeAreaView className="flex-1 bg-surface px-6">
      <Pressable
        onPress={back}
        className="ml-3 mt-3 h-12 w-12 items-center justify-center rounded-full bg-white"
        style={{ opacity: index > 0 ? 1 : 0 }}
        disabled={index === 0}
      >
        <ChevronLeft color="#000" size={22} />
      </Pressable>

      <View className="flex-1 items-center justify-center px-6">
        <View className="h-44 w-44 items-center justify-center rounded-full bg-white">
          <slide.Icon size={72} color="#1F3F6E" />
        </View>
        <Text className="mt-10 text-center font-poppins-bold text-3xl text-primary">{slide.title}</Text>
        <Text className="mt-4 text-center font-poppins text-base leading-6 text-muted">{slide.desc}</Text>

        <View className="mt-8 flex-row gap-1.5">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/40"}`}
            />
          ))}
        </View>
      </View>

      <View className="mb-10 flex-row items-center justify-between px-6">
        {isLast ? (
          <View className="w-full">
            <Button label="Mulai" onPress={next} />
          </View>
        ) : (
          <>
            <Pressable onPress={() => router.replace("/role")} hitSlop={10}>
              <Text className="font-poppins text-sm text-muted">Lewati</Text>
            </Pressable>
            <View className="w-32">
              <Button label="Lanjut" onPress={next} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
