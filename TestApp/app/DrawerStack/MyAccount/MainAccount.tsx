import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, wp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

interface DrawerItem {
  key: string;
  icon: any;
  label: string;
  path?: string;
  balance?: string;
  onPress?: () => void;
}

const MainAccount = () => {
  const { colors } = useTheme();
  const navigation = useNavigation() as any;
  const [selectedItem, setSelectedItem] = useState(0);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [notifications, setNotifications] = useState({
    newMessages: false,
    newMatches: true,
    favoritesAvailable: false,
  });

  const toggleNotification = (type: string) => {
    setNotifications((prev) => {
      // If the switch is being turned off, just turn it off
      if (prev[type]) {
        return {
          ...prev,
          [type]: false,
        };
      }

      // If turning on, turn off all others and turn on this one
      const newNotifications = {};
      Object.keys(prev).forEach((key) => {
        newNotifications[key] = key === type;
      });
      return newNotifications;
    });
  };

  const notificationOptions = [
    { key: "newMessages", label: "New messages" },
    { key: "newMatches", label: "New matches" },
    { key: "favoritesAvailable", label: "Favorites available" },
  ];

  const renderUserItem = ({
    item,
    index,
  }: {
    item: DrawerItem;
    index: number;
  }) => (
    <>
      {item.key !== "Notifications" && (
        <Pressable
          onPress={() => {
            setSelectedItem(index);
            item.onPress();
          }}
          style={[
            styles.itemContainer,
            {
              backgroundColor: colors.white,
              marginBottom: wp(6),
            },
          ]}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: wp(8) }}
          >
            <Image
              source={item.icon}
              style={[
                styles.icon,
                {
                  tintColor: colors.black,
                  height: wp(6),
                  width: wp(6),
                },
              ]}
            />
            <CText
              fontSize={fontPixel(18)}
              fontWeight="semiBold"
              title={item.label}
            />
          </View>
        </Pressable>
      )}
      {item.key === "Notifications" && (
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>{"Push notifications:"}</Text>

          {/* Switches for notification options */}
          {notificationOptions.map((option, optionIndex) => (
            <View key={option.key} style={styles.optionContainer}>
              <Text style={styles?.text}>{option.label}</Text>
              <Switch
                value={notifications[option.key]}
                onValueChange={() => toggleNotification(option.key)}
                trackColor={{ false: "#F0F3F5", true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          ))}
        </View>
      )}
    </>
  );

  const drawerConfig: DrawerItem[] = [
    {
      key: "Upgrade account",
      icon: appImages.upgrade,
      label: "Upgrade account",
      balance: "",
      onPress: () => {
        router.navigate({ pathname: "/DrawerStack/MyAccount/UpgradeAccount" });
      },
    },
    {
      key: "Change login method",
      icon: appImages.changeLogin,
      label: "Change login method",
      balance: "250",
      onPress: () => {
        router.navigate({
          pathname: "/DrawerStack/MyAccount/LoginMethods",
        });
      },
    },
    {
      key: "Notifications",
      icon: appImages.award,
      label: "Notifications",
      path: "/DrawerStack/Favorites/FavoriteHome",
      balance: "5",
      onPress: () => {},
    },
    {
      key: "Delete account",
      icon: appImages.bin,
      label: "Delete account",
      path: "/DrawerStack/Favorites/FavoriteHome",
      balance: "5",
      onPress: () => {
        setDeleteModal(true);
      },
    },
    {
      key: "Logout",
      icon: appImages.logout,
      label: "Logout",
      path: "/DrawerStack/FindProfile/FindPeople",
      balance: "100",
      onPress: () => {
        setShowAlertModal(true);
      },
    },
  ];

  const handleYes = () => {
    setShowAlertModal(false);
  };

  const handleNo = () => {
    setShowAlertModal(false);
  };
  return (
    <ParentWrapper>
      <MainHeader
        drawer
        backPress={() => {
          navigation.openDrawer();
        }}
        title={"My Account"}
        containerStyle={{
          marginBottom: wp(4),
        }}
        titleStyle={{ color: colors.text }}
      />
      <MainWrapper
        enableScroll={false}
        colors={colors}
        mainStyle={{ marginTop: wp(0) }}
        changeMainContainerStyle={heightPixel(50)}
        appImage={appImages.splashLogo}
        showButton={false}
        buttonStyle={{}}
        buttonTitle=""
        onButtonPress={() => {}}
        disableButton={false}
        showGoogleButton={false}
        absolutePosition={false}
        showAboveButton={false}
        aboveButtonTitle=""
        onAboveButtonPress={() => {}}
        disableAboveButton={false}
        absoluteAbovePosition={false}
        dontApplyFlex={false}
        buttonTextStyle={{}}
        scrollEnabled={true}
        navImages={[appImages?.magnify]}
      >
        <View style={{ marginTop: wp(12) }}>
          <FlatList
            data={drawerConfig}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </MainWrapper>
      <AlertModal
        modalVisible={showAlertModal}
        closeModal={() => setShowAlertModal(false)}
        rightButtonText="Log out"
        leftButtonText="Cancel"
        onPressLeft={handleYes}
        onPressRight={handleNo}
        title={"Are you sure you want to log out?"}
        description={
          "Make sure you remember your login details, as you will need them to sign back in."
        }
        buttons={true}
        // image={appImages.bellCircle}
        imageStyle={{}}
        titleStyle={{}}
      />
      <AlertModal
        modalVisible={deleteModal}
        closeModal={() => setDeleteModal(false)}
        rightButtonText="Delete"
        leftButtonText="Cancel"
        onPressLeft={() => {
          setDeleteModal(false);
        }}
        onPressRight={() => {
          router.navigate({ pathname: "/DrawerStack/MyAccount/DeleteAccount" });
        }}
        title={"Are you sure you want to delete your account?"}
        description={
          "If you delete your account your profile, favorites, messages and photos will be deleted permanently.\n\nThis action cannot be undone!"
        }
        buttons={true}
        // image={appImages.bellCircle}
        imageStyle={{}}
        titleStyle={{}}
      />
    </ParentWrapper>
  );
};

export default MainAccount;

const styles = StyleSheet.create({
  listContainer: {},
  icon: {
    width: wp(6),
    height: wp(6),
    marginLeft: wp(2.5),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: wp(3),
    elevation: 5,
    height: wp(16),
    marginHorizontal: wp(5),
    borderRadius: wp(3),
  },
  chevronIcon: {
    width: wp(3),
    height: wp(3),
  },
  cardContainer: {
    padding: wp(5),

    paddingTop: wp(6),
    borderRadius: wp(5),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: wp(5),
    marginBottom: wp(6),
  },
  iconContainer: {
    alignSelf: "center",
    borderRadius: wp(20),
  },

  heading: {
    fontFamily: FontFamily?.NunitoBold,
    fontSize: fontPixel(16),
    textAlign: "left",
    marginBottom: wp(6),
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: wp(4),
  },
  text: {
    fontFamily: FontFamily?.NunitoMedium,
    fontSize: fontPixel(16),
  },
});
