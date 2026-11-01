import { useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

// Ganti dengan gambar banner dari Figma bila sudah di-export ke assets/images.
const banners = [
  { id: "1", title: "Sistem Penilaian Baru", subtitle: "Berlaku mulai semester genap 2025/2026" },
  { id: "2", title: "Publikasi Terverifikasi", subtitle: "Penelitian diperiksa oleh LPPM UIB" },
  { id: "3", title: "Ajukan Penelitianmu", subtitle: "Bagikan karya ke sivitas UIB" },
];

const GAP = 12;

export function BannerCarousel() {
  const { width } = useWindowDimensions();
  const itemWidth = width - 40; // 40 = padding kiri-kanan Home (px-5)
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / (itemWidth + GAP)));
  };

  return (
    <View className="mt-5">
      <FlatList
        data={banners}
        keyExtractor={(b) => b.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + GAP}
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth }} className="h-36 justify-center rounded-2xl bg-primary px-5">
            <Text className="font-poppins-bold text-2xl text-white">{item.title}</Text>
            <Text className="mt-1 font-poppins text-xs text-white/80">{item.subtitle}</Text>
          </View>
        )}
      />

      <View className="mt-3 flex-row justify-center gap-1.5">
        {banners.map((b, i) => (
          <View
            key={b.id}
            className={`h-1.5 rounded-full ${i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/40"}`}
          />
        ))}
      </View>
    </View>
  );
}
