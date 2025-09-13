import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily } from "../../constants/Fonts";
import {
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
} from "../../services/utilities/appFontSizes/index";
import { useTheme } from "../../services/utilities/appTheme";

const Button = ({
  color,
  changeMainContainerStyle,
  lablelStyle,
  disable,
  showBorder,
  changeContainerStyle,
  onPress,
  buttonTextStyle,
  children,
  type,
  absolutePosition,
  transparentWithJustBorder,
  modalButton = false,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        absolutePosition ? styles.postion : "",
        styles.mainContainer,
        {
          paddingBottom: transparentWithJustBorder ? heightPixel(10) : hp(3),
          ...changeMainContainerStyle,
          // Platform.OS == "ios" ? heightPixel(insets.bottom) : heightPixel(20),
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={disable}
        style={[
          {
            ...styles.container,
            backgroundColor: disable
              ? "#D2D2D2"
              : transparentWithJustBorder
              ? colors.button
              : type == "delete"
              ? colors.button
              : colors.button,
          },
          {
            borderWidth: widthPixel(0),
            borderColor: transparentWithJustBorder
              ? colors.button
              : colors.button,
            ...changeContainerStyle,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            modalButton ? styles.labelModal : styles.label,
            {
              color: transparentWithJustBorder ? colors.text : colors.text,
              ...lablelStyle,
            },
            buttonTextStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingTop: heightPixel(10),
    paddingHorizontal: widthPixel(20),
    // backgroundColor: "red",
  },
  postion: {
    position: "absolute",
    bottom: 0,
  },
  container: {
    width: "100%",
    height: hp(6.3),
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: heightPixel(12),

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 22,

    // Shadow for Android
    elevation: 16, // Closest match to 44px spread
  },
  label: {
    fontFamily: FontFamily.NunitoRegular,
    fontSize: fontPixel(18),
    lineHeight: heightPixel(24),
  },
  labelModal: {
    fontFamily: FontFamily.OutfitRegular,
    fontSize: fontPixel(18),
    lineHeight: heightPixel(24),
  },
});

export default Button;
