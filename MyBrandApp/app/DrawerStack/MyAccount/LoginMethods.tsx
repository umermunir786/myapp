import { router, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

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
import { useState } from "react";

const LoginMethods = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const [isLastSignIn, setisLastSignIn] = useState<string>("phone");
  const array = [
    {
      image: appImages.google,
      title: "Continue with Google",
    },
    {
      image: appImages.fb,
      title: "Continue with Facebook",
    },
  ];
  const googleArray = [
    {
      image: appImages.google,
      title: "You last signed in with Google",
    },
    {
      image: appImages.fb,
      title: "Continue with Facebook",
    },
  ];
  return (
    <ParentWrapper>
      <ImageHeader image={appImages.onboarding1} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        showGoogleButton={true}
        array={isLastSignIn === "phone" ? array : googleArray}
        onButtonPress={() => {
          if (isLastSignIn === "phone") {
            setisLastSignIn("google");
          } else {
            router.back();
          }
        }}
        buttonTitle={
          isLastSignIn === "phone"
            ? "You last signed in with phone"
            : "Continue with phone"
        }
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

export default LoginMethods;

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
