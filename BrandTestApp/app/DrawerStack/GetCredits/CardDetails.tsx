import AlertModal from "@/components/AlertModal";
import InputField from "@/components/InputField";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import {
  appImages,
  fontPixel,
  heightPixel,
  hp,
  useTheme,
  wp,
} from "@/services";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const CardDetails = () => {
  const { colors } = useTheme();

  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Validation functions
  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateCardNumber = (number) => {
    // Remove spaces and check if it's 16 digits
    const cleanNumber = number.replace(/\s/g, "");
    return cleanNumber.length === 16 && /^\d+$/.test(cleanNumber);
  };

  const validateExpiry = (exp) => {
    // Check format MM / YYYY
    const expiryRegex = /^(0[1-9]|1[0-2])\s\/\s\d{4}$/;
    if (!expiryRegex.test(exp)) return false;

    const [month, year] = exp.split(" / ").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  };

  const validateCvv = (cvvValue) => {
    return cvvValue.length === 3 && /^\d+$/.test(cvvValue);
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      const month = v.substring(0, 2);
      const year = v.substring(2, 6);
      if (year) {
        return `${month} / ${year}`;
      } else {
        return month;
      }
    }
    return v;
  };

  const handleCardNumberChange = (value) => {
    const formatted = formatCardNumber(value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (value) => {
    const formatted = formatExpiry(value);
    if (formatted.replace(/\s|\//g, "").length <= 6) {
      setExpiry(formatted);
    }
  };

  const handleCvvChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 3) {
      setCvv(numericValue);
    }
  };

  // Check if all fields are valid
  const isFormValid =
    validateName(nameOnCard) &&
    validateCardNumber(cardNumber) &&
    validateExpiry(expiry) &&
    validateCvv(cvv);

  return (
    <ParentWrapper>
      <MainHeader
        backPress={() => {
          router.back();
        }}
        title={"Card Details"}
        containerStyle={{
          marginBottom: wp(15),
          backgroundColor: colors.primary,
        }}
        titleStyle={{ color: colors.text }}
      />
      <MainWrapper
        mainStyle={{ marginTop: wp(0) }}
        colors={colors}
        showButton={true}
        changeMainContainerStyle={heightPixel(50)}
        buttonTitle="Confirm"
        onButtonPress={() => {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            setTimeout(() => {
              router.push({
                pathname: "/DrawerStack/GetCredits/GetCredits",
              });
            }, 100);
          }, 2000);
        }}
        disableButton={!isFormValid}
        scrollEnabled={true}
      >
        <View style={{ flex: 1 }}>
          <InputField
            title={"Name on card"}
            changeMainContainerStyle={{ marginVertical: hp(1) }}
            maxLength={35}
            onChangeText={setNameOnCard}
            value={nameOnCard}
            placeholder={"Olivia Rhye"}
            colors={colors}
          />
          <InputField
            title={"Card number"}
            changeMainContainerStyle={{ marginVertical: hp(1) }}
            maxLength={19} // 16 digits + 3 spaces
            onChangeText={handleCardNumberChange}
            value={cardNumber}
            placeholder={"1234 1234 1234 1234"}
            colors={colors}
            leftIcon={appImages.master}
            leftIconStyle={{ height: wp(5), width: wp(5) }}
            keyboardType="numeric"
          />
          <View style={{ flexDirection: "row" }}>
            <InputField
              title={"Expiry"}
              changeContainer={{ width: wp(40) }}
              changeMainContainerStyle={{ marginVertical: hp(1) }}
              maxLength={9} // MM / YYYY format
              onChangeText={handleExpiryChange}
              value={expiry}
              placeholder={"06 / 2024"}
              colors={colors}
              keyboardType="numeric"
            />
            <InputField
              changeContainer={{ width: wp(40) }}
              title={"CVV"}
              changeMainContainerStyle={{ marginVertical: hp(1) }}
              maxLength={3}
              onChangeText={handleCvvChange}
              value={cvv}
              placeholder={"•••"}
              colors={colors}
              keyboardType="numeric"
              secureTextEntry={true}
            />
          </View>
        </View>
      </MainWrapper>
      <AlertModal
        modalVisible={modalVisible}
        image={appImages.circleTick}
        imageStyle={{ height: wp(30), width: wp(30), marginTop: -wp(15) }}
        // closeModal={() => setModalVisible(false)}
        title="Success!"
        titleStyle={{
          color: colors.black,
          fontSize: fontPixel(30),
          fontFamily: FontFamily.BalooRegular,
        }}
        description={"The transaction was completed."}
        descriptionStyle={{
          fontFamily: FontFamily.NunitoRegular,
          fontSize: fontPixel(16),
          marginBottom: wp(10),
        }}
      />
    </ParentWrapper>
  );
};

export default CardDetails;

const styles = StyleSheet.create({});
