import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
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
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const BoostProfile = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ParentWrapper>
      <ImageHeader
        container={{
          height: hp(60),
        }}
        image={appImages.boost}
        // backPress={() => router.back()}
      />
      <MainWrapper
        enableScroll={true}
        buttonStyle={{ backgroundColor: "#ffffff" }}
        buttonTextStyle={{ color: "#121212" }}
        colors={colors}
        showButton={true}
        onAboveButtonPress={() => {
          setTimeout(() => {
            setModalVisible(false);
            setTimeout(() => {
              router.navigate({
                pathname: "/DrawerStack/Search/Advertisement",
              });
            }, 200);
          }, 1500);
          setModalVisible(true);
        }}
        onButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/Search/Advertisement" });
        }}
        buttonTitle={"Skip"}
        changeMainContainerStyle={heightPixel(50)}
        showAboveButton={true}
        aboveButtonTitle={"Feature profile"}
        // disableButton={true}
      >
        <View style={styles.text}>
          <Heading
            textStyle={{
              fontSize: fontPixel(28),
              fontFamily: FontFamily.BalooRegular,
            }}
            containerStyle={styles.heading}
            title={"Get Noticed!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "For 25 Elloo Credits, you can feature\nyour profile and receive priority listing at\nthe top of a user's search results."
            }
          />
        </View>
      </MainWrapper>
      <AlertModal
        modalVisible={modalVisible}
        image={appImages.circleTick}
        imageStyle={{ height: wp(30), width: wp(30), marginTop: -wp(15) }}
        // closeModal={() => setModalVisible(false)}
        title="You Did It!"
        titleStyle={{
          color: colors.black,
          fontSize: fontPixel(28),
          fontFamily: FontFamily.BalooRegular,
        }}
        description={"Your profile now has priority listing."}
        descriptionStyle={{
          fontFamily: FontFamily.NunitoRegular,
          fontSize: fontPixel(16),
          marginBottom: wp(10),
        }}
      />
    </ParentWrapper>
  );
};

export default BoostProfile;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: hp(2),
  },
  heading: {
    marginTop: hp(2),
    marginBottom: hp(1),
  },
});
