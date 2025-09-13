import AlertModal from "@/components/AlertModal";
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

const EditGender = () => {
  const { colors } = useTheme();
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const genders = [
    { label: "Male", icon: appImages.male },
    { label: "Female", icon: appImages.female },
  ];

  const identities = ["Straight", "Bisexual", "Gay / Lesbian", "Transgender"];
  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"My Profile"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            setTimeout(() => {
              router.navigate({
                pathname: "/DrawerStack/MyProfile/ProfileMain",
              });
            }, 100);
          }, 2000);
        }}
        buttonTitle={"Update"}
        changeMainContainerStyle={heightPixel(50)}
        disableButton={!selectedGender || !selectedIdentity}
      >
        <View style={styles.container}>
          <Text style={styles.title}>I am:</Text>

          <View style={styles.genderContainer}>
            {genders.map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderCard,
                  ,
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
                {/* {selectedGender === gender.label && ( */}
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
                {/* )} */}
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
                <Text style={[styles.identityText, { color: colors.darkGrey }]}>
                  {identity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </MainWrapper>
      <AlertModal
        modalVisible={modalVisible}
        image={appImages.circleTick}
        imageStyle={{ height: wp(30), width: wp(30), marginTop: -wp(15) }}
        // closeModal={() => setModalVisible(false)}
        title="Done!"
        titleStyle={{
          color: colors.black,
          fontSize: fontPixel(30),
          fontFamily: FontFamily.BalooRegular,
        }}
        description={"Your profile was updated."}
        descriptionStyle={{
          fontFamily: FontFamily.NunitoRegular,
          fontSize: fontPixel(16),
          marginBottom: wp(10),
        }}
      />
    </ParentWrapper>
  );
};

export default EditGender;

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
    fontWeight: "600",
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
