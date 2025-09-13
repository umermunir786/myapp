import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CText from "../../components/CText";
import Heading from "../../components/Heading";
import MainHeader from "../../components/MainHeader";
import MainWrapper from "../../components/MainWrapper";
import ParentWrapper from "../../components/ParentWrapper";
import PhoneInputWithCountryCode from "../../components/PhoneInput";
import SmallMessageModel from "../../components/SmallMessageModel";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "../../services/utilities/appFontSizes";
import { useTheme } from "../../services/utilities/appTheme";

const SignUp = () => {
  const phone = useRef();
  const fcmToken = useSelector((state) => state?.auth?.fcmToken);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { type } = useLocalSearchParams();

  const [check, setCheck] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("PH");
  const [countryCodeNumber, setCountryCodeNumber] = useState(92);
  const [changePlaceholder, setChangePlaceholder] = useState("Phone number");
  const [errors, setErrors] = useState({});

  // ✨ Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Dummy descriptions — replace with your actual content
  const termsDescription = "This is the Terms and Conditions description.";
  const privacyDescription = "This is the Privacy Policy description.";

  // const handleSignUp = async () => {
  //   let deviceId = await getDeviceId();

  //   try {
  //     setIsLoading(true);
  //     const body = {
  //       email: email,
  //       password: password,
  //       role: type == 0 ? "competitor" : "promoter",
  //       device: { id: deviceId, deviceToken: fcmToken },
  //     };
  //     console.log("body", body);
  //     await callApi(
  //       Method.POST,
  //       api.signUp,
  //       body,
  //       (res) => {
  //         console.log("response", res);

  //         dispatch(accessToken(res?.data?.token));
  //         dispatch(refreshToken(res?.data?.refreshToken));
  //         dispatch(userData(res?.data?.user));

  //         router.navigate({
  //           pathname: "AuthStack/Otp",
  //           params: {
  //             forgot: "0",
  //             type: type,
  //             email: email,
  //           },
  //         });

  //         setTimeout(() => {
  //           setEmail("");
  //           setPassword("");
  //         }, 1000);

  //         setIsLoading(false);
  //       },
  //       (error) => {
  //         console.log("error", error);
  //         RedFlashMessage(error);
  //         setIsLoading(false);
  //       }
  //     );
  //   } catch (error) {
  //     console.log("catch-error", error);
  //     RedFlashMessage(error);
  //     setIsLoading(false);
  //   }
  // };

  const isValid = phone.current?.isValidNumber(phoneNumber);

  return (
    <ParentWrapper>
      <MainHeader title={"Sign Up"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        buttonTitle={"Continue"}
        disableButton={!check || !isValid}
        onButtonPress={() => {
          if (isValid) {
            Keyboard.dismiss();
            setTimeout(() => {
              router.navigate("/AuthStack/Otp");
            }, 200);
          }
        }}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.contentContainer}>
          <View style={styles.main}>
            <Heading title={"Enter your mobile number."} />
            <CText
              style={styles.text}
              title={"We will send a One-Time Passcode to your mobile\nnumber."}
            />
            <PhoneInputWithCountryCode
              maxLength={11}
              colors={colors}
              errorText={errors?.phoneNumber}
              ref={phone}
              value={phoneNumber}
              setValue={setPhoneNumber}
              countryCode={countryCode}
              setValueTwo={setCountryCode}
              countryCodeNumber={countryCodeNumber}
              setValueThree={setCountryCodeNumber}
              placeholder={changePlaceholder}
              setPlaceholder={setChangePlaceholder}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Pressable
              onPress={() => setCheck(!check)}
              style={[
                styles.check,
                { backgroundColor: check ? colors.black : colors.white },
              ]}
            >
              {check && (
                <Image style={styles.tickImage} source={appImages.tickSqure} />
              )}
            </Pressable>
            <Text style={styles.agreementText}>
              I am 18 years of age or older and agree to the {"\n"}
              <Text
                onPress={() => {
                  setModalTitle("Terms and Conditions");
                  setModalDescription(
                    "Lorem ipsum dolor sit amet consectetur. Posuere ultrices at dignissim mus. Libero ac ornare morbi risus duis elit tellus in in. Urna sodales maecenas nisi lacinia auctor congue eleifend. At egestas consequat orci sed. Purus in ut nunc nibh ante. Gravida vestibulum magna erat ultrices facilisis nec sit laoreet dictum. Erat rhoncus metus fusce in lobortis ut. Dui tellus in consequat lobortis faucibus. In non feugiat egestas mauris in. Consequat pharetra sit vestibulum sit massa fames. Nulla pellentesque sit cursus sodales eros et posuere eros. Viverra semper urna sed dui et neque neque. Risus morbi in nunc sed sed.Eget arcu sed at sem amet aliquam et tincidunt. Posuere arcu dolor faucibus vulputate pretium lacus nibh purus adipiscing. Vitae est urna sit nibh cursus. Quam arcu sem est at. Ut malesuada ac ut non gravida leo eget. Nunc sed quis odio lacus laoreet tempus turpis. Tempus enim ornare a proin ultricies egestas quis. Vel duis a viverra euismod. Sed mauris sed fringilla tempor erat amet. Imperdiet tincidunt tellus sed imperdiet. Et sit nullam nunc vel adipiscing.Consectetur sagittis viverra non ultricies. Pharetra facilisis dignissim habitasse tincidunt ut mi at. Sit eget commodo in fusce et elementum. Ultricies scelerisque tortor consectetur in. Non viverra lectus integer enim id."
                  );
                  setModalVisible(true);
                }}
                style={styles.linkText}
              >
                Terms and Conditions
              </Text>{" "}
              and{" "}
              <Text
                onPress={() => {
                  setModalTitle("Privacy Policy");
                  setModalDescription(
                    "Lorem ipsum dolor sit amet consectetur. Posuere ultrices at dignissim mus. Libero ac ornare morbi risus duis elit tellus in in. Urna sodales maecenas nisi lacinia auctor congue eleifend. At egestas consequat orci sed. Purus in ut nunc nibh ante. Gravida vestibulum magna erat ultrices facilisis nec sit laoreet dictum. Erat rhoncus metus fusce in lobortis ut. Dui tellus in consequat lobortis faucibus. In non feugiat egestas mauris in. Consequat pharetra sit vestibulum sit massa fames. Nulla pellentesque sit cursus sodales eros et posuere eros. Viverra semper urna sed dui et neque neque. Risus morbi in nunc sed sed.Eget arcu sed at sem amet aliquam et tincidunt. Posuere arcu dolor faucibus vulputate pretium lacus nibh purus adipiscing. Vitae est urna sit nibh cursus. Quam arcu sem est at. Ut malesuada ac ut non gravida leo eget. Nunc sed quis odio lacus laoreet tempus turpis. Tempus enim ornare a proin ultricies egestas quis. Vel duis a viverra euismod. Sed mauris sed fringilla tempor erat amet. Imperdiet tincidunt tellus sed imperdiet. Et sit nullam nunc vel adipiscing.Consectetur sagittis viverra non ultricies. Pharetra facilisis dignissim habitasse tincidunt ut mi at. Sit eget commodo in fusce et elementum. Ultricies scelerisque tortor consectetur in. Non viverra lectus integer enim id."
                  );
                  setModalVisible(true);
                }}
                style={styles.linkText}
              >
                Privacy Policy
              </Text>
              <Text style={styles.periodText}>.</Text>
            </Text>
          </View>
        </View>
      </MainWrapper>

      <SmallMessageModel
        onPressBack={() => setModalVisible(false)}
        colors={colors}
        visible={modalVisible}
        title={modalTitle}
        description={modalDescription}
        onClose={() => setModalVisible(false)}
      />
    </ParentWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "space-between",
    flex: 1,
  },
  main: {
    alignItems: "center",
    marginTop: wp(10),
  },
  text: {
    marginTop: wp(3),
    textAlign: "center",
  },
  container: {
    marginHorizontal: wp(3),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: hp(2),
    marginHorizontal: wp(7),
  },
  check: {
    height: wp(4.5),
    width: wp(4.5),
    borderColor: "#CBCACA",
    borderWidth: wp(0.2),
    borderRadius: wp(1.5),
    marginRight: wp(3),
    marginTop: wp(1.6),
    alignItems: "center",
    justifyContent: "center",
  },
  tickImage: {
    height: wp(5),
    width: wp(5),
  },
  agreementText: {
    color: "#292323",
    fontSize: fontPixel(14),
    fontFamily: "Nunito-Regular",
    lineHeight: wp(6),
  },
  linkText: {
    color: "#292323",
    fontFamily: FontFamily.NunitoBold,
    fontSize: fontPixel(14),
    textDecorationLine: "underline",
  },
  periodText: {
    color: "#292323",
    fontFamily: FontFamily.NunitoBold,
    fontSize: fontPixel(14),
    textDecorationLine: "none",
  },
  continue: {
    textAlign: "center",
    marginBottom: wp(3),
    color: "#575757",
  },
});
