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
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Availability = () => {
  const { colors } = useTheme();

  const [selectedGender, setSelectedGender] = useState([]);

  const genders = [
    { label: "Morning (8 am - 12 pm)" },
    { label: "Afternoon (12 pm - 6 pm)" },
    { label: "Evening (6 pm - 10 pm)" },
    { label: "Night (10 pm - 4 am)" },
    { label: "All day" },
  ];
  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"About You"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() =>
          router.navigate({ pathname: "/DrawerStack/Search/WouldLike" })
        }
        buttonTitle={"Next"}
        disableButton={selectedGender.length === 0}
      >
        <View style={styles.container}>
          <View style={styles.genderContainer}>
            {genders.map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderCard,
                  selectedGender.includes(gender.label) && {
                    backgroundColor: colors.primary,
                  },
                  {
                    borderColor: colors.primary,
                    borderWidth: wp(0.3),
                  },
                ]}
                onPress={() => {
                  if (gender.label === "All day") {
                    if (selectedGender.includes(gender.label)) {
                      setSelectedGender([]);
                    } else {
                      setSelectedGender(["All day"]);
                    }
                  } else {
                    if (selectedGender.includes("All day")) {
                      setSelectedGender([gender.label]);
                    } else {
                      if (selectedGender.includes(gender.label)) {
                        setSelectedGender(
                          selectedGender.filter((item) => item !== gender.label)
                        );
                      } else {
                        setSelectedGender([...selectedGender, gender.label]);
                      }
                    }
                  }
                }}
              >
                <Text
                  style={[
                    styles.time,
                    selectedGender.includes(gender.label) && {
                      color: colors.black,
                    },
                  ]}
                >
                  {gender.label}
                </Text>

                {!selectedGender.includes(gender.label) ? (
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
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Availability;

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    marginTop: wp(8),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  genderContainer: { marginTop: hp(0.5) },
  time: {
    fontFamily: FontFamily.NunitoRegular,
    fontSize: fontPixel(16),
    color: "#7F7F7F",
  },
  genderCard: {
    padding: wp(3.2),
    marginTop: hp(2),

    borderRadius: heightPixel(12),
    backgroundColor: "#FFFCF2",
    alignItems: "center",

    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
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
