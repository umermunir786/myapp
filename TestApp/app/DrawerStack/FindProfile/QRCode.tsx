import AlertModal from "@/components/AlertModal";
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
import { StyleSheet, Text, View } from "react-native";

const QRCode = () => {
  const { colors } = useTheme();

  const [selectedGender, setSelectedGender] = useState(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const genders = [
    { label: "single", icon: appImages.siglePerson },
    { label: "double", icon: appImages.doublePerson },
  ];
  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"My QR Code"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            setTimeout(() => {
              router.back();
            }, 200);
          }, 2000);
        }}
        buttonTitle={"Share my QR code"}
      >
        <View style={styles.modalContent}>
          <Image
            source={appImages.pic}
            style={[styles.pic, { borderColor: colors.primary }]}
          />

          <Text style={[styles.modalTitle]}>{"Alexa Oliver"}</Text>

          <Text style={[styles.modalMessage]}>
            {"Scan the QR code below to add me\nto your Favorites."}
          </Text>
          <Image source={appImages.qr} style={[styles.qr]} />
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

export default QRCode;

const styles = StyleSheet.create({
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
    alignItems: "center",
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
    contentFit: "contain",
  },

  pic: {
    height: hp(12),
    width: hp(12),
    resizeMode: "cover",
    marginTop: hp(-6),
    borderWidth: wp(1.4),
    borderRadius: hp(6),
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
