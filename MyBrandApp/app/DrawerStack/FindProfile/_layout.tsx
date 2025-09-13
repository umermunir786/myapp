import { useTheme } from "@/services";
import { Stack } from "expo-router";

export default function FindProfileStackLayout() {
  const { colors } = useTheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindPeople" />
      <Stack.Screen name="QRCode" />
      <Stack.Screen name="AddFavorite" />
    </Stack>
  );
}
