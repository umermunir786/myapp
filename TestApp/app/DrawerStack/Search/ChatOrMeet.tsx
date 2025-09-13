import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, hp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ChatOrMeet = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ParentWrapper>
      <ImageHeader image={appImages.meet} />
      <MainWrapper
        enableScroll={true}
        buttonStyle={{ backgroundColor: "#ffffff" }}
        buttonTextStyle={{ color: "#121212" }}
        colors={colors}
        showButton={true}
        onAboveButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/Search/AboutDisplay" });
        }}
        onButtonPress={() => {}}
        buttonTitle={"Chat"}
        changeMainContainerStyle={heightPixel(50)}
        showAboveButton={true}
        aboveButtonTitle={"Meet"}
        // disableButton={true}
      >
        <View style={styles.text}>
          <Heading
            textStyle={{
              fontSize: fontPixel(28),
              fontFamily: FontFamily.BalooRegular,
            }}
            containerStyle={styles.heading}
            title={"Chat Or Meet?"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "Would you just like to chat\nwith someone today, or meet in\nperson?"
            }
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default ChatOrMeet;

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
