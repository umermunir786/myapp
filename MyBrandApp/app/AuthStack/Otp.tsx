import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "../../services/utilities/appFontSizes";

import { api } from "../../network/Environment";
import { callApi, Method } from "../../network/NetworkManger";

import { useDispatch, useSelector } from "react-redux";
import CText from "../../components/CText";
import { FlashAlert } from "../../components/flashMessage";
import Heading from "../../components/Heading";
import MainHeader from "../../components/MainHeader";
import MainWrapper from "../../components/MainWrapper";
import ParentWrapper from "../../components/ParentWrapper";
import { FontFamily } from "../../constants/Fonts";
import { getDeviceId } from "../../services/helpingMethods";
import { useTheme } from "../../services/utilities/appTheme";
import {
  accessToken,
  refreshToken,
  userData,
} from "../../store/redux/Slices/Authslice";

const Otp = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.deviceToken);
  const routers = useLocalSearchParams();

  const [otpValue, setOtpValue] = useState("");
  const insets = useSafeAreaInsets();
  const [initialTime, setInitialTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResend, setIsResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpVerify = async () => {
    let id = await getDeviceId();
    if (otpValue === "" || otpValue === null) {
      FlashAlert("Please enter otp code");
    } else {
      try {
        setIsLoading(true);
        let endPoint =
          routers?.forgot == "1" ? api.verifyOtpForgot : api.otpVerify;
        const SignUpBody = {
          email: routers.email.toLowerCase(),
          otp: otpValue,
          device: { id: id, deviceToken: token },
        };
        const forgotBody = {
          email: routers.email.toLowerCase(),
          otp: otpValue,
        };
        let body = routers.forgot == "1" ? forgotBody : SignUpBody;
        console.log("otp-body", body, endPoint);
        await callApi(
          Method.POST,
          endPoint,
          body,
          (res) => {
            console.log("responseOtpVerify", res);
            dispatch(accessToken(res?.data?.token));
            dispatch(refreshToken(res?.data?.refreshToken));
            dispatch(userData(res?.data?.user));
            routers.forgot == "1"
              ? router.navigate({
                  pathname: "AuthStack/NewPassword",
                  params: {
                    type: routers.type,
                    email: routers?.email?.toLowerCase(),
                  },
                })
              : router.navigate({
                  pathname: "AuthStack/SignUpVerified",
                  params: {
                    type: routers.type,
                    email: routers?.email?.toLowerCase(),
                  },
                });
            setOtpValue("");
            setIsLoading(false);
          },
          (error) => {
            console.log("error", error);
            FlashAlert(error);
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const handleResend = async () => {
    if (timeLeft === 0) {
      setInitialTime(Date.now());
      setTimeLeft(60);
      setIsResend(true);
      // Add your resend OTP API call here
      // After API call completes:
      setIsResend(false);
    }
  };

  useEffect(() => {
    let interval;

    if (initialTime !== null) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - initialTime) / 1000);
        const remaining = 60 - elapsedSeconds;

        if (remaining <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [initialTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"Sign Up"} />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        showButton={true}
        disableButton={otpValue.length == "6" ? false : true}
        onButtonPress={() => router.navigate("/AuthStack/SignIn")}
        buttonTitle={"Verify"}
        changeMainContainerStyle={heightPixel(50)}
      >
        <View style={styles.container}>
          <Heading title={"Enter verification code."} />
          <CText
            style={styles.text}
            title={"Please enter the One-Time Passcode sent to:\n09******969"}
          />

          <CodeField
            value={otpValue}
            onChangeText={(txt) => {
              setOtpValue(txt);
              if (txt.length === 6) {
                Keyboard.dismiss();
              }
            }}
            cellCount={6}
            textInputStyle={styles.textInputStyle}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  styles.cellDynamic,
                  {
                    borderColor: colors.primary,
                    color: !isFocused ? "#000" : colors.primary,
                  },
                ]}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <View>
            <Text style={[styles.resendTime, { color: colors.primary }]}>
              {formatTime(timeLeft)}
            </Text>
            <TouchableOpacity
              disabled={timeLeft > 0 || isResend}
              onPress={handleResend}
            >
              {isResend ? (
                <ActivityIndicator style={styles.sendAgain} color={"#165E00"} />
              ) : (
                <Text
                  style={[
                    styles.sendAgain,
                    timeLeft > 0 || isResend
                      ? styles.sendAgainDisabled
                      : styles.sendAgainEnabled,
                  ]}
                >
                  {"Send again"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(3),
    paddingTop: wp(10),
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginVertical: wp(5),
    marginTop: wp(3),
  },
  textInputStyle: {
    textAlignVertical: "center",
    textAlign: "center",
  },
  cell: {
    width: hp(5.5),
    height: hp(6),
    borderRadius: wp(1),
    borderWidth: wp(0.3),
    backgroundColor: "#FFFCF2",
    color: "#FFD538",
    fontSize: fontPixel(16),
    fontFamily: "Nunito-Regular",
    textAlign: "center",
    marginHorizontal: wp(1.5),
    marginVertical: wp(5),
  },
  cellDynamic: {
    textAlignVertical: "center",
  },
  resendTime: {
    color: "#FFD538",
    fontFamily: FontFamily.NunitoMedium,
    fontSize: fontPixel(24),
    textAlign: "center",
    marginVertical: wp(3),
  },
  sendAgain: {
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(16),
    textAlign: "center",
    marginTop: wp(1),
  },
  sendAgainDisabled: {
    opacity: 1,
    color: "#ACACAC",
  },
  sendAgainEnabled: {
    opacity: 1,
    color: "#000",
  },
});
