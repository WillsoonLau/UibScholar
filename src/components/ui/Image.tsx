import { Image as ExpoImage } from "expo-image";
import { cssInterop } from "nativewind";

// Supaya className (NativeWind) jalan di expo-image.
cssInterop(ExpoImage, { className: "style" });

export const Image = ExpoImage;
