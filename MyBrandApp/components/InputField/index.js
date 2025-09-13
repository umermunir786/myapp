import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  widthPixel,
  wp,
} from "../../services/utilities/appFontSizes";

const InputField = ({
  onPressInputField,
  colors,
  placeholder,
  keyboardType,
  hideValue,
  multiLineStatus,
  numberOfLinesToShow,
  isEditable,
  textAlign,
  value,
  onChangeText,
  changeInputStyle,
  title,
  leftIcon,
  leftIconStyle,
  rightEyeIcon,
  onPressEyeIcon,
  errorText,
  showPassword,
  changeContainer,
  onFocus,
  onBlur,
  changeMainContainer,
  maxLength,
  minLength,
  rightLocationIcon,
  secondTypeInput,
  rightFilterIcon,
  onPressFilterIcon,
  rightCalenderIcon,
  rightCalenderIconPress,
  rightClockIcon,
  rightLocationIcon2,
  rightSearchIcon,
  onPressSearchIcon,
  showDropDownIcon,
  dropDown,
  setDropDown,
  dropDownArray,
  OnPressDropDownItems,
  showSoftInputOnFocus,
  pointerEvents,
}) => {
  const [filteredArray, setFilteredArray] = useState(dropDownArray || []);

  useEffect(() => {
    if (dropDownArray) {
      const filtered = dropDownArray.filter((item) =>
        item?.data?.toLowerCase().includes(value?.toLowerCase())
      );
      setFilteredArray(filtered);
    }
  }, [value, dropDownArray]);

  return (
    <TouchableOpacity
      activeOpacity={onPressInputField ? 0.7 : 1}
      onPress={onPressInputField}
      style={[styles.mainContainer, changeMainContainer]}
    >
      {title && (
        <Text style={[styles.titleStyle, { color: colors.text2 }]}>
          {title}
        </Text>
      )}

      <View
        style={[
          styles.Container,
          {
            backgroundColor: secondTypeInput
              ? colors.inputBackground
              : colors.inputBackground,
            borderColor: secondTypeInput ? colors.primary : colors.primary,
            ...changeContainer,
          },
        ]}
      >
        {leftIcon && (
          <View>
            <Image
              source={leftIcon}
              contentFit="contain"
              style={[styles.leftIconStyle, leftIconStyle]}
            />
          </View>
        )}

        <TextInput
          placeholderTextColor={
            secondTypeInput ? colors.darkGrey : colors.darkGrey
          }
          showSoftInputOnFocus={showSoftInputOnFocus}
          selectionColor={colors.primary}
          secureTextEntry={hideValue}
          keyboardType={keyboardType}
          style={[
            styles.inputFieldStyle,
            { color: colors.black, ...changeInputStyle },
          ]}
          multiline={multiLineStatus}
          numberOfLines={numberOfLinesToShow}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          editable={isEditable}
          textAlignVertical={textAlign}
          onFocus={(e) => {
            setDropDown?.(true);
            onFocus?.(e);
          }}
          onBlur={onBlur}
          maxLength={maxLength}
          minLength={minLength}
          pointerEvents={pointerEvents}
        />
        {rightSearchIcon && (
          <TouchableOpacity onPress={onPressSearchIcon}>
            <Image
              source={appImages.magnify}
              contentFit="contain"
              style={[
                styles.rightIconStyle,
                {
                  tintColor: "#92979D",
                },
              ]}
            />
          </TouchableOpacity>
        )}
        {rightLocationIcon && (
          <Image
            source={appImages.locationPinPointIcon}
            contentFit="contain"
            style={[styles.rightIconStyle]}
          />
        )}
        {rightFilterIcon && (
          <TouchableOpacity activeOpacity={0.7} onPress={onPressFilterIcon}>
            <Image
              source={appImages.filterIcon}
              contentFit="contain"
              style={[styles.rightIconStyle]}
            />
          </TouchableOpacity>
        )}
        {rightCalenderIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={rightCalenderIconPress}
          >
            <Image
              source={appImages.calendar}
              contentFit="contain"
              style={[styles.rightIconStyle, { height: wp(7), width: wp(7) }]}
            />
          </TouchableOpacity>
        )}
        {rightClockIcon && (
          <Image
            source={appImages.ClockIcon}
            contentFit="contain"
            style={[styles.rightIconStyle]}
          />
        )}
        {rightLocationIcon2 && (
          <Image
            source={appImages.locationIcon}
            contentFit="contain"
            style={[styles.rightIconStyle]}
          />
        )}
        {showDropDownIcon && (
          <TouchableOpacity
            style={{}}
            activeOpacity={0.7}
            onPress={() => setDropDown(!dropDown)}
          >
            <Image
              source={appImages.downChevron}
              contentFit="contain"
              style={[
                styles.rightIconStyle,
                { height: wp(2), marginRight: wp(1) },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorText ? (
        <View style={styles.pt5}>
          <Text style={[styles.errorText, { color: "red" }]}>{errorText}</Text>
        </View>
      ) : null}

      {dropDown && filteredArray?.length > 0 && (
        <View
          style={[
            styles.dropDownMainView,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          {filteredArray.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  OnPressDropDownItems(item, index);
                  setDropDown(false);
                }}
                style={styles.dropDownStyleView}
              >
                <Text
                  style={[styles.dropDownTextStyle, { color: colors.darkGrey }]}
                >
                  {item.data}
                </Text>
                <Image
                  source={
                    item.selected
                      ? appImages.filledCircleIcon
                      : appImages.emptyCircleIcon
                  }
                  style={styles.tickStyle}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: heightPixel(0),
    marginHorizontal: widthPixel(20),
    rowGap: heightPixel(12),
    marginTop: wp(5),
  },
  Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: widthPixel(12),
    borderRadius: heightPixel(16),
    textAlign: "center",
    paddingHorizontal: widthPixel(20),
    width: "100%",
    height: heightPixel(56),
    borderWidth: wp(0.3),
  },
  inputFieldStyle: {
    width: "100%",
    flex: 1,
    fontSize: responsiveFontSize(2),
    height: heightPixel(48),
  },
  leftIconStyle: {
    width: widthPixel(20),
    height: heightPixel(20),
  },
  rightIconStyle: {
    width: widthPixel(24),
    height: heightPixel(24),
  },
  titleStyle: {
    fontSize: responsiveFontSize(2),
    lineHeight: heightPixel(24),
  },
  pt5: {
    paddingTop: heightPixel(5),
    marginLeft: widthPixel(8.6),
  },
  errorText: {
    fontSize: responsiveFontSize(1.6),
    paddingHorizontal: widthPixel(20),
  },
  dropDownMainView: {
    rowGap: heightPixel(20),
    borderRadius: widthPixel(32),
    paddingVertical: heightPixel(20),
    paddingHorizontal: widthPixel(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 2,
  },
  dropDownStyleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDownTextStyle: {
    fontFamily: FontFamily.NunitoRegular,
    fontSize: fontPixel(16),
    lineHeight: heightPixel(24),
  },
  tickStyle: {
    width: widthPixel(24),
    height: heightPixel(24),
    resizeMode: "contain",
  },
});

export default InputField;
