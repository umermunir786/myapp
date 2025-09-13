import { Stack } from "expo-router";

export default function SearchStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" />
      <Stack.Screen name="ChatOrMeet" />
      <Stack.Screen name="Display" />
      <Stack.Screen name="MyPartner" />
      <Stack.Screen name="Awsome" />
      <Stack.Screen name="Availability" />
      <Stack.Screen name="WouldLike" />
      <Stack.Screen name="Great" />
      <Stack.Screen name="LookingFor" />
      <Stack.Screen name="MyVisibility" />
      <Stack.Screen name="Advertisement" />
      <Stack.Screen name="Fantastic" />
      <Stack.Screen name="BoostProfile" />
      <Stack.Screen name="LookinForGender" />
      <Stack.Screen name="LookingForGenderNext" />
    </Stack>
  );
}
