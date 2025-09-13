import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { useTheme } from "@/services";
import { appImages } from "@/services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "@/services/utilities/appFontSizes";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Fantastic = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ParentWrapper>
      <ImageHeader image={appImages.fantastic} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {}}
        buttonTitle={"Start"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.text}>
          <Heading
            textStyle={{
              fontSize: fontPixel(28),
              fontFamily: FontFamily.BalooRegular,
            }}
            containerStyle={styles.heading}
            title={"Fantastic!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "You can now view users that\nmatch your preferences who are also\navailable at the same time you are."
            }
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={"Say elloo and meet new\nfriends!"}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Fantastic;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: wp(6),
  },
  heading: {
    marginTop: hp(2),
    // marginBottom: hp(1),
  },
});
