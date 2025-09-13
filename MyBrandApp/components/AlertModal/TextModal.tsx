import { Image } from "expo-image";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "../../services/utilities/appFontSizes";
import Button from "../Button";
import CText from "../CText";

const TextModal = ({
  visible,
  onClose,
  onBuy,
  buttons,
  check,
  onPressLeft,
  onPressRight,
  leftButtonText,
  rightButtonText,
  closeModal,
}) => {
  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}
      animationType="fade"
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={appImages.x} style={styles.closeIcon} />
            </TouchableOpacity>

            {/* Title */}
            <CText
              title={"Summary"}
              fontSize={20}
              fontWeight="bold"
              style={styles.modalTitle}
            />

            {/* Summary rows */}
            <View style={styles.row}>
              <CText
                fontSize={16}
                fontWeight="medium"
                title={"Elloo Credits"}
              />
              <CText fontSize={16} fontWeight="medium" title={"10,000"} />
            </View>
            <View
              style={{
                height: hp(0.1),
                width: "100%",
                backgroundColor: "#DFE4EA",
              }}
            />
            <View style={styles.row}>
              <CText fontSize={16} fontWeight="medium" title={"Price"} />
              <CText fontSize={16} fontWeight="medium" title={"₱ 10,000"} />
            </View>
            <View
              style={{
                height: hp(0.1),
                width: "100%",
                backgroundColor: "#DFE4EA",
              }}
            />
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

export default TextModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
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
  closeButton: {
    position: "absolute",
    right: wp(4),
    top: wp(4),
    zIndex: 1,
  },
  closeIcon: {
    height: wp(5),
    width: wp(5),
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: fontPixel(20),
    fontFamily: FontFamily.NunitoBold,
    marginTop: wp(5),
    marginBottom: wp(4),
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: wp(2),
  },
  label: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoMedium,
    color: "#000",
  },
  value: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoMedium,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(18),
    marginTop: wp(7),
    marginBottom: wp(4),
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
