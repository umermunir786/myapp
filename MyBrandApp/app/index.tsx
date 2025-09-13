import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [isSelect, setIsSelect] = useState(1);
  const [type, setType] = useState("Promotor");
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    BalooRegular: require("@/assets/fonts/baloo.regular.ttf"),
    BalooBold: require("@/assets/fonts/Baloo2-Bold.ttf"),
    NunitoRegular: require("@/assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Regular": require("@/assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("@/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("@/assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-Light": require("@/assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("@/assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("@/assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Black": require("@/assets/fonts/Nunito-Black.ttf"), // Fixed: removed .ttf extension
    "Nunito-BlackItalic": require("@/assets/fonts/Nunito-BlackItalic.ttf"), // Fixed: removed .ttf extension
    "Nunito-SemiBoldItalic": require("@/assets/fonts/Nunito-SemiBoldItalic.ttf"), // Fixed: removed .ttf extension
    "Outfit-Regular": require("@/assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("@/assets/fonts/Outfit-Medium.ttf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (loaded || error) {
        try {
          await SplashScreen.hideAsync();
          setShowCustomSplash(false);
          // Uncomment if you want to navigate to onboarding
          // router.replace("/AuthStack/OnBoarding");
        } catch (splashError) {
          console.warn("Error hiding splash screen:", splashError);
        }
      }
    };

    if (loaded || error) {
      const timer = setTimeout(() => {
        hideSplash();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loaded, error]);

  const handlePress = () => {
    router.navigate({ pathname: "/DrawerStack/Messages/MessagesTab" });
  };

  // Show loading screen if fonts are not loaded yet
  if (!loaded && !error) {
    return null; // This will keep the splash screen visible
  }

  // Handle font loading error
  if (error) {
    console.error("Font loading error:", error);
    // You might want to show an error screen or continue with default fonts
  }

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
        <View style={styles.text}>
          <Heading
            textStyle={{
              fontSize: fontPixel(28),
              fontFamily: FontFamily.BalooRegular,
            }}
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
}

const styles = StyleSheet.create({
  customSplashContainer: {
    flex: 1,
    backgroundColor: "#FFD539",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  customSplashImage: {
    width: 250,
    height: 250,
  },
  header: {
    marginTop: wp(25),
  },
  parent: {
    flex: 1,
  },
  text: {
    marginVertical: wp(3),
    fontFamily: "Nunito-ExtraBold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  mark: {
    fontFamily: "Nunito-Bold",
    fontSize: 12,
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(3),
  },
  chain: {
    alignItems: "center",
    marginLeft: wp(24),
    zIndex: 1,
  },
  underlineText: {
    textDecorationLine: "underline",
  },
  title: {
    marginVertical: wp(6),
  },
  heading: {
    marginTop: wp(8),
  },
});
