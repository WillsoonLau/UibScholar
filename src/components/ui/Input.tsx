import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & { error?: string; isPassword?: boolean };

export function Input({ error, isPassword, ...props }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View className="w-full">
      <View
        className={`border border-[#9AA3B2] h-12 flex-row items-center rounded-md bg-white px-4 ${
          error ? "border border-red-500" : ""
        }`}
      >
        <TextInput
          {...props}
          secureTextEntry={isPassword && hidden}
          placeholderTextColor="#9AA3B2"
          className="flex-1 font-poppins text-sm text-primary"
        />
        {isPassword && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            {hidden ? <EyeOff size={18} color="#7A8494" /> : <Eye size={18} color="#7A8494" />}
          </Pressable>
        )}
      </View>
      {error ? <Text className="mt-1 font-poppins text-xs text-red-500">{error}</Text> : null}
    </View>
  );
}