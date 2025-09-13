import InputField from "@/components/InputField";
import { SCREEN_HEIGHT, WINDOW_WIDTH } from "@/services";
import { Image } from "expo-image";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { appImages } from "../../services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "../../services/utilities/appFontSizes";
import Button from "../Button";
import CText from "../CText";
const MainWrapper = ({
  children,
  colors = { background: "#ffffff" },
  offset = 0,
  enableScroll = false,
  enableBackgroundImage = false,
  appImage,
  showButton,
  mainStyle,
  buttonStyle,
  buttonTitle,
  onButtonPress,
  disableButton,
  showGoogleButton,
  absolutePosition,
  showAboveButton,
  aboveButtonTitle,
  onAboveButtonPress,
  disableAboveButton,
  absoluteAbovePosition,
  dontApplyFlex,
  buttonTextStyle,
  scrollEnabled = true,
  navButton = false,
  navButtonPress,
  navImages = [appImages.magnify],
  showIcon = false,
  inputField = false,
  inputValue,
  onChangeText,
  fieldPress,
  array = [
    {
      image: appImages.google,
      title: "Continue with Google",
    },
    {
      image: appImages.fb,
      title: "Continue with Facebook",
    },
  ],
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={offset}
      style={[
        styles.mainView,
        mainStyle,
        { backgroundColor: colors.background, flex: dontApplyFlex ? 0 : 1 },
      ]}
    >
      {enableScroll ? (
        <ScrollView
          scrollEnabled={scrollEnabled}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scollView}
        >
          {children}
        </ScrollView>
      ) : enableBackgroundImage ? (
        <ImageBackground
          source={appImage?.authBackground}
          resizeMode="cover"
          style={[
            styles.mainView,
            {
              width: WINDOW_WIDTH,
              height: SCREEN_HEIGHT,
            },
          ]}
        >
          {enableScroll ? (
            <ScrollView
              scrollEnabled={scrollEnabled}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.mainView}
            >
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </ImageBackground>
      ) : (
        children
      )}
      {showAboveButton && (
        <Button
          colors={colors}
          onPress={onAboveButtonPress}
          disable={disableAboveButton}
          absolutePosition={absoluteAbovePosition}
          transparentWithJustBorder={true}
        >
          {showIcon && (
            <Image
              source={appImages.belFill}
              style={styles.icon}
              contentFit="contain"
            />
          )}
          {aboveButtonTitle || "Next"}
        </Button>
      )}
      {showGoogleButton && (
        <View>
          {array.map((item, index) => (
            <Pressable key={index} style={styles.button}>
              <Image style={styles.image} source={item.image} />
              <CText
                fontSize={fontPixel(16)}
                fontWeight="bold"
                title={item?.title}
                color="#292323"
              />
            </Pressable>
          ))}
        </View>
      )}
      {inputField && (
        <View style={{ position: "relative", marginBottom: hp(1.5) }}>
          <InputField
            isEditable={false}
            showSoftInputOnFocus={false}
            maxLength={35}
            onChangeText={onChangeText}
            value={inputValue}
            placeholder={"Enter username"}
            colors={colors}
            rightSearchIcon={true}
          />

          <Pressable style={styles.inputFieldPressable} onPress={fieldPress} />
        </View>
      )}
      {showButton && (
        <Button
          changeContainerStyle={buttonStyle}
          buttonTextStyle={buttonTextStyle}
          colors={colors}
          onPress={onButtonPress}
          disable={disableButton}
          absolutePosition={absolutePosition}
        >
          {showIcon ? (
            <Image
              source={appImages.qrCode}
              style={styles.icon}
              contentFit="contain"
            />
          ) : (
            buttonTitle || "Next"
          )}
        </Button>
      )}
      {navButton && (
        <View
          style={[
            styles.navContainer,
            {
              bottom: -bottom,

              paddingBottom: bottom + hp(0.5),
              paddingTop: hp(1),
              justifyContent: navImages.length === 1 ? "center" : "center",
            },
          ]}
        >
          {navImages.map((image, index) => (
            <Pressable
              key={index}
              style={styles.navButton}
              onPress={() => navButtonPress?.(index)}
            >
              <Image source={image} style={styles.navImage} />
            </Pressable>
          ))}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: wp(3),
  },
  scollView: {
    flexGrow: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.3),
    width: "90%",
    borderWidth: wp(0.2),
    marginVertical: hp(1),
    marginHorizontal: wp(5),
    borderRadius: heightPixel(12),
    backgroundColor: "#fff",
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonPhone: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: heightPixel(56),
    paddingHorizontal: wp(6),
    marginVertical: wp(2.5),
    marginHorizontal: wp(5),
    borderRadius: heightPixel(12),
    backgroundColor: "#292323",
    borderColor: "#292323",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 16,
  },
  image: {
    height: hp(4),
    width: hp(4),
    position: "absolute",
    left: wp(6),
  },
  orContainer: {
    alignItems: "center",
    marginVertical: wp(1),
  },
  navContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#292323",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  navButton: {
    padding: wp(2),
    marginHorizontal: wp(15),
  },
  navImage: {
    height: hp(3),
    width: hp(3),
    tintColor: "#fff",
  },
  icon: {
    height: hp(3),
    width: hp(3),
    tintColor: "#fff",
  },
  inputFieldPressable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MainWrapper;
