import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, wp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const Awsome = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ParentWrapper>
      <ImageHeader
        //  backPress={() => router.back()}
        image={appImages.saturday}
      />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/Search/Availability" });
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
            title={"Awesome!"}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "What meetup activities or\nplaces interest you and what time\nare you available today?"
            }
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Awsome;

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
