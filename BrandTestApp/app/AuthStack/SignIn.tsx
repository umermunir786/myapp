import { StyleSheet, View } from "react-native";
import { router, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  wp,
} from "../../services/utilities/appFontSizes";
import { useTheme } from "../../services/utilities/appTheme";

const SignIn = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  return (
    <ParentWrapper>
      <ImageHeader image={appImages.onboarding1} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        showGoogleButton={true}
        onButtonPress={() => router.navigate("/AuthStack/ThankYou")}
        buttonTitle={"Continue with phone"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.main}>
          <Heading
            textStyle={styles.headingText}
            containerStyle={styles.heading}
            title={"Login"}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  heading: {
    marginTop: wp(8),
    marginBottom: hp(1),
  },
  headingText: {
    fontSize: fontPixel(28),
    fontFamily: FontFamily.BalooRegular,
  },
});
