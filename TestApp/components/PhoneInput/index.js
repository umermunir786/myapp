import { forwardRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { FontFamily } from "../../constants/Fonts";
import {
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
  wp,
} from "../../services/utilities/appFontSizes";

const PhoneInputWithCountryCode = forwardRef(
  (
    {
      colors,
      title,
      value,
      countryCode = "PH",
      setValue,
      setValueTwo,
      setValueThree,
      errorText,
      placeholder = "Enter phone number",
      setPlaceholder,
    },
    ref
  ) => {
    return (
      <View>
        <View
          style={[
            styles.container,
            { marginBottom: title ? heightPixel(38) : heightPixel(2) },
          ]}
        >
          {title && <Text style={styles.title}>{title}</Text>}
          <View>
            {/* <Image
              source={appImages.dropDown}
              contentFit="contain"
              style={[styles.arrowStyle, {}]} // yellow arrow
            /> */}

            <View
              style={{
                height: "70%",
                width: wp(0.3),
                backgroundColor: "#D8DADC",
                position: "absolute",
                left: widthPixel(85),
                top: heightPixel(8),
                zIndex: 10,
              }}
            ></View>
            <PhoneInput
              containerStyle={styles.inputContainer}
              textContainerStyle={styles.inputTextContainer}
              codeTextStyle={styles.codeTextStyle}
              countryPickerButtonStyle={styles.countryButtonStyle}
              textInputStyle={styles.textInputStyle}
              disableArrowIcon={true}
              placeholder={placeholder}
              ref={ref}
              defaultValue={value}
              defaultCode={countryCode}
              disableCountryChange={true}
              layout={"second"}
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeCountry={(text) => {
                setValueTwo(text?.cca2);
                setValueThree(text?.callingCode);
              }}
              autoFocus={false}
              textInputProps={{
                placeholderTextColor: "#999", // placeholder gray
                selectionColor: "#FFD700",
                maxLength: 11, // 👈 Set your desired max length here
              }}
            />
          </View>
        </View>
        <View style={{ marginLeft: widthPixel(24) }}>
          {errorText ? (
            <View style={[title ? styles.pt7 : styles.pt5]}>
              <Text style={[styles.errorText, { color: "red" }]}>
                {errorText}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPixel(20),
    height: heightPixel(48),
    width: wp(100),
    marginTop: wp(10),
    marginBottom: heightPixel(14),
  },
  title: {
    fontFamily: FontFamily.NunitoRegular,
    fontSize: responsiveFontSize(2),
    lineHeight: heightPixel(24),
    paddingBottom: heightPixel(12),
  },
  inputContainer: {
    width: "100%",

    borderRadius: hp(1.8),
    borderWidth: 1.5,
    borderColor: "#FFD700", // yellow border
    backgroundColor: "#FFFCF0", // light cream background
  },
  inputTextContainer: {
    height: hp(5.5),
    paddingLeft: wp(-4),
    alignItems: "center",
    borderRadius: wp(16),
    marginTop: heightPixel(2),
    backgroundColor: "#FFFCF0", // same cream background
  },
  codeTextStyle: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.OutfitRegular,
    height: Platform.OS == "ios" ? heightPixel(25) : heightPixel(48),
    textAlignVertical: "center",
    color: "#292323",
  },
  countryButtonStyle: {
    justifyContent: "flex-start",
    paddingLeft: widthPixel(35),
    borderRadius: widthPixel(16),
    pointerEvents: "none",
  },
  textInputStyle: {
    height: heightPixel(48),
    alignItems: "center",
    fontSize: fontPixel(16),
    fontFamily: FontFamily.OutfitRegular,
    color: "#292323", // black text
    paddingLeft: wp(0),
  },
  pt5: {
    paddingTop: heightPixel(5),
  },
  pt7: {
    paddingTop: heightPixel(18),
  },
  errorText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FontFamily.NunitoRegular,
    // paddingHorizontal: widthPixel(20),
    marginTop: wp(1),
  },
  arrowStyle: {
    width: widthPixel(14),
    height: heightPixel(14),
    position: "absolute",
    left: widthPixel(62),
    top: heightPixel(18),
    zIndex: 10,
  },
});

export default PhoneInputWithCountryCode;
