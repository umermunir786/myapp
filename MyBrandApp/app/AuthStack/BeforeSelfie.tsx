import Camera from "@/components/Camera";
import { appImages } from "@/services/utilities/appAssets/index";
import { wp } from "@/services/utilities/appFontSizes";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const BeforeSelfie = () => {
  const { id } = useLocalSearchParams();
  const [showCamera, setShowCamera] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = (capturedImage) => {
    setImage(capturedImage);
    setShowCamera(false);
    console.log(capturedImage);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setShowCamera(true);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera onCapture={handleCapture} />
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image?.uri }} style={styles.fullScreenImage} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemoveImage}
          >
            <Image source={appImages.cross} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
      {!showCamera && (
        <View style={styles.buttonAbsolute}>
          <Pressable
            onPress={() => {
              router.replace("/AuthStack/Congratulation");
            }}
            style={styles.cameraBackGround}
          >
            <ImageBackground source={appImages.cameraTick} style={styles.text}>
              <Image source={appImages.correct} style={styles.tick} />
            </ImageBackground>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BeforeSelfie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreenImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeButton: {
    position: "absolute",
    top: wp(15),
    left: wp(6),
    height: wp(10),
    width: wp(10),
    backgroundColor: "grey",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  icon: {
    width: wp(10),
    height: wp(10),
  },
  cameraBackGround: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    height: wp(18),
    width: wp(18),
    justifyContent: "center",
    alignItems: "center",
  },
  tick: {
    height: wp(10),
    width: wp(10),
    position: "absolute",
  },
  buttonAbsolute: {
    position: "absolute",
    bottom: wp(20),
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
