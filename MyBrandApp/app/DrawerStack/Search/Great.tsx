import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { useTheme } from "@/services";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, wp } from "@/services/utilities/appFontSizes";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Great = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ParentWrapper>
      <ImageHeader image={appImages.meet} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/Search/LookingFor" });
        }}
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
            title={"Great!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={"Now, tell us who you would\nlike to meet."}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Great;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: wp(6),
  },
  heading: {
    marginTop: wp(8),
  },
});
