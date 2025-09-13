import { Image } from "expo-image";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { appImages } from "../../services/utilities/appAssets";
import { fontPixel, wp } from "../../services/utilities/appFontSizes";
import CText from "../CText";

const { width } = Dimensions.get("window");

const CustomModal = ({
  visible,
  onClose,
  title = "Click on the menu icon and then\nselect Search!",
  description = "Find new friends that have time to chat\nor to meet in person today.",
  image = appImages.exclaimCircle,
}) => {
  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Image source={image} style={styles.exclaim} />

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={appImages.x} style={styles.closeIcon} />
            </TouchableOpacity>
            <CText
              title={title}
              fontSize={fontPixel(16)}
              fontWeight="bold"
              style={styles.titleText}
            />
            <CText
              title={description}
              fontSize={fontPixel(16)}
              style={styles.descriptionText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    alignItems: "center",
  },
  iconWrapper: {
    // position: "absolute",
    // top: wp(5),
    // zIndex: 2,
    // borderRadius: wp(10),
    // padding: 4,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: wp(6),
    paddingHorizontal: wp(4),
    width: wp(90),
    alignItems: "center",
    position: "relative",
    marginTop: wp(5),
  },
  closeButton: {
    position: "absolute",
    right: 18,
    top: 18,
    zIndex: 3,
  },
  titleText: {
    marginTop: wp(5),
    // marginTop: wp(10),
    textAlign: "center",
    color: "#121212",
  },
  descriptionText: {
    color: "#121212",
    // marginTop: 12,
    marginTop: wp(5),

    textAlign: "center",
  },
  exclaim: {
    height: wp(13),
    width: wp(13),
    resizeMode: "contain",
  },
  closeIcon: {
    height: wp(5),
    width: wp(5),
    contentFit: "contain",
  },
});

export default CustomModal;
