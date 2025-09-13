import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, StyleSheet, Switch, View } from "react-native";

import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import InputField from "@/components/InputField";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import {
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";

const MyProfile = () => {
  const { colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [user, setUser] = useState("");
  const [dobError, setDobError] = useState(false);

  const [dropDown, setDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cityList, setCityList] = useState([
    { data: "Cagayan de Oro", selected: false },
    { data: "Cebu City", selected: false },
    { data: "Antipolo", selected: false },
    { data: "Bacolod", selected: false },
  ]);

  const handleSelectCity = (item, index) => {
    const updatedList = cityList.map((city, i) => ({
      ...city,
      selected: i === index,
    }));
    setCityList(updatedList);
    setSelectedCity(item.data);
    setIsEnabled(false);
    setDropDown(false);
  };

  const handleDateChange = (txt) => {
    // If user is deleting (backspace), don't auto-format
    if (txt.length < dob.length) {
      setDob(txt);
      setDobError("");
      return;
    }

    // Remove all non-digit characters
    const cleanedInput = txt.replace(/\D/g, "");

    let formattedDate = "";

    // Format the input
    if (cleanedInput.length >= 1) {
      formattedDate = cleanedInput.slice(0, 1);
      if (cleanedInput.length >= 2) {
        formattedDate = `${cleanedInput.slice(0, 2)}/`;
        if (cleanedInput.length >= 3) {
          formattedDate += cleanedInput.slice(2, 3);
          if (cleanedInput.length >= 4) {
            formattedDate = `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(
              2,
              4
            )}/`;
            if (cleanedInput.length >= 5) {
              formattedDate += cleanedInput.slice(4, 8);
            }
          }
        }
      }
    } else {
      formattedDate = cleanedInput;
    }

    // Update state
    setDob(formattedDate);

    // Validate if full date is entered (MM/DD/YYYY)
    if (formattedDate.length === 10) {
      Keyboard.dismiss();
      validateAge(formattedDate);
    } else {
      setDobError("");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const validateAge = (dob) => {
    // Check if the date is in the correct format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dob)) {
      setDobError("Please enter a valid date in MM/DD/YYYY format.");
      return;
    }

    const parts = dob.split("/");
    const month = parseInt(parts[0], 10) - 1; // Months are 0-based
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Basic validation for day, month, and year ranges
    if (month > 11 || month < 0) {
      setDobError("Invalid month.");
      return;
    }

    if (day < 1 || day > 31) {
      setDobError("Invalid day.");
      return;
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      setDobError("Invalid year.");
      return;
    }

    const birthDate = new Date(year, month, day);

    // Check for valid date (e.g., leap years, February 30)
    if (
      birthDate.getDate() !== day ||
      birthDate.getMonth() !== month ||
      birthDate.getFullYear() !== year
    ) {
      setDobError("Invalid date.");
      return;
    }

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 18) {
      setDobError("You must be at least 18 years old.");
    } else {
      setDobError(""); // Clear error if valid
    }
  };
  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    if (newState === true) {
      setModalVisible(true);
    }
  };
  return (
    <ParentWrapper>
      <MainHeader title={"My Profile"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        disableButton={
          user.trim().length < 3 ||
          !!dobError ||
          dob.length !== 10 ||
          (!isEnabled && !selectedCity)
        }
        onButtonPress={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            router.navigate("/AuthStack/GenderSelection");
          }, 200);
        }}
        buttonTitle={"Next"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.row}>
          <CText
            fontSize={fontPixel(16)}
            fontWeight="bold"
            title={"My Location:"}
          />
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={styles.switchTrackColor(colors)}
            thumbColor={
              isEnabled
                ? styles.switchThumbActive.color
                : styles.switchThumbInactive.color
            }
          />
        </View>
        <InputField
          showDropDownIcon
          placeholder={"City"}
          colors={colors}
          value={selectedCity}
          onChangeText={setSelectedCity}
          dropDown={dropDown}
          setDropDown={setDropDown}
          dropDownArray={cityList}
          OnPressDropDownItems={handleSelectCity}
        />

        <InputField
          maxLength={35}
          onChangeText={(text) => setUser(text)}
          value={user}
          placeholder={"Username"}
          colors={colors}
        />
        <InputField
          maxLength={10}
          value={dob}
          keyboardType={"number-pad"}
          onChangeText={(value) => handleDateChange(value)}
          placeholder={"Date of birth (MM/DD/YYYY)"}
          colors={colors}
          errorText={dobError}
        />
      </MainWrapper>

      <AlertModal
        modalVisible={modalVisible}
        buttons
        closeModal={() => setModalVisible(false)}
        title="Enable location!"
        description={
          "This will allow us to access your current location, and list other users nearest to you."
        }
        onPressLeft={() => {
          setModalVisible(false);
          setIsEnabled(false);
        }}
        onPressRight={() => {
          setModalVisible(false);
          setSelectedCity("");
        }}
      />
    </ParentWrapper>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(3),
    paddingLeft: wp(2.5),
    marginTop: wp(12),
    marginBottom: wp(-2),
  },
  switchTrackColor: (colors) => ({
    false: "#ccc",
    true: colors.primary,
  }),
  switchThumbActive: {
    color: "#fff",
  },
  switchThumbInactive: {
    color: "#f4f3f4",
  },
  dropDownMainView: {
    rowGap: heightPixel(20),
    paddingVertical: heightPixel(20),
    paddingHorizontal: widthPixel(20),
    borderRadius: widthPixel(16),
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 50,
    backgroundColor: "#FFFBEF",
    borderWidth: 1,
    borderColor: "#F9C940",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 200,
  },
  dropDownStyleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: heightPixel(8),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    width: "76%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    padding: wp(6),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconCircle: {
    backgroundColor: "#FFD600",
    padding: wp(5),
    borderRadius: 999,
    marginBottom: wp(3),
  },
  icon: {
    fontSize: fontPixel(26),
    height: wp(25.1),
    width: wp(26),
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    height: hp(5.5),
    borderRadius: heightPixel(12),
    marginTop: wp(4),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 23,
    elevation: 10,
  },
  buttonText: {
    fontFamily: FontFamily.NunitoSemiBold,
    fontSize: fontPixel(18),
    fontWeight: "600",
  },
});
