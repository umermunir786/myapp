import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../constants/Fonts";
import { fontPixel, wp } from "../../services/utilities/appFontSizes";

const Headers = ({ title = "", containerStyle }) => {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          marginVertical: wp(2),
        },
        containerStyle,
      ]}
    >
      <Text
        style={{
          fontFamily: FontFamily.BalooRegular,
          fontSize: fontPixel(24),
          color: "#121212",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({});
