import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, hp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const FindPeople = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <ParentWrapper>
      <ImageHeader
        title={"Find Profile"}
        drawer
        backPress={() => {
          navigation.openDrawer();
        }}
        image={appImages.findGirl}
      />
      <MainWrapper
        enableScroll={true}
        buttonStyle={[{ backgroundColor: "#121212" }, styles.buttonStyle]}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          router.navigate({ pathname: "/DrawerStack/FindProfile/QRCode" });
        }}
        inputField
        fieldPress={() => {
          router.navigate({ pathname: "/DrawerStack/FindProfile/AddFavorite" });
        }}
        buttonTitle={"Chat"}
        changeMainContainerStyle={heightPixel(50)}
        showIcon
        // disableButton={true}
      >
        <View style={styles.text}>
          <Heading
            textStyle={{
              fontSize: fontPixel(28),
              fontFamily: FontFamily.BalooRegular,
            }}
            containerStyle={styles.heading}
            title={"Find Your Friend."}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={
              "Add someone you know to your\nFavorites. Enter their username below\nor scan their QR code."
            }
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default FindPeople;

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
  buttonStyle: {},
});
