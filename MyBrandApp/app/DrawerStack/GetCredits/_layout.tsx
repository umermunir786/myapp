import { useTheme } from "@/services";
import { Stack } from "expo-router";

export default function GetCreditsStackLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetCredits" />
      <Stack.Screen name="BuyCredits" />
      <Stack.Screen name="PaymentMethods" />
      <Stack.Screen name="CardDetails" />
      <Stack.Screen name="UpgradeAccount" />
    </Stack>
  );
}
