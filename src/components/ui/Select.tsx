import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  value?: string;
  options: readonly string[];
  onChange: (value?: string) => void;
  placeholder?: string;
  allowAll?: boolean; // tampilkan opsi "Semua" untuk mengosongkan pilihan
};

export function Select({ label, value, options, onChange, placeholder = "Semua", allowAll = true }: Props) {
  const [open, setOpen] = useState(false);
  const data: (string | null)[] = allowAll ? [null, ...options] : [...options];

  return (
    <View className="w-full">
      <Text className="mb-1.5 font-poppins-semibold text-sm text-primary">{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        className="h-12 flex-row items-center justify-between rounded-lg border border-field bg-white px-4"
      >
        <Text className={`font-poppins text-sm ${value ? "text-primary" : "text-muted"}`}>
          {value ?? placeholder}
        </Text>
        <ChevronDown size={18} color="#1F3F6E" />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setOpen(false)}>
          <View className="max-h-[60%] rounded-t-3xl bg-white px-5 pb-8 pt-5">
            <Text className="mb-2 font-poppins-bold text-lg text-primary">{label}</Text>
            <FlatList
              data={data}
              keyExtractor={(o) => o ?? "__semua"}
              renderItem={({ item }) => {
                const selected = (item ?? undefined) === value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item ?? undefined);
                      setOpen(false);
                    }}
                    className="flex-row items-center justify-between border-b border-line py-3"
                  >
                    <Text className={`font-poppins text-sm ${selected ? "text-primary" : "text-muted"}`}>
                      {item ?? placeholder}
                    </Text>
                    {selected && <Check size={18} color="#1F3F6E" />}
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
