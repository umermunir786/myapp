import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../constants/Fonts";
import { fontPixel } from "../../services/utilities/appFontSizes";

const CText = ({
  title,
  style,
  color = "#121212",
  fontWeight = "normal", // options: normal, bold, semi
  fontSize = fontPixel(14),
  textStyle,
}) => {
  const getFontFamily = (weight) => {
    switch (weight) {
      case "bold":
        return FontFamily.NunitoBold;
      case "semi":
      case FontFamily.NunitoSemiBold:
      case "600":
        return FontFamily.NunitoSemiBold;
      case "baloo":
        return FontFamily.BalooRegular;
      case "medium":
        return FontFamily.NunitoMedium;
      default:
        return FontFamily.NunitoRegular;
    }
  };

  return (
    <View style={[styles.main, style]}>
      <Text
        style={[
          styles.default,
          {
            color,
            fontSize,
            fontFamily: getFontFamily(fontWeight),
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    color: "#000000",
    fontSize: fontPixel(14),
    fontFamily: "NunitoRegular",
    textAlign: "center",
  },
  main: {
    alignItems: "center",
  },
});

export default CText;
