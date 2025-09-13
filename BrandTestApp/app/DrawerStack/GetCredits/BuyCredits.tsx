import TextModal from "@/components/AlertModal/TextModal";
import CText from "@/components/CText";
import Heading from "@/components/Heading";
import ImageHeader from "@/components/ImageHeader";
import InputField from "@/components/InputField";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, heightPixel, hp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const BuyCredits = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <ParentWrapper>
      <ImageHeader
        title={""}
        backPress={() => {
          router.back();
        }}
        image={appImages.BuyCreditImage}
      />
      <MainWrapper
        enableScroll={true}
        buttonStyle={[{ backgroundColor: "#121212" }, styles.buttonStyle]}
        colors={colors}
        showButton={true}
        onButtonPress={() => {
          setShowModal(true);
        }}
        disableButton={user === ""}
        buttonTitle={"Continue"}
        changeMainContainerStyle={heightPixel(50)}

        // disableButton={true}
      >
        <View style={styles.text}>
          <Heading
            textStyle={{
              fontSize: fontPixel(28),
              fontFamily: FontFamily.BalooRegular,
            }}
            containerStyle={styles.heading}
            title={"Buy Credits."}
          />
          <CText
            fontSize={fontPixel(20)}
            style={styles.title}
            title={"Minimum amount 25 credits.\n1 Elloo Credit = ₱ 1"}
          />
          <InputField
            changeMainContainerStyle={{ marginVertical: hp(1) }}
            maxLength={35}
            onChangeText={(text) => setUser(text)}
            value={user}
            keyboardType={"numeric"}
            placeholder={"Enter amount"}
            colors={colors}
          />
        </View>
      </MainWrapper>
      <TextModal
        buttons
        visible={showModal}
        onPressLeft={() => {
          setShowModal(false);
        }}
        onPressRight={() => {
          setShowModal(false);
          setTimeout(() => {
            router.navigate({
              pathname: "/DrawerStack/GetCredits/PaymentMethods",
            });
          }, 200);
        }}
        onClose={() => {
          setShowModal(false);
        }}
        leftButtonText={"Cancel"}
        rightButtonText={"Buy"}
      />
    </ParentWrapper>
  );
};

export default BuyCredits;

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
