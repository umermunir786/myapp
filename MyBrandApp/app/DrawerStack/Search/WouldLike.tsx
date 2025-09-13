import CText from "@/components/CText";
import InputField from "@/components/InputField";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

const WouldLike = () => {
  const { colors } = useTheme();
  const [beach, setBeach] = useState("Beach");
  const [drinks, setDrinks] = useState("Drinks and karaoke");
  const [user, setUser] = useState("");

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"I Would Like To"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        disableButton={user.length < 3}
        onButtonPress={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            router.navigate({ pathname: "/DrawerStack/Search/Great" });
          }, 200);
        }}
        buttonTitle={"Next"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.row}>
          <CText
            fontSize={fontPixel(16)}
            fontWeight="bold"
            title={"What interests you?"}
          />
          <CText
            fontSize={fontPixel(16)}
            style={{ marginBottom: hp(3), marginTop: hp(1) }}
            title={
              "Enter some keywords below, such as karaoke,\ndinner date, beach, night out, hiking or anything\nelse you want to do together."
            }
          />
        </View>

        <InputField
          maxLength={35}
          onChangeText={(text) => setBeach(text)}
          value={beach}
          placeholder={"Enter here"}
          colors={colors}
        />
        <InputField
          maxLength={35}
          onChangeText={(text) => setDrinks(text)}
          value={drinks}
          placeholder={"Username"}
          colors={colors}
        />
        <InputField
          maxLength={35}
          onChangeText={(text) => setUser(text)}
          value={user}
          placeholder={"Enter here"}
          colors={colors}
        />
      </MainWrapper>
    </ParentWrapper>
  );
};

export default WouldLike;

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    marginHorizontal: wp(3),
    // paddingLeft: wp(2.5),
    marginTop: wp(12),
    marginBottom: wp(-2),
    textAlign: "center",
  },
});
