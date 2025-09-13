import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@/services";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { wp } from "../services/utilities/appFontSizes";
import Constants from "expo-constants";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  if (Platform.OS == "ios") {
    enableScreens(false);
  }
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <StatusBar translucent style="dark" />
          <View style={{ 
            height: Constants.statusBarHeight,
            backgroundColor: "#FFD538",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000
          }} />

          <Stack
            initialRouteName="index"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#ffffff" },
            }}
          >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="AuthStack" options={{ headerShown: false }} />
            <Stack.Screen name="DrawerStack" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <FlashMessage style={{ marginTop: wp(5) }} position={"bottom"} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
