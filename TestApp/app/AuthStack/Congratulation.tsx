import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
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
  wp,
} from "../../services/utilities/appFontSizes";
import { useTheme } from "../../services/utilities/appTheme";

const Congratulation = () => {
  const { colors } = useTheme();

  return (
    <ParentWrapper>
      <ImageHeader image={appImages.cogratImage} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => router.navigate("/DrawerStack/Search/")}
        buttonTitle={"Start"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.text}>
          <Heading
            textStyle={styles.headingText}
            containerStyle={styles.heading}
            title={"Congratulations!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={"Your profile is ready to be shared with\nothers."}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Congratulation;

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
    marginTop: hp(4),
  },
  headingText: {
    fontSize: fontPixel(28),
    fontFamily: FontFamily.BalooRegular,
  },
});
