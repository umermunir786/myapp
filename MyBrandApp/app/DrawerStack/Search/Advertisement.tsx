import { appImages, wp } from "@/services";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Advertisement = () => {
  const videoSource = {
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });
  const handleRemoveVideo = () => {
    router.navigate({ pathname: "/DrawerStack/Search/Fantastic" });
  };

  return (
    <View style={{ flex: 1 }}>
      <VideoView
        style={styles.video}
        contentFit="cover"
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
      />
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveVideo}>
        <Image source={appImages.whiteCross} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Advertisement;

const styles = StyleSheet.create({
  video: {
    flex: 1,

    height: "100%",
    width: "100%",
  },
  removeButton: {
    position: "absolute",
    top: wp(15),
    right: wp(6),

    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  icon: {
    width: wp(10),
    height: wp(10),
    // position: "absolute",
    // top: StatusBar.currentHeight + wp(4) || 30,
    // left: wp(5),
  },
});
