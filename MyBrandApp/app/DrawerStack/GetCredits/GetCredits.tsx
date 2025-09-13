import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, wp } from "@/services/utilities/appFontSizes";
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
    key: "Credit balance",
    icon: appImages.credits,
    label: "Credit balance: 3000",
    path: "/DrawerStack/Search/Home",
    balance: "",
    onPress: () => {},
  },
  {
    key: "Buy credits",
    icon: appImages.buyCredits,
    label: "Buy credits",
    balance: "",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/GetCredits/BuyCredits" });
    },
  },
  {
    key: "Share on social media",
    icon: appImages.share,
    label: "Share on social media",
    balance: "250",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/GetCredits/ShareSocialMedia" });
    },
  },
  {
    key: "Watch video",
    icon: appImages.video,
    label: "Watch video",
    path: "/DrawerStack/Favorites/FavoriteHome",
    balance: "5",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/GetCredits/WatchVideo" });
    },
  },
  {
    key: "Upgrade to Premium",
    icon: appImages.upload,
    label: "Upgrade to Premium",
    path: "/DrawerStack/GetCredits/UpgradeAccount",
    balance: "100",
    onPress: () => {
      router.navigate({ pathname: "/DrawerStack/GetCredits/UpgradeAccount" });
    },
  },
];

const GetCredits = () => {
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
          backgroundColor: index === 0 ? colors.primary : colors.white,
          marginTop: index === 0 ? wp(16) : wp(0),
          marginBottom: index === 0 ? wp(14) : wp(6),
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: wp(2) }}>
        <Image
          source={item.icon}
          style={[
            styles.icon,
            {
              tintColor: colors.black,
              height: index === 0 || index === 1 ? wp(10) : wp(10),
              width: index === 0 || index === 1 ? wp(10) : wp(10),
            },
          ]}
        />
        <CText fontSize={fontPixel(16)} fontWeight="bold" title={item.label} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: wp(1) }}>
        <CText
          fontSize={fontPixel(11)}
          fontWeight="semiBold"
          title={item.balance}
        />

        {index !== 0 && index !== 1 && (
          <Image source={appImages.database} style={styles.chevronIcon} />
        )}
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
        title={"Get Credits"}
        containerStyle={{
          marginBottom: wp(4),
        }}
        titleStyle={{ color: colors.text }}
      />
      <MainWrapper
        enableScroll={false}
        colors={colors}
        mainStyle={{ marginTop: wp(0) }}
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
        <FlatList
          data={drawerConfig}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.key}
          style={{}}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </MainWrapper>
    </ParentWrapper>
  );
};

export default GetCredits;

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
    paddingLeft: wp(0),
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
