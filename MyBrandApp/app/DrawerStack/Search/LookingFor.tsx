import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
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

const LookingFor = () => {
  const { colors } = useTheme();

  const [selectedGender, setSelectedGender] = useState(null);

  const genders = [
    { label: "single", icon: appImages.siglePerson },
    { label: "double", icon: appImages.doublePerson },
    {
      label: "both",
      icon: [appImages.siglePerson, appImages.doublePerson],
    },
  ];

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"I Am Looking For"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() =>
          router.navigate({ pathname: "/DrawerStack/Search/LookinForGender" })
        }
        buttonTitle={"Next"}
        disableButton={!selectedGender}
      >
        <View style={styles.container}>
          <CText
            fontWeight="bold"
            fontSize={fontPixel(20)}
            title={
              "Would you like to meet an\nindividual person, a couple or\nmaybe both?"
            }
            style={{ textAlign: "center" }}
          />

          {/* Row for single + couple */}
          <View style={styles.rowContainer}>
            {genders.slice(0, 2).map((gender, index) => {
              const isSelected = selectedGender === gender.label;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.genderCardHalf,
                    isSelected && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setSelectedGender(gender.label)}
                >
                  <Image source={gender.icon} style={styles.gender} />
                  {isSelected ? (
                    <Image source={appImages.tickCircle} style={styles.tick} />
                  ) : (
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: colors.lightGrey },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Full width for "Both" */}
          <TouchableOpacity
            style={[
              styles.genderCardFull,
              selectedGender === "both" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedGender("both")}
          >
            <Image source={appImages.siglePerson} style={styles.gender} />
            <CText
              title="and"
              fontWeight="semi"
              fontSize={fontPixel(16)}
              style={{ marginHorizontal: wp(4) }}
            />
            <Image source={appImages.doublePerson} style={styles.gender} />
            {selectedGender === "both" ? (
              <Image source={appImages.tickCircle} style={styles.tick} />
            ) : (
              <View
                style={[styles.radioDot, { backgroundColor: colors.lightGrey }]}
              />
            )}
          </TouchableOpacity>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default LookingFor;

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    marginTop: wp(8),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(3.5),
    gap: wp(3),
  },
  genderCardHalf: {
    flex: 1,
    padding: wp(3.2),
    borderRadius: heightPixel(12),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  genderCardFull: {
    marginTop: hp(2),

    padding: wp(3.2),
    borderRadius: heightPixel(12),
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
  radioDot: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(4),
    width: wp(4),
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
