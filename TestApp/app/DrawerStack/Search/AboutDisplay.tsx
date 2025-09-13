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
import { StyleSheet, TouchableOpacity, View } from "react-native";

const AboutDisplay = () => {
  const { colors } = useTheme();

  const [selectedGender, setSelectedGender] = useState(null);

  const genders = [
    { label: "single", icon: appImages.siglePerson },
    { label: "double", icon: appImages.doublePerson },
  ];
  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"About You"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          if (selectedGender === "double") {
            router.navigate({ pathname: "/DrawerStack/Search/MyPartner" });
          } else {
            router.navigate({ pathname: "/DrawerStack/Search/Awsome" });
          }
        }}
        buttonTitle={"Next"}
        disableButton={!selectedGender}
      >
        <View style={styles.container}>
          <CText
            style={{}}
            textStyle={{}}
            fontWeight="bold"
            fontSize={fontPixel(20)}
            title={
              "Do you want to be displayed\nas a couple with your partner,\nor alone?"
            }
          />
          <View style={styles.genderContainer}>
            {genders.map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderCard,
                  selectedGender === gender.label && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedGender(gender.label)}
              >
                <Image source={gender.icon} style={styles.gender} />

                {selectedGender !== gender.label ? (
                  <View
                    style={[
                      styles.radioDot,
                      { backgroundColor: colors.lightGrey },
                    ]}
                  />
                ) : (
                  <Image source={appImages.tickCircle} style={styles.tick} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          {selectedGender === "double" && (
            <CText
              title={
                "Since you selected the couples option we\nrecommend uploading a photo of you together."
              }
              fontSize={fontPixel(16)}
              style={{ marginTop: hp(3) }}
            />
          )}
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default AboutDisplay;

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
});
