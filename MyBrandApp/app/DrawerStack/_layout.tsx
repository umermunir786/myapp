import { useTheme, wp } from "@/services";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawerContent from "../../components/CustomDrawer/index";
export default function DrawerStackLayout() {
  const { colors } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor="#FFD538" translucent style="dark" /> */}
      <Drawer
        initialRouteName="Search"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: wp(65),
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Search"
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />

        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
          name="Matches"
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
          name="Messages"
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
          name="Favorites"
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
          name="FindProfile"
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
          name="GetCredits"
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
          name="MyAccount"
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
