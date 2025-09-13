import { appImages, fontPixel, hp, useTheme, wp } from "@/services";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily } from "../../constants/Fonts";

export default function CustomDrawerContent(props) {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const drawerConfig = {
    Search: {
      icon: appImages.magnify,
      label: "Search",
      path: "/DrawerStack/Search/Home",
    },
    Matches: {
      icon: appImages.puzzle,
      label: "Matches",
      path: "/DrawerStack/Matches/Home",
    },
    Messages: {
      icon: appImages.message,
      label: "Messages",
      path: "/DrawerStack/Messages/MessagesTab",
    },
    Favorites: {
      icon: appImages.star,
      label: "Favorites",
      path: "/DrawerStack/Favorites/FavoriteHome",
    },
    FindProfile: {
      icon: appImages.plusPerson,
      label: "Find Profile",
      path: "/DrawerStack/FindProfile/FindPeople",
    },
    GetCredits: {
      icon: appImages.database,
      label: "Get Credits",
      path: "/DrawerStack/GetCredits/GetCredits",
    },
    MyAccount: {
      icon: appImages.setting,
      label: "My Account",
      path: "/DrawerStack/MyAccount/MainAccount",
    },
  };

  return (
    <>
      <StatusBar
        networkActivityIndicatorVisible={false}
        backgroundColor="#FFD538"
        translucent
        style="dark"
      />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <View
          style={[
            styles.header,
            { top: top - wp(4), height: hp(15) - top + wp(4) },
          ]}
        >
          <ImageBackground
            source={appImages.pic}
            style={[
              styles.profile,
              {
                width: hp(15) - top - wp(4),
                height: hp(15) - top - wp(4),
                borderRadius: hp(15) - top - wp(4),
              },
            ]}
          >
            <View style={styles.profileInfo}>
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/DrawerStack/MyProfile/ProfileMain",
                  });
                }}
                style={[
                  styles.profileBackground,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Image source={appImages.gearFill} style={styles.profileIcon} />
              </Pressable>
              <Text style={styles.name}>Bernila</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.menu}>
          {props.state.routes.map((route, index) => {
            const isFocused = props.state.index === index;
            const routeName = route.name;
            const config = drawerConfig[routeName] || {};

            return routeName === "MyProfile" ? null : (
              <View
                key={index}
                style={[
                  styles.drawerItemContainer,
                  isFocused && { backgroundColor: "#FFD538" },
                  index === 0 && { marginTop: wp(3) },
                  index === 5 && { marginTop: wp(10) },
                ]}
              >
                <DrawerItem
                  style={{
                    borderRadius: wp(0),
                    borderTopRightRadius: wp(4),
                    borderBottomRightRadius: wp(4),
                  }}
                  pressOpacity={0.5}
                  label=""
                  labelStyle={styles.label}
                  pressColor={colors.primary}
                  onPress={() => {
                    if (config.path) {
                      router.push({ pathname: config.path });
                    } else {
                      // props.navigation.navigate(routeName);
                    }
                  }}
                  icon={() => (
                    <View style={styles.iconContainer}>
                      <Image source={config.icon} style={styles.icon} />
                      <Text style={styles.itemText}>{config.label}</Text>
                      <Image
                        source={appImages.chevronRight}
                        style={styles.chevronIcon}
                      />
                    </View>
                  )}
                />
              </View>
            );
          })}
        </View>
      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
  },
  header: {
    height: hp(15),

    position: "absolute",
    width: wp(65),
    backgroundColor: "#FFD538",
    // paddingTop: wp(12),
    paddingVertical: wp(2),
    paddingBottom: wp(4),
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(14),
    // borderTopLeftRadius: wp(14),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  profile: {
    marginLeft: wp(3),
  },
  profileInfo: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
    left: wp(14),
  },
  icon: {
    width: wp(6),
    height: wp(6),
    marginLeft: wp(6),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: wp(1),
  },
  chevronIcon: {
    width: wp(1.6),
    height: wp(3),
  },
  name: {
    fontFamily: FontFamily.BalooRegular,
    fontSize: fontPixel(20),
    color: "#121212",
    marginLeft: wp(25),
    position: "absolute",
    marginTop: wp(0.5),
  },
  menu: {
    flex: 1,
    paddingVertical: wp(5),
    marginTop: wp(35),
    marginRight: wp(1),
  },
  drawerItemContainer: {
    marginVertical: wp(2),
    borderTopRightRadius: wp(4),
    borderBottomRightRadius: wp(4),
    backgroundColor: "#fff",
    shadowColor: "#A5A5A5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  itemText: {
    flex: 1,
    marginLeft: wp(4),
    fontFamily: FontFamily.NunitoSemiBold,
    fontSize: fontPixel(16),
    color: "#121212",
  },
  label: {
    fontSize: 14,
  },
  profileIcon: {
    width: wp(4),
    height: wp(4),
  },
  profileBackground: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    alignItems: "center",
    justifyContent: "center",
  },
});
