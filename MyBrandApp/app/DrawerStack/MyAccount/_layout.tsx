import { useTheme } from "@/services";
import { Stack } from "expo-router";

export default function MyAccountStackLayout() {
  const { colors } = useTheme();
  return <Stack screenOptions={{ headerShown: false }} />;
}
