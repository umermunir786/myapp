import AlertModal from "@/components/AlertModal";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages, tempImages } from "@/services";
import {
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MyPhotos = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [nav, setNav] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageData, setImageData] = useState([
    { id: "0", uri: tempImages.girl, profile: true },
    { id: "1", uri: tempImages.girl, profile: false },
    { id: "2", uri: tempImages.girl, profile: false },
    { id: "3", uri: tempImages.girl, profile: false },
  ]);

  const handleImagePress = (itemId: string) => {
    if (nav) {
      setSelectedImages((prev) => {
        if (prev.includes(itemId)) {
          return prev.filter((id) => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      });
    }
  };

  const handleLongPress = () => {
    setNav(true);
  };

  const handleNavButtonPress = (buttonIndex: number) => {
    if (buttonIndex === 1) {
      // Bin button (delete)
      if (imageData.length == 1) {
        setShowAlertModal(true);
      } else {
        setImageData((prev) =>
          prev.filter((item) => !selectedImages.includes(item.id))
        );
        setSelectedImages([]);
        setNav(false);
      }
    } else if (buttonIndex === 2) {
      // Return button (cancel)
      setSelectedImages([]);
      setNav(false);
    }
  };

  const renderImageItem = ({ item, index }: any) => {
    const isSelected = selectedImages.includes(item.id);
    const showTickForProfile = item.profile && !nav;
    const showSelectionRing = nav;

    return (
      <View style={styles.imageContainer}>
        <Pressable
          onPress={() => handleImagePress(item.id)}
          onLongPress={handleLongPress}
        >
          <ImageBackground
            source={item.uri}
            style={styles.imageStyle}
            imageStyle={{ resizeMode: "contain" }}
          >
            {showTickForProfile && (
              <Image
                source={appImages.personCircle}
                style={styles.profileBadge}
              />
            )}
            {showSelectionRing && (
              <Image
                source={isSelected ? appImages.tickCircle : appImages.ring}
                style={styles.ring}
              />
            )}
          </ImageBackground>
        </Pressable>
      </View>
    );
  };

  return (
    <ParentWrapper>
      <MainHeader backPress={() => router.back()} title={"My Photos"} />
      <MainWrapper
        enableScroll={true}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        colors={colors}
        showButton={!nav}
        navButton={nav}
        onAboveButtonPress={() => {}}
        onButtonPress={() => {}}
        buttonTitle={"Upload from camera"}
        changeMainContainerStyle={heightPixel(50)}
        showAboveButton={!nav}
        aboveButtonTitle={"Upload from gallery"}
        navButtonPress={handleNavButtonPress}
        navImages={[appImages.personCircle, appImages.bin, appImages.return]}
      >
        <View style={styles.textContainer}>
          <FlatList
            data={imageData}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            columnWrapperStyle={styles.rowStyle}
          />
        </View>
      </MainWrapper>
      <AlertModal
        modalVisible={showAlertModal}
        closeModal={() => setShowAlertModal(false)}
        title={
          "This photo cannot be deleted.\nYou need at least one profile picture."
        }
        titleStyle={[styles.headingTextStyle]}
        image={appImages.exclaimCircle}
      />
    </ParentWrapper>
  );
};

export default MyPhotos;

const styles = StyleSheet.create({
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  headingContainer: {
    marginTop: hp(4),
    marginBottom: hp(1),
  },
  descriptionText: {
    marginVertical: hp(2),
  },
  buttonStyle: {
    backgroundColor: "#ffffff",
  },
  buttonTextStyle: {
    color: "#121212",
  },
  flatListContainer: {
    // paddingHorizontal: widthPixel(20),
    // paddingTop: heightPixel(20),
  },
  rowStyle: {
    justifyContent: "space-between",
    marginBottom: heightPixel(20),
  },
  imageContainer: {
    width: (wp(100) - wp(8)) / 2,
    height: hp(25),
    borderRadius: widthPixel(8),
    overflow: "hidden",
    backgroundColor: "white",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  profileBadge: {
    width: wp(5),
    height: wp(5),
    position: "absolute",
    left: wp(6),
    top: wp(3),
  },
  ring: {
    width: wp(5),
    height: wp(5),
    position: "absolute",
    right: wp(6),
    top: wp(3),
  },
  headingTextStyle: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.NunitoMedium,
    marginBottom: wp(6),
  },
});
