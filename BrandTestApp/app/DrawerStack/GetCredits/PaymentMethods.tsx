import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages } from "@/services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface FavoriteUser {
  id: string;
  name: string;
  image: any;
  selected?: boolean;
}

const favoriteUsers: FavoriteUser[] = [
  {
    id: "1",
    name: "Master/Visa Card",
    image: appImages.payment1,
    selected: false,
  },
  {
    id: "2",
    name: "GCash",
    image: appImages.payment2,
    selected: false,
  },
  {
    id: "3",
    name: "Grab pay",
    image: appImages.payment3,
    selected: false,
  },
  {
    id: "4",
    name: "Coins.ph",
    image: appImages.payment4,
    selected: false,
  },
  {
    id: "5",
    name: "7 eleven",
    image: appImages.payment5,
    selected: false,
  },
  {
    id: "6",
    name: "Mlhuillier",
    image: appImages.payment6,
    selected: false,
  },
];

const PaymentMethods = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState(favoriteUsers);

  const toggleSelection = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, selected: !user.selected }
        : { ...user, selected: false }
    );
    setUsers(updatedUsers);
  };

  const isAnySelected = users.some((user) => user.selected);

  const renderUserItem = ({
    item,
    index,
  }: {
    item: FavoriteUser;
    index: number;
  }) => (
    <Pressable
      style={[
        styles.userItem,
        {
          backgroundColor: item.selected ? colors.primary : colors.background,
        },
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      <View style={styles.userInfo}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              contentFit="cover"
              style={[
                styles.profileImage,
                {
                  width: index === 0 ? wp(18) : wp(6),
                  height: index === 5 ? wp(7) : wp(6),
                },
              ]}
            />
          </View>
          <View style={styles.textContainer}>
            <CText
              title={`${item.name}`}
              fontSize={fontPixel(16)}
              color={"#22172A"}
              style={{ textAlign: "left" }}
              textStyle={{ textAlign: "left" }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.notificationButton,
          {
            backgroundColor: item.selected ? colors.primary : "#D9D9D9",

            width: wp(5),
            height: wp(5),
            borderRadius: wp(5),
            borderColor: item.selected ? "#292323" : "#D9D9D9",
          },
        ]}
        onPress={() => toggleSelection(item.id)}
      >
        {item.selected && (
          <Image
            source={appImages.tickCircleBlack}
            style={{
              height: wp(5),
              width: wp(5),
            }}
          />
        )}
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <ParentWrapper>
      <MainHeader
        backPress={() => {
          router.back();
        }}
        title={"Payment Method"}
        containerStyle={{
          marginBottom: wp(15),
          backgroundColor: colors.primary,
        }}
        titleStyle={{ color: colors.text }}
      />
      <MainWrapper
        enableScroll={false}
        colors={colors}
        mainStyle={{ marginTop: wp(0) }}
        appImage={appImages.splashLogo}
        showButton={true}
        changeMainContainerStyle={heightPixel(50)}
        buttonStyle={{}}
        buttonTitle="Continue"
        onButtonPress={() => {
          router.push({ pathname: "/DrawerStack/GetCredits/CardDetails" });
        }}
        disableButton={!isAnySelected}
        dontApplyFlex={false}
        buttonTextStyle={{}}
        scrollEnabled={true}
      >
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          style={{
            borderBottomLeftRadius: wp(5),
            borderBottomRightRadius: wp(5),
          }}
          contentContainerStyle={[
            styles.listContainer,
            { backgroundColor: colors.background },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </MainWrapper>
    </ParentWrapper>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(4),
    flexGrow: 1,
    paddingBottom: wp(),
    paddingTop: wp(0.4),
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
    marginBottom: wp(5),
    borderRadius: wp(3),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: hp(3),
  },
  imageContainer: {
    marginRight: wp(3),
  },
  profileImage: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(2),
  },
  textContainer: {
    alignItems: "flex-start",
  },
  notificationButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
});
