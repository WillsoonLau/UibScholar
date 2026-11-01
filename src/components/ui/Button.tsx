import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function Button({ label, onPress, loading, disabled }: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      className={`h-12 w-full items-center justify-center rounded-full bg-primary active:opacity-80 ${
        isDisabled ? "opacity-50" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="font-poppins-semibold text-sm text-white">{label}</Text>
      )}
    </Pressable>
  );
}