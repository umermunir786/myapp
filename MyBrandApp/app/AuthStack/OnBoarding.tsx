import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  wp,
} from "../../services/utilities/appFontSizes/index";
import { useTheme } from "../../services/utilities/appTheme";

import CText from "../../components/CText";
import Heading from "../../components/Heading";
import ImageHeader from "../../components/ImageHeader";
import MainWrapper from "../../components/MainWrapper";
import ParentWrapper from "../../components/ParentWrapper";

const OnBoarding = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handlePress = () => {
    router.navigate("/AuthStack/SignUp");
  };

  return (
    <ParentWrapper>
      <ImageHeader image={appImages.onboarding1} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={handlePress}
        buttonTitle={"Continue"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.container}>
          <Heading
            textStyle={styles.headingText}
            containerStyle={styles.heading}
            title={"Welcome!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "Let's get you started. Create your\naccount and meet new friends today!"
            }
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: fontPixel(28),
    fontFamily: FontFamily.BalooRegular,
  },
  heading: {
    marginTop: wp(8),
  },
  title: {
    marginVertical: wp(6),
  },
});
