import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages, fontPixel, hp, useTheme, wp } from "@/services";
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
  { id: "1", name: "Facebook", image: appImages.facebook, selected: false },
  { id: "2", name: "Instagram", image: appImages.instagram, selected: false },
  { id: "3", name: "TikTok", image: appImages.tiktok, selected: false },
];

const ShareSocialMedia = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState(favoriteUsers);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSelection = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, selected: !user.selected }
        : { ...user, selected: false }
    );
    setUsers(updatedUsers);
  };

  // Check if any user is selected
  const isAnyUserSelected = users.some((user) => user.selected);

  const renderUserItem = ({ item }: { item: FavoriteUser; index: number }) => (
    <Pressable
      style={[
        styles.userItem,
        { backgroundColor: item.selected ? colors.primary : colors.background },
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      <View style={styles.userInfo}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              contentFit="cover"
              style={[styles.profileImage, { width: wp(15), height: wp(16) }]}
            />
          </View>
          <View style={styles.textContainer}>
            <CText
              title={item.name}
              fontWeight="semiBold"
              fontSize={fontPixel(18)}
              color="#22172A"
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
            style={{ height: wp(5), width: wp(5) }}
          />
        )}
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <ParentWrapper>
      <MainHeader
        backPress={() => router.back()}
        title="Share On Social Media"
      />
      <MainWrapper
        enableScroll
        colors={colors}
        showButton
        onButtonPress={() => {
          router.back();
        }}
        buttonTitle="Share"
        disableButton={!isAnyUserSelected}
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
            <Image source={appImages.shareFill} style={[styles.pic, {}]} />
          </View>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            style={{ marginTop: wp(5) }}
            showsVerticalScrollIndicator={false}
          />
          <View style={{ marginBottom: wp(10), marginTop: wp(2) }}>
            <CText title="Thank you!" fontSize={fontPixel(16)} />
            <CText
              title="You will be rewarded 250 Elloo Credits."
              fontSize={fontPixel(16)}
            />
          </View>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default ShareSocialMedia;

const styles = StyleSheet.create({
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
    height: hp(4.5),
    width: hp(4.5),
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
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(0.3),
    marginBottom: wp(5),
    marginTop: wp(1),
    borderRadius: wp(3),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: hp(5.5),
  },
  imageContainer: { marginRight: wp(3) },
  profileImage: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(2),
  },
  textContainer: { alignItems: "flex-start" },
  notificationButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
});
