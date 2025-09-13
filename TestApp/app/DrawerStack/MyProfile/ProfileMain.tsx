import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, wp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

interface DrawerItem {
  key: string;
  icon: any;
  label: string;
  path?: string;
  balance?: string;
  onPress?: () => void;
}

const drawerConfig: DrawerItem[] = [
  {
    key: "Edit profile",
    icon: appImages.setting,
    label: "Edit profile",
    balance: "",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/MyProfile/EditProfile" });
    },
  },
  {
    key: "My photos",
    icon: appImages.photos,
    label: "My photos",
    balance: "250",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/MyProfile/MyPhotos" });
    },
  },
  {
    key: "My QR code",
    icon: appImages.qrCode,
    label: "My QR code",
    path: "/DrawerStack/Favorites/FavoriteHome",
    balance: "5",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/MyProfile/MyQRCode" });
    },
  },
  {
    key: "Verify profile",
    icon: appImages.award,
    label: "Verify profile",
    path: "/DrawerStack/FindProfile/FindPeople",
    balance: "100",
    onPress: () => {},
  },
  {
    key: "Community Guidelines",
    icon: appImages.shieldExclaim,
    label: "Community Guidelines",
    path: "/DrawerStack/MyProfile/CommunityGuide",
    balance: "100",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/MyProfile/CommunityGuide" });
    },
  },
];

const ProfileMain = () => {
  const { colors } = useTheme();
  const navigation = useNavigation() as any;
  const [selectedItem, setSelectedItem] = useState(0);
  const renderUserItem = ({
    item,
    index,
  }: {
    item: DrawerItem;
    index: number;
  }) => (
    <Pressable
      onPress={() => {
        setSelectedItem(index);
        item.onPress();
      }}
      style={[
        styles.iconContainer,
        {
          backgroundColor: colors.white,
          marginTop: index === 4 ? wp(40) : wp(0),
          marginBottom: index === 4 ? wp(14) : wp(6),
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: wp(8) }}>
        <Image
          source={item.icon}
          style={[
            styles.icon,
            {
              tintColor: colors.black,
              height: index === 0 || index === 1 ? wp(6) : wp(6),
              width: index === 0 || index === 1 ? wp(6) : wp(6),
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
  );

  return (
    <ParentWrapper>
      <MainHeader
        drawer
        backPress={() => {
          navigation.openDrawer();
        }}
        title={"My Profile"}
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
            style={{ paddingTop: wp(1) }}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default ProfileMain;

const styles = StyleSheet.create({
  listContainer: {},
  icon: {
    width: wp(6),
    height: wp(6),
    marginLeft: wp(2.5),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: wp(3),
    marginBottom: wp(6),
    elevation: 5,
    height: wp(16),
    marginHorizontal: wp(5),
    borderRadius: wp(3),
  },
  chevronIcon: {
    width: wp(3),
    height: wp(3),
  },
});
