import { useTheme } from "@/services";
import { Stack } from "expo-router";

export default function MatchesStackLayout() {
  const { colors } = useTheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" />
      <Stack.Screen options={{}} name="ProfileDetails" />
    </Stack>
  );
}
