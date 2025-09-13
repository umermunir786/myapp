import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages, fontPixel, hp, useTheme, wp } from "@/services";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

interface FavoriteUser {
  id: string;
  name: string;
}

const favoriteUsers: FavoriteUser[] = [
  {
    id: "1",
    name: "Be friendly and respectful to all users, no hate speech, nudity or harassment.",
  },
  {
    id: "2",
    name: "Be authentic, honest, and communicate openly and clearly.  ",
  },
  {
    id: "3",
    name: "Ensure your photos and age are accurate and up-to-date.",
  },
  {
    id: "4",
    name: "Choose lively public meetup spots for a safe experience.",
  },
  {
    id: "5",
    name: "Share your plans with a friend or family member. ",
  },
  {
    id: "6",
    name: "Trust your instincts and stay in control during meetings.",
  },
  {
    id: "7",
    name: "Keep sensitive personal information private.  ",
  },
  {
    id: "8",
    name: "Use our in-app safety tools if needed to report any concerns.",
  },
];

const CommunityGuide = () => {
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

  const renderUserItem = ({
    item,
    index,
  }: {
    item: FavoriteUser;
    index: number;
  }) => (
    <View style={styles.textContainer}>
      <CText
        title={item.name}
        fontWeight="medium"
        fontSize={fontPixel(16)}
        textStyle={{ textAlign: "left" }}
      />
    </View>
  );

  return (
    <ParentWrapper>
      <MainHeader
        backPress={() => router.back()}
        title="Community Guidelines"
      />
      <MainWrapper
        enableScroll
        colors={colors}
        showButton
        onButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/MyProfile/ProfileMain" });
        }}
        buttonTitle="I understand"
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
            <Image source={appImages.shieldCheck} style={[styles.pic, {}]} />
          </View>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: wp(4) }}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default CommunityGuide;

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
  textContainer: { padding: wp(2), paddingBottom: wp(0.6) },
  notificationButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
});
