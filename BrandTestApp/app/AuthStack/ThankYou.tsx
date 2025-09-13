import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CText from "../../components/CText";
import Heading from "../../components/Heading";
import ImageHeader from "../../components/ImageHeader";
import MainWrapper from "../../components/MainWrapper";
import ParentWrapper from "../../components/ParentWrapper";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  wp,
} from "../../services/utilities/appFontSizes";
import { useTheme } from "../../services/utilities/appTheme";

const ThankYou = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ParentWrapper>
      <ImageHeader image={appImages.thanks} />
      <MainWrapper
        buttonTitle={"Continue"}
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          router.navigate("/AuthStack/MyProfile");
        }}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.container}>
          <Heading
            textStyle={styles.headingText}
            containerStyle={styles.heading}
            title={"Thank You!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "Please tell us a bit about yourself so\n we can create your profile."
            }
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default ThankYou;

const styles = StyleSheet.create({
  container: {
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
