import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import {
  fontPixel,
  hp,
  widthPixel,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const users = [
  {
    id: "1",
    name: "Alexa",
    age: 26,
    distance: "9.2 km",
    image: appImages.match2,
  },
  {
    id: "2",
    name: "James",
    age: 29,
    distance: "3.8 km",
    image: appImages.match1,
  },
  {
    id: "3",
    name: "Jenny",
    age: 22,
    distance: "2.4 km",
    image: appImages.match3,
  },
  {
    id: "4",
    name: "Sean",
    age: 21,
    distance: "11.2 km",
    image: appImages.match4,
  },
  {
    id: "5",
    name: "Lunas",
    age: 22,
    distance: "1.3 km",
    image: appImages.person1,
  },
  {
    id: "6",
    name: "Zoe",
    age: 19,
    distance: "1.5 km",
    image: appImages.person2,
  },
];
const usersActive = [
  {
    id: "1",
    name: "Sophia",
    age: 20,
    distance: "1.3 km",
    image: appImages.person5,
  },
  {
    id: "2",
    name: "James",
    age: 20,
    distance: "1.3 km",
    image: appImages.person4,
  },
  {
    id: "3",
    name: "James",
    age: 20,
    distance: "1.3 km",
    image: appImages.person4,
  },
  {
    id: "4",
    name: "Savannah",
    age: 20,
    distance: "1.3 km",
    image: appImages.person3,
  },
  {
    id: "5",
    name: "Lunas",
    age: 22,
    distance: "1.3 km",
    image: appImages.person1,
  },
  {
    id: "6",
    name: "Zoe",
    age: 19,
    distance: "1.5 km",
    image: appImages.person2,
  },
];

const numColumns = 2;
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

const ProfileDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  return (
    <ParentWrapper>
      <MainWrapper
        enableScroll={true}
        colors={colors}
        navButton
        // showButton={true}
        navButtonPress={() => {
          setIsPlay(!isPlay);
        }}
        navImages={[
          appImages.shieldExclaim,
          appImages.baan,
          appImages.eyeClose,
          appImages.star,
          appImages.chat,
        ]}
      >
        <Pressable
          onPress={() => {
            router.navigate({
              pathname: "/DrawerStack/Matches/ProfilePicture",
            });
          }}
        >
          <ImageBackground
            style={{
              width: wp(100),
              height: hp(100),
              flexDirection: "column-reverse",
            }}
            source={appImages.match4}
          >
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                router.navigate({ pathname: "/DrawerStack/Matches/Home" });
              }}
            >
              <Image source={appImages.arrowCircle} style={styles.icon} />
            </TouchableOpacity>
            {/* Top header */}
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.backButton}>
                <Image source={appImages.leftArrow} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}></Text>
            </View>

            {/* Right side icons */}
            <View style={styles.sideIcons}>
              <Image source={appImages.gift} style={styles.sideIconImage} />
              <Text style={styles.iconText}>999.9k</Text>

              <Image
                source={appImages.databaseFill}
                style={styles.sideIconImage}
              />
              <Text style={styles.iconText}>10.1k</Text>
            </View>

            {/* Bottom Profile Detail Box */}
            <View style={styles.bottomContainer}>
              <Text style={styles.sectionText}>I am:</Text>
              <Text style={styles.detailText}>Female (bisexual)</Text>

              <Text style={styles.sectionText}>My partner is:</Text>
              <Text style={styles.detailText}>Male, 28 (straight)</Text>

              <Text style={styles.sectionText}>We are available:</Text>
              <Text style={styles.detailText}>6 pm - 10 pm</Text>

              <Text style={styles.sectionText}>We are interested in:</Text>
              <Text style={styles.detailText}>
                Gym{"\n"}Movies{"\n"}Bars
              </Text>
            </View>
            {/* Name, Age, Distance */}
            {/* <View style={styles.infoOverlay}>
            <Text style={styles.nameText}>Sophia, 20</Text>
            <Text style={styles.distanceText}>📍 1.3 km away</Text>
          </View> */}
          </ImageBackground>
        </Pressable>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    height: wp(50),
    borderRadius: wp(4),
    overflow: "hidden",
    margin: wp(2),
    backgroundColor: "#eee",
  },
  distance: { marginLeft: wp(1) },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: wp(15),
    left: wp(6),

    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  icon: {
    width: widthPixel(40),
    height: widthPixel(40),
    // position: "absolute",
    // top: StatusBar.currentHeight + wp(4) || 30,
    // left: wp(5),
  },
  overlay: {
    paddingHorizontal: wp(6),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  cardName: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: FontFamily.NunitoBold,
    fontSize: fontPixel(20),
    textAlign: "center",
  },
  cardDistance: {
    height: wp(2.8),
    width: wp(4),
  },
  topBar: {
    position: "absolute",
    top: hp(5),
    left: wp(5),
    right: wp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: wp(2),
  },
  icon: {
    width: wp(6),
    height: wp(6),
    resizeMode: "contain",
  },
  sideIcons: {
    position: "absolute",
    right: wp(4),
    top: hp(25),
    alignItems: "center",
  },
  sideIconImage: {
    width: wp(8),
    height: wp(8),
    marginBottom: wp(1),
    resizeMode: "contain",
    tintColor: "#fff",
  },
  iconText: {
    color: "#fff",
    fontSize: fontPixel(16),
    marginBottom: hp(2),
    fontFamily: FontFamily.NunitoBold,
  },
  infoOverlay: {
    position: "absolute",
    left: wp(5),
    bottom: hp(30),
  },
  nameText: {
    color: "#fff",
    fontSize: fontPixel(24),
    fontWeight: "bold",
    fontFamily: FontFamily.NunitoBold,
  },
  distanceText: {
    color: "#fff",
    fontSize: fontPixel(14),
    fontFamily: FontFamily.NunitoRegular,
    marginTop: hp(0.5),
  },
  bottomContainer: {
    backgroundColor: "#fff",
    padding: wp(5),
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    width: "100%",
  },
  sectionText: {
    fontFamily: FontFamily.NunitoBold,
    fontSize: fontPixel(14),
    color: "#000",
    marginTop: hp(1.5),
  },
  detailText: {
    fontFamily: FontFamily.NunitoRegular,
    fontSize: fontPixel(14),
    color: "#333",
    marginTop: hp(0.3),
  },
});
