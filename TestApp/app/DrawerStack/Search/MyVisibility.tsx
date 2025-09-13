import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages, fontPixel, useTheme, wp } from "@/services";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";

const MyVisibility = () => {
  const { colors } = useTheme();

  const [visibility, setVisibility] = useState({
    everyone: true,
    onlyFavorites: false,
    everyoneExceptFavorites: false,
  });

  const toggleSwitch = (name: string) => {
    if (visibility[name] === false) {
      setVisibility({
        everyone: name === "everyone",
        onlyFavorites: name === "onlyFavorites",
        everyoneExceptFavorites: name === "everyoneExceptFavorites",
      });
    }
  };

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"My Visibility"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        onButtonPress={() =>
          router.navigate({ pathname: "/DrawerStack/Search/BoostProfile" })
        }
        buttonTitle={"Next"}
      >
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {/* Status Icon */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors?.transparent },
              ]}
            >
              <Image
                source={appImages?.circleTick} // Replace with your tick image path
                style={styles.tickIcon}
              />
            </View>

            <Text style={styles.heading}>My profile is visible to:</Text>

            {/* Switches for visibility options */}
            <View style={styles.optionContainer}>
              <Text style={styles?.text}>Everyone</Text>
              <Switch
                value={visibility.everyone}
                onValueChange={() => toggleSwitch("everyone")}
                trackColor={{ false: "#F0F3F5", true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.optionContainer}>
              <Text style={styles?.text}>Only Favorites</Text>
              <Switch
                value={visibility.onlyFavorites}
                onValueChange={() => toggleSwitch("onlyFavorites")}
                trackColor={{ false: "#F0F3F5", true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.optionContainer}>
              <Text style={styles?.text}>Everyone except Favorites</Text>
              <Switch
                value={visibility.everyoneExceptFavorites}
                onValueChange={() => toggleSwitch("everyoneExceptFavorites")}
                trackColor={{ false: "#F0F3F5", true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(4),

    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    padding: wp(5),
    paddingTop: wp(0),
    borderRadius: wp(5),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    alignSelf: "center",

    borderRadius: wp(20),
  },
  tickIcon: {
    marginTop: -wp(15),
    marginBottom: wp(5),

    height: wp(30),
    width: wp(30),
  },
  heading: {
    fontFamily: FontFamily?.NunitoBold,
    fontSize: fontPixel(16),
    textAlign: "left",
    marginBottom: wp(3),
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: wp(1),
  },
  text: {
    fontFamily: FontFamily?.NunitoMedium,
    fontSize: fontPixel(16),
  },
});

export default MyVisibility;
