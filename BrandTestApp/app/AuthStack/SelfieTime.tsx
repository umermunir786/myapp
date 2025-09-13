import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CText from "../../components/CText";
import Heading from "../../components/Heading";
import ImageHeader from "../../components/ImageHeader";
import MainWrapper from "../../components/MainWrapper";
import ParentWrapper from "../../components/ParentWrapper";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
} from "../../services/utilities/appFontSizes";
import { useTheme } from "../../services/utilities/appTheme";

const SelfieTime = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ParentWrapper>
      <ImageHeader image={appImages.selfieImage} />
      <MainWrapper
        enableScroll={true}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        colors={colors}
        showButton={true}
        onAboveButtonPress={() => router.navigate("/AuthStack/Congratulation")}
        onButtonPress={() => router.navigate("/AuthStack/BeforeSelfie")}
        buttonTitle={"Upload from camera"}
        changeMainContainerStyle={heightPixel(50)}
        showAboveButton={true}
        aboveButtonTitle={"Upload from gallery"}
      >
        <View style={styles.textContainer}>
          <Heading
            textStyle={styles.headingTextStyle}
            containerStyle={styles.headingContainer}
            title={"Selfie Time!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.descriptionText}
            title={
              "Upload your profile photo. You will be\n able to change it later at any time."
            }
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default SelfieTime;

const styles = StyleSheet.create({
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headingTextStyle: {
    fontSize: fontPixel(28),
    fontFamily: FontFamily.BalooRegular,
  },
  headingContainer: {
    marginTop: hp(4),
    marginBottom: hp(1),
  },
  descriptionText: {
    marginVertical: hp(2),
  },
  buttonStyle: {
    backgroundColor: "#ffffff",
  },
  buttonTextStyle: {
    color: "#121212",
  },
});
