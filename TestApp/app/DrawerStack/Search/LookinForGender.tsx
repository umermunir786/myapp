import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
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
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LookinForGender = () => {
  const { colors } = useTheme();
  const [selectedGenders, setSelectedGenders] = useState([]); // Changed to array
  const [selectedIdentity, setSelectedIdentity] = useState(null);

  const genders = [
    { label: "Male", icon: appImages.male },
    { label: "Female", icon: appImages.female },
  ];

  const identities = ["Straight", "Bisexual", "Gay / Lesbian", "Transgender"];

  // Function to handle gender selection/deselection
  const handleGenderSelection = (genderLabel) => {
    setSelectedGenders((prev) => {
      if (prev.includes(genderLabel)) {
        // Remove if already selected
        return prev.filter((gender) => gender !== genderLabel);
      } else {
        // Add if not selected
        return [...prev, genderLabel];
      }
    });
  };

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"I Am Looking For"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          router.navigate({
            pathname: "/DrawerStack/Search/LookingForGenderNext",
            params: {
              genderType:
                selectedGenders.length == 2
                  ? "Both"
                  : selectedGenders[0] === "Male"
                  ? "Male"
                  : "Female",
            },
          });
        }}
        buttonTitle={"Next"}
        changeMainContainerStyle={heightPixel(50)}
        disableButton={selectedGenders.length === 0} // Changed condition
      >
        <View style={styles.container}>
          <Text style={styles.title}>Select gender:</Text>

          <View style={styles.genderContainer}>
            {genders.map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderCard,
                  selectedGenders.includes(gender.label) && {
                    // Changed condition
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => handleGenderSelection(gender.label)} // Changed function call
              >
                <View
                  style={[
                    styles.imageBackground,
                    { backgroundColor: colors.lightGrey },
                  ]}
                >
                  <Image source={gender.icon} style={styles.gender} />
                </View>
                <Text style={styles.label}>{gender.label}</Text>
                {!selectedGenders.includes(gender.label) ? ( // Changed condition
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
          {/* 
          <View style={styles.identityContainer}>
            {identities.map((identity, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.identityButton,
                  { backgroundColor: colors.white },
                  selectedIdentity === identity && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedIdentity(identity)}
              >
                <Text style={[styles.identityText, { color: colors.darkGrey }]}>
                  {identity}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default LookinForGender;

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    marginTop: wp(8),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  gender: {
    height: wp(10),
    width: wp(10),
  },
  tick: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(5),
    width: wp(5),
  },
  title: {
    fontFamily: FontFamily.NunitoBold,
    marginVertical: wp(5),
    textAlign: "center",
    fontSize: fontPixel(20),
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(19.5),
  },
  imageBackground: {
    borderRadius: wp(12),
    height: wp(15),
    width: wp(15),
    alignItems: "center",
    justifyContent: "center",
  },
  genderCard: {
    width: wp(42),
    padding: wp(6),
    borderRadius: wp(4),
    backgroundColor: "#ffffff",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android'
  },
  selectedCard: {
    borderWidth: 2,
  },
  label: {
    marginTop: 10,

    fontFamily: FontFamily.NunitoExtraBold,
    fontSize: fontPixel(14),
  },
  radioDot: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(5),
    width: wp(5),
    backgroundColor: "#6200ee",
    borderRadius: wp(4),
  },
  identityContainer: {
    marginTop: wp(6),
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  identityButton: {
    width: "47%",
    padding: wp(4.5),
    marginBottom: wp(6),
    borderRadius: wp(3),

    alignItems: "center",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android
  },
  selectedIdentity: {},
  identityText: {
    fontFamily: FontFamily.NunitoMedium,
    fontSize: fontPixel(16),
  },
});
