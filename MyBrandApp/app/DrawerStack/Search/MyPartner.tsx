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
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MyPartner = () => {
  const { colors } = useTheme();
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const [sliderValues, setSliderValues] = useState([18]);
  const genders = [
    { label: "Male", icon: appImages.male },
    { label: "Female", icon: appImages.female },
  ];

  const identities = ["Straight", "Bisexual", "Gay / Lesbian", "Transgender"];

  // Custom Marker with Label Above
  const Marker = ({ currentValue }) => {
    return (
      <View style={styles.markerWrapper}>
        <View style={[styles.marker, { borderColor: colors.primary }]} />
        <View
          style={{
            height: wp(7),
            width: wp(8),
            borderRadius: wp(1.5),
            backgroundColor: "#292323",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.markerLabel}>{currentValue}</Text>
        </View>
      </View>
    );
  };

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"About You"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/Search/Awsome" });
        }}
        buttonTitle={"Next"}
        containerStyle={{ marginTop: heightPixel(50) }}
        disableButton={!selectedGender || !selectedIdentity}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{"My partner is:"}</Text>

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
                <View
                  style={[
                    styles.imageBackground,
                    { backgroundColor: colors.lightGrey },
                  ]}
                >
                  <Image source={gender.icon} style={styles.gender} />
                </View>
                <Text style={styles.label}>{gender.label}</Text>
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
                <Text style={[styles.identityText, { color: colors.black }]}>
                  {identity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginTop: hp(1) }}>
            <View style={styles.sliderLabelRow}>
              <Text style={styles.rangeLabel}>Age:</Text>
              {/* <Text style={styles.rangeLabel}>18 - 99</Text> */}
            </View>
          </View>
          <MultiSlider
            min={18}
            max={99}
            step={1}
            values={sliderValues}
            onValuesChange={(values) => setSliderValues(values)}
            selectedStyle={{
              backgroundColor: colors.primary,
              height: hp(1.3),
              borderRadius: wp(1),
            }}
            unselectedStyle={{
              backgroundColor: colors.white,
              height: hp(1.3),
              borderRadius: wp(1),
              borderWidth: wp(0.3),
              borderColor: colors.lightGrey,
            }}
            containerStyle={{ alignSelf: "center" }}
            enabledOne
            customMarker={(e) => <Marker currentValue={e.currentValue} />}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default MyPartner;

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    marginTop: wp(8),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerLabel: {
    fontSize: fontPixel(14),
    fontFamily: FontFamily?.NunitoMedium,

    color: "#FFD600",
  },
  marker: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(3),
    borderColor: "#FFD600",
    backgroundColor: "white",
    borderWidth: wp(0.5),
    marginTop: wp(9.5),
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
  gender: {
    height: wp(12),
    width: wp(12),
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
    height: wp(18),
    width: wp(18),
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
    elevation: 5,
  },
  label: {
    marginTop: 14,
    lineHeight: 21,
    fontFamily: FontFamily.NunitoSemiBold,
    fontSize: fontPixel(14),
  },
  radioDot: {
    position: "absolute",
    top: 10,
    right: 10,
    height: wp(5),
    width: wp(5),

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  identityText: {
    fontFamily: FontFamily.NunitoMedium,
    fontSize: fontPixel(16),
    lineHeight: 21,
  },
});
