import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { router } from "expo-router";
import { FontFamily } from "../../constants/Fonts";
import { appImages } from "../../services/utilities/appAssets/index";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "../../services/utilities/appFontSizes";
import Button from "../Button";

const Camera = (props) => {
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [modalVisible, setModalVisible] = useState(!permission?.granted);

  if (!permission) {
    return <View />;
  }

  const closeModal = () => {
    setModalVisible(false);
    router.back(); // Navigate back to the previous screen
  };

  if (!permission.granted) {
    return (
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={appImages.exclaimCircle} style={styles.exclaim} />

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Image source={appImages.x} style={styles.closeIcon} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Camera access required.</Text>
              <Text style={styles.modalMessage}>
                {
                  "Allow elloo to access the camera. This\nwill let you take photos and videos."
                }
              </Text>
              <View
                style={{
                  // backgroundColor: "red",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginHorizontal: wp(18),
                  marginTop: wp(-1),
                  marginTop: wp(5),
                  marginBottom: wp(2),
                  paddingBottom: wp(0),
                }}
              >
                <Button
                  onPress={closeModal}
                  children="Cancel"
                  changeContainerStyle={{
                    width: wp(35),
                    paddingTop: heightPixel(0),
                    height: hp(5.5),
                    backgroundColor: "#fff",
                  }}
                  buttonTextStyle={{ color: "#000" }}
                />
                <Button
                  onPress={() => {
                    requestPermission();
                    setModalVisible(false);
                  }}
                  children="Allow"
                  changeContainerStyle={{
                    width: wp(35),

                    height: hp(5.5),
                    backgroundColor: "#fff",
                  }}
                  buttonTextStyle={{ color: "#000" }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({
        quality: 1,
        base64: false,
        exif: true,
        skipProcessing: false,
      });

      const image = {
        uri: photo.uri,
        name: `photo_${Math.random()}.jpeg`,
        type: "image/jpeg",
      };

      console.log("Captured Photo URI:", photo.uri);

      if (props.onCapture) {
        props.onCapture(image);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={(ref) => setCameraRef(ref)}
        focusable={true}
        style={styles.camera}
        facing={facing}
        mirror={true}
      >
        <Pressable style={styles.circle} onPress={() => router.back()}>
          <Image style={styles.circleImg} source={appImages.cross} />
        </Pressable>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}> */}
          <Pressable onPress={takePicture} style={styles.cameraBackGround}>
            <Image source={appImages.camereClick} style={styles.text} />
          </Pressable>
          {/* </TouchableOpacity> */}
        </View>
      </CameraView>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    top: wp(15),
    left: wp(6),

    height: wp(10),
    width: wp(10),
  },
  circleImg: {
    height: wp(10),
    width: wp(10),
  },
  cameraBackGround: {
    // borderColor: "#165E00",
    // borderWidth: wp(1),
    // borderRadius: wp(9),
    // backgroundColor: "#FFFFFF",
    // height: wp(18),
    // width: wp(18),

    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: wp(20),
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    height: wp(18),
    width: wp(18),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    // paddingVertical: wp(6),
    // paddingBottom: wp(4),
    paddingHorizontal: wp(6),
    borderRadius: fontPixel(31),
    width: wp(90),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoBold,
    marginTop: wp(5),
  },
  modalMessage: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoRegular,
    textAlign: "center",
    marginTop: wp(4),
    // marginBottom: wp(0),
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
    // marginVertical: wp(5),
    marginTop: wp(7),
  },
  closeButton: {
    position: "absolute",
    right: 18,
    top: 18,
    zIndex: 3,
  },
});
