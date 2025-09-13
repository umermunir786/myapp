import { useTheme } from "@/services";
import { Stack } from "expo-router";

export default function FavoritesStackLayout() {
  const { colors } = useTheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="FavoriteHome"
        options={{
          title: "Favorites",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchFavorite"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RemoveFavorite"
        options={{
          title: "Remove",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
