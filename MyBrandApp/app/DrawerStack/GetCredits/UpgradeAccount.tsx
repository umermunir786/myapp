import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import {
  appImages,
  fontPixel,
  heightPixel,
  hp,
  useTheme,
  wp,
} from "@/services";
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
  subtitle?: string;
  description?: string;
}

const favoriteUsers: FavoriteUser[] = [
  {
    id: "1",
    name: "Go Ad Free - ₱ 49",
    subtitle: "(One-Time Payment)",
    description:
      "Pay once to upgrade your account\ninto a full ad free experience.",
    image: appImages.payment1,
    selected: true,
  },
  {
    id: "2",
    name: "Go Premium - ₱ 99",
    subtitle: "(Monthly Subscription)",
    description:
      "Unlimited messages, Ad Free, and as a monthly bonus receive 100 free Elloo Credits to send gifts.\n\nYou can cancel your subscription at any time.",
    image: appImages.payment2,
    selected: false,
  },
];
const UpgradeAccount = () => {
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
          backgroundColor: item.selected ? colors.primary : colors.primary,
        },
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      <View style={[styles.userInfo, {}]}>
        <View style={styles.textContainer}>
          <CText
            title={`${item.name}`}
            fontSize={fontPixel(28)}
            fontWeight="baloo"
            color={"#22172A"}
            style={{ textAlign: "center" }}
            textStyle={{ textAlign: "center", lineHeight: 24 }}
          />
          <CText
            title={`${item.subtitle}`}
            fontSize={fontPixel(16)}
            color={"#22172A"}
            fontWeight="semi"
            style={{ textAlign: "center" }}
            textStyle={{ textAlign: "center" }}
          />
          <CText
            title={`${item.description}`}
            fontSize={fontPixel(16)}
            fontWeight="semi"
            color={"#22172A"}
            style={{ textAlign: "center" }}
            textStyle={{ textAlign: "center" }}
          />
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"Upgrade Account"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        showAboveButton={true}
        aboveButtonTitle={"Upgrade"}
        buttonStyle={{ backgroundColor: colors.white }}
        buttonTextStyle={{ color: colors.black }}
        onAboveButtonPress={() => {
          router.back();
        }}
        onButtonPress={() => {
          router.back();
        }}
        buttonTitle={"Cancel"}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: colors.primary,
              height: hp(12),
              width: hp(12),
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: hp(-6),
              borderWidth: wp(1.6),
              borderRadius: hp(6),
              borderColor: "#FFD03415",
            }}
          >
            <Image source={appImages.upload} style={[styles.pic, {}]} />
          </View>

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
        </View>
      </MainWrapper>
      <AlertModal
        modalVisible={modalVisible}
        image={appImages.circleTick}
        imageStyle={{ height: wp(30), width: wp(30), marginTop: -wp(15) }}
        // closeModal={() => setModalVisible(false)}
        title="Great!"
        titleStyle={{
          color: colors.black,
          fontSize: fontPixel(30),
          fontFamily: FontFamily.BalooRegular,
        }}
        description={"The user has been added to\nyour Favorites."}
        descriptionStyle={{
          fontFamily: FontFamily.NunitoRegular,
          fontSize: fontPixel(16),
          marginBottom: wp(10),
        }}
      />
    </ParentWrapper>
  );
};

export default UpgradeAccount;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(4),

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
    alignItems: "center",
    flex: 1,
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
    alignSelf: "center",
  },
  notificationButton: {
    position: "absolute",
    right: wp(2),
    top: wp(2),
    width: wp(5),
    height: wp(5),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: wp(5),
    marginTop: wp(8),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  genderContainer: { marginTop: hp(3.5) },

  genderCard: {
    padding: wp(3.2),
    marginTop: hp(2),

    borderRadius: heightPixel(12),
    backgroundColor: "#ffffff",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gender: {
    height: wp(7),
    width: wp(7),
  },
  selectedCard: {
    borderWidth: 2,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
    fontFamily: FontFamily.NunitoExtraBold,
    fontSize: fontPixel(14),
  },
  radioDot: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(4),
    width: wp(4),
    backgroundColor: "#6200ee",
    borderRadius: wp(4),
  },
  tick: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(5),
    width: wp(5),
  },

  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: wp(2),
    borderRadius: fontPixel(31),
    elevation: 5,

    marginTop: wp(20),
    marginHorizontal: wp(5),
  },
  modalTitle: {
    fontSize: fontPixel(20),
    fontFamily: FontFamily.NunitoBold,
    marginTop: wp(5),
    textAlign: "center",
  },
  modalMessage: {
    fontSize: fontPixel(14),
    fontFamily: FontFamily.NunitoRegular,
    textAlign: "center",
    marginTop: wp(4),
  },
  closeIcon: {
    height: wp(5),
    width: wp(5),
    resizeMode: "contain",
  },

  pic: {
    height: hp(9),
    width: hp(9),
    resizeMode: "cover",
  },
  qr: {
    height: wp(60),
    width: wp(60),
    resizeMode: "contain",
    marginVertical: wp(12),
  },
  CheckContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(4),
    marginHorizontal: wp(1),
  },
  CheckIcon: {
    backgroundColor: "#FFD538",

    alignItems: "center",
    justifyContent: "center",

    marginRight: wp(2),
  },
  checkIcon: {
    height: wp(3),
    width: wp(3),
    resizeMode: "contain",
  },
  checkText: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoRegular,
    textAlign: "center",
  },
});
