import Button from "@/components/Button";
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
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LookingForGenderNext = () => {
  const { colors } = useTheme();
  const { genderType } = useLocalSearchParams();
  console.log(genderType);
  const scrollViewRef = useRef<ScrollView>(null);

  const [selectedIdentitiesMale, setSelectedIdentitiesMale] = useState<
    string[]
  >([]);
  const [maleAgeRange, setMaleAgeRange] = useState([18, 35]);

  const [selectedIdentitiesFemale, setSelectedIdentitiesFemale] = useState<
    string[]
  >([]);
  const [femaleAgeRange, setFemaleAgeRange] = useState([18, 35]);

  const [currentGender, setCurrentGender] = useState<string>("");
  const [showMale, setShowMale] = useState(false);
  const [showFemale, setShowFemale] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const maleIdentities = ["Straight", "Bisexual", "Gay", "Transgender"];
  const femaleIdentities = ["Straight", "Bisexual", "Lesbian", "Transgender"];

  useEffect(() => {
    // Set up the screen based on genderType parameter
    if (genderType === "Male") {
      setCurrentGender("Male");
      setShowMale(true);
      setShowFemale(false);
    } else if (genderType === "Female") {
      setCurrentGender("Female");
      setShowMale(false);
      setShowFemale(true);
    } else if (genderType === "Both") {
      setCurrentGender("Male");
      setShowMale(true);
      setShowFemale(false);
    }
  }, [genderType]);

  const handleMaleIdentityPress = (identity: string) => {
    setSelectedIdentitiesMale((prev) => {
      if (prev.includes(identity)) {
        return prev.filter((item) => item !== identity);
      } else {
        return [...prev, identity];
      }
    });
  };

  const handleFemaleIdentityPress = (identity: string) => {
    setSelectedIdentitiesFemale((prev) => {
      if (prev.includes(identity)) {
        return prev.filter((item) => item !== identity);
      } else {
        return [...prev, identity];
      }
    });
  };

  const handleNextPress = () => {
    if (genderType === "Both" && currentGender === "Male") {
      // If both genders were selected and we're currently showing Male, show Female next
      setCurrentGender("Female");
      setShowMale(false);
      setShowFemale(true);
    } else {
      // Navigate to next screen
      router.navigate({
        pathname: "/DrawerStack/Search/MyVisibility",
      });
    }
  };

  const isNextDisabled = () => {
    if (currentGender === "Male") {
      return selectedIdentitiesMale.length === 0;
    } else if (currentGender === "Female") {
      return selectedIdentitiesFemale.length === 0;
    }
    return true;
  };

  const Marker = ({ currentValue }: { currentValue: number }) => (
    <View style={styles.markerWrapper}>
      <View style={[styles.marker, { borderColor: colors.primary }]} />
      <View style={styles.markerValueContainer}>
        <Text style={styles.markerLabel}>{currentValue}</Text>
      </View>
    </View>
  );

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"I Am Looking For"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        buttonTitle={"Next"}
        onButtonPress={handleNextPress}
        containerStyle={{ marginTop: heightPixel(50) }}
        scrollViewRef={scrollViewRef}
      >
        <View style={styles.container}>
          {/* Male Section */}
          {showMale && (
            <View style={styles.contentWrapper}>
              <View
                style={[styles.genderCard, { backgroundColor: colors.primary }]}
              >
                {/* <View
                  style={[styles.radioDot, { backgroundColor: "transparent" }]}
                />

                <Image source={appImages.tickCircle} style={styles.tick} /> */}

                <View style={styles.imageBackground}>
                  <Image source={appImages.male} style={styles.gender} />
                  <Text style={[styles.genderText, { color: colors.black }]}>
                    Male
                  </Text>
                </View>
              </View>

              <View style={styles.identityContainer}>
                {maleIdentities.map((identity, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.identityButton,
                      { backgroundColor: colors.white },
                      selectedIdentitiesMale.includes(identity) && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleMaleIdentityPress(identity)}
                  >
                    <Text
                      style={[styles.identityText, { color: colors.black }]}
                    >
                      {identity}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.sliderLabelRow}>
                <Text style={styles.rangeLabel}>Age:</Text>
              </View>
              <MultiSlider
                min={18}
                max={99}
                step={1}
                values={maleAgeRange}
                onValuesChange={setMaleAgeRange}
                selectedStyle={{
                  backgroundColor: colors.primary,
                  height: hp(1.3),
                }}
                unselectedStyle={{
                  backgroundColor: colors.white,
                  height: hp(1.3),
                  borderRadius: wp(1),
                  borderWidth: wp(0.3),
                  borderColor: colors.lightGrey,
                }}
                containerStyle={{ alignSelf: "center" }}
                enabledTwo
                customMarker={(e) => <Marker currentValue={e.currentValue} />}
              />
            </View>
          )}

          {/* Female Section */}
          {showFemale && (
            <View style={[styles.contentWrapper]}>
              <View
                style={[styles.genderCard, { backgroundColor: colors.primary }]}
              >
                {/* <View style={[styles.radioDot]} />

                <Image source={appImages.tickCircle} style={styles.tick} /> */}
                <View style={styles.imageBackground}>
                  <Image source={appImages.female} style={styles.gender} />
                  <Text style={[styles.genderText, { color: colors.black }]}>
                    Female
                  </Text>
                </View>
              </View>

              <View style={styles.identityContainer}>
                {femaleIdentities.map((identity, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.identityButton,
                      { backgroundColor: colors.white },
                      selectedIdentitiesFemale.includes(identity) && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleFemaleIdentityPress(identity)}
                  >
                    <Text
                      style={[styles.identityText, { color: colors.black }]}
                    >
                      {identity}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.sliderLabelRow}>
                <Text style={styles.rangeLabel}>Age:</Text>
              </View>
              <MultiSlider
                min={18}
                max={99}
                step={1}
                values={femaleAgeRange}
                onValuesChange={setFemaleAgeRange}
                selectedStyle={{
                  backgroundColor: colors.primary,
                  height: hp(1.3),
                }}
                unselectedStyle={{
                  backgroundColor: colors.white,
                  height: hp(1.3),
                  borderRadius: wp(1),
                  borderWidth: wp(0.3),
                  borderColor: colors.lightGrey,
                }}
                containerStyle={{ alignSelf: "center" }}
                enabledTwo
                customMarker={(e) => <Marker currentValue={e.currentValue} />}
              />
            </View>
          )}
        </View>

        <Button
          children={"Next"}
          disable={isNextDisabled()}
          onPress={handleNextPress}
        />
      </MainWrapper>
    </ParentWrapper>
  );
};

export default LookingForGenderNext;

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    marginTop: wp(2),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  contentWrapper: {
    // borderWidth: wp(0.3),
    // borderColor: "#D9D9D9",
    borderRadius: heightPixel(10),
    paddingVertical: wp(8),
    paddingHorizontal: wp(7),
  },
  genderCard: {
    padding: wp(0),
    borderRadius: heightPixel(10),
    backgroundColor: "#ffffff",
    paddingHorizontal: wp(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: wp(4),
    position: "relative",
  },
  imageBackground: {
    borderRadius: wp(12),
    height: wp(15),
    width: wp(15),
    flexDirection: "row",
    alignItems: "center",
  },
  gender: {
    height: wp(8),
    width: wp(8),
    marginRight: wp(2),
  },
  genderText: {
    fontFamily: FontFamily.NunitoExtraBold,
    fontSize: fontPixel(14),
  },
  identityContainer: {
    marginTop: wp(6),
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  identityButton: {
    width: "47%",
    padding: wp(4),
    marginBottom: wp(5),
    borderRadius: fontPixel(10),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  identityText: {
    fontFamily: FontFamily.NunitoMedium,
    fontSize: fontPixel(16),
  },
  radioDot: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(5),
    width: wp(5),
    borderRadius: wp(4),
  },
  tick: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(5),
    width: wp(5),
  },
  sliderLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp(3),
    paddingHorizontal: wp(2),
  },
  rangeLabel: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoBold,
    color: "#000",
  },
  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(3),
    backgroundColor: "white",
    borderWidth: wp(0.5),
    marginTop: wp(8.5),
  },
  markerValueContainer: {
    height: wp(7),
    width: wp(8),
    borderRadius: wp(1),
    backgroundColor: "#292323",
    alignItems: "center",
    justifyContent: "center",
  },
  markerLabel: {
    fontSize: fontPixel(14),
    fontFamily: FontFamily?.NunitoMedium,
    color: "#FFD600",
  },
});
