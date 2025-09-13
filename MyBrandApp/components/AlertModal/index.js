import { Image } from "expo-image";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "../../services/utilities/appFontSizes";
import Button from "../Button";

const AlertModal = ({
  modalVisible,
  closeModal,
  title,
  description,
  image,
  leftButtonText = "Cancel",
  rightButtonText = "Allow",
  onPressLeft,
  onPressRight,
  imageStyle,
  buttons = false,
  titleStyle,
  descriptionStyle,
  check = false,
  tick = false,
  tickPress,
}) => {
  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={modalVisible}
      animationType="slide"
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={image || appImages.exclaimCircle}
              style={[styles.exclaim, imageStyle]}
            />

            {closeModal && (
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Image source={appImages.x} style={styles.closeIcon} />
              </TouchableOpacity>
            )}
            <Text style={[styles.modalTitle, titleStyle]}>
              {title || "Camera access required."}
            </Text>
            {description && (
              <Text style={[styles.modalMessage, descriptionStyle]}>
                {description ||
                  "Allow elloo to access the camera. This\nwill let you take photos and videos."}
              </Text>
            )}
            {check && (
              <View style={styles.CheckContainer}>
                <TouchableOpacity
                  onPress={tickPress}
                  style={[
                    styles.CheckIcon,
                    {
                      backgroundColor: tick ? "#FFD538" : "transparent",

                      borderColor: tick ? "#FFD538" : "#CBCACA",
                      height: wp(4.5),
                      width: wp(4.5),

                      borderWidth: wp(0.2),
                      borderRadius: wp(1.5),
                    },
                  ]}
                >
                  {tick && (
                    <Image source={appImages.tick} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkText}>{"Don’t show this again."}</Text>
              </View>
            )}
            {buttons && (
              <View
                style={[styles.buttonContainer, check && { marginTop: wp(2) }]}
              >
                <Button
                  modalButton
                  onPress={onPressLeft || closeModal}
                  children={leftButtonText}
                  changeContainerStyle={styles.leftButton}
                  buttonTextStyle={{
                    color: "#000",
                  }}
                />
                <Button
                  modalButton
                  onPress={onPressRight || closeModal}
                  children={rightButtonText}
                  changeContainerStyle={styles.rightButton}
                  buttonTextStyle={{
                    color: "#000",
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: wp(6),
    borderRadius: fontPixel(31),
    width: wp(90),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoBold,
    marginTop: wp(5),
    textAlign: "center",
  },
  modalMessage: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoRegular,
    textAlign: "center",
    marginTop: wp(4),
  },
  closeIcon: {
    height: wp(5),
    width: wp(5),
    contentFit: "contain",
  },
  exclaim: {
    height: wp(13),
    width: wp(13),
    resizeMode: "contain",
    marginTop: wp(7),
  },
  closeButton: {
    position: "absolute",
    right: 18,
    top: 18,
    zIndex: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(18),
    marginTop: wp(5),
    marginBottom: wp(2),
    paddingBottom: wp(0),
  },
  leftButton: {
    width: wp(35),
    paddingTop: heightPixel(0),
    height: hp(5.5),
    backgroundColor: "#fff",
  },
  rightButton: {
    width: wp(35),
    height: hp(5.5),
    backgroundColor: "#fff",
  },
  CheckContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(4),
    marginHorizontal: wp(1),
  },
  CheckIcon: {
    backgroundColor: "#FFD538",

    alignItems: "center",
    justifyContent: "center",

    marginRight: wp(2),
  },
  checkIcon: {
    height: wp(3),
    width: wp(3),
    resizeMode: "contain",
  },
  checkText: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoRegular,
    textAlign: "center",
  },
});

export default AlertModal;
