import ParentWrapper from "@/components/ParentWrapper";
import { appImages, widthPixel, wp } from "@/services";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const ProfilePicture = () => {
  const handleRemoveImage = () => {
    console.log("remove image");
    router.back();
  };
  return (
    <ParentWrapper>
      <Image source={appImages.match4} style={styles.image} />
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveImage}>
        <Image source={appImages.cross} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image source={appImages.arrowCircle} style={styles.arrowLeft} />
        <Image source={appImages.arrowCircle} style={styles.arrowRight} />
      </View>
    </ParentWrapper>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: wp(4),
  },
  arrowLeft: {
    width: widthPixel(40),
    height: widthPixel(40),
    resizeMode: "contain",
  },
  arrowRight: {
    width: widthPixel(40),
    height: widthPixel(40),
    resizeMode: "contain",
    transform: [{ rotate: "180deg" }],
  },
  icon: {
    width: widthPixel(40),
    height: widthPixel(40),
  },
  removeButton: {
    position: "absolute",
    top: wp(15),
    left: wp(6),

    backgroundColor: "grey",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
