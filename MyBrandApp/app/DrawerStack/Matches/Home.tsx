import CustomModal from "@/components/CustomModal";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, wp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import CText from "../../../components/CText";

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

const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.image}
      style={[styles.card, { width: CARD_WIDTH }]}
    >
      <Pressable
        onPress={() => {
          router.navigate({ pathname: "/DrawerStack/Matches/ProfileDetails" });
        }}
        style={styles.overlay}
      >
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CText
            color="#fff"
            fontWeight="bold"
            fontSize={fontPixel(20)}
            title={`${item.name}, `}
          />
          <CText color="#fff" fontSize={fontPixel(20)} title={item.age} />
          <View
            style={{
              marginHorizontal: wp(1),
              backgroundColor: colors.online,
              borderRadius: wp(3),
              height: wp(2),
              width: wp(2),
            }}
          />
        </View>

        <View
          style={{
            borderRadius: wp(4),
            overflow: "hidden", // 🔑 Enables borderRadius clipping
            marginTop: wp(1),
            borderWidth: wp(0.2),
            borderColor: "#FFFFFF80",
            backgroundColor: "#FFFFFF36",
          }}
        >
          <BlurView
            intensity={24}
            tint="light"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: wp(1),
            }}
          >
            <Image source={appImages.profile} style={styles.cardDistance} />
            <CText
              title={`${item.distance} away`}
              color="#fff"
              style={[styles.distance]}
            />
          </BlurView>
        </View>
      </Pressable>
    </ImageBackground>
  );

  useEffect(() => {
    setTimeout(() => {
      //   setShowModal(true);
    }, 1000);
  }, []);

  return (
    <ParentWrapper>
      <MainHeader
        drawer
        backPress={() => {
          navigation.openDrawer();
        }}
        title={"Matches"}
        containerStyle={{ marginBottom: wp(0) }}
      />
      <MainWrapper
        enableScroll={true}
        colors={colors}
        navButton
        // showButton={true}
        navButtonPress={() => {
          setIsPlay(!isPlay);
        }}
        navImages={[
          appImages.sliders,
          isPlay ? appImages.play : appImages.pause,
          appImages.sort,
        ]}
        buttonTitle={"Search"}
        // changeMainContainerStyle={heightPixel(50)}
        mainStyle={{ marginTop: wp(0) }}
      >
        <View>
          <FlatList
            scrollEnabled={false}
            data={isPlay ? usersActive : users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.list}
          />
        </View>
      </MainWrapper>
      <CustomModal
        title="There are no matches yet."
        description={"Click on the menu icon and then\nselect Search."}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setTimeout(() => {
            navigation.openDrawer();
          }, 100);
        }}
      />
    </ParentWrapper>
  );
};

export default Home;

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
});
