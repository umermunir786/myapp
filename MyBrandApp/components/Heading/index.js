import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../constants/Fonts";
import { fontPixel, wp } from "../../services/utilities/appFontSizes";

const Heading = (props) => {
  const { title, textStyle, containerStyle } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        numberOfLines={props.numberOfLines}
        style={[styles.title, textStyle]}
      >
        {title}
      </Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginTop: wp(4),
  },
  title: {
    fontFamily: FontFamily.NunitoBold,
    fontSize: fontPixel(20),
    color: "#121212",
  },
});
