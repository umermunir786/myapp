import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontPixel, hp, wp } from "../../services/utilities/appFontSizes";

const ImageHeader = (props) => {
  const {
    bell,
    image,
    backPress,
    text = "",
    title = "",
    container,
    drawer,
  } = props;
  const { bottom } = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        styles.header,
        container,
        {
          backgroundColor: "#FFD539",
          height: hp(55) - bottom,

          // paddingTop: StatusBar.currentHeight,
          justifyContent: "center",
          alignItems: "center",
          // paddingHorizontal: wp(5),
          borderBottomLeftRadius: wp(12),
          borderBottomRightRadius: wp(12),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 10,
          marginBottom: wp(2),
        },
      ]}
    >
      {backPress ? (
        <View style={[styles.heading]}>
          <Pressable onPress={backPress}>
            {drawer ? (
              <Image
                style={{ height: wp(6), width: wp(6) }}
                source={require("@/assets/images/drawer.png")}
              />
            ) : (
              <Image
                style={{ height: wp(6), width: wp(6) }}
                source={require("@/assets/images/Back.png")}
              />
            )}
          </Pressable>

          <Text
            style={{
              color: "#232323",
              fontFamily: "BalooRegular",
              fontSize: fontPixel(24),
            }}
          >
            {title}
          </Text>

          {/* Spacer for balancing layout */}
          <Text
            style={{
              color: "#232323",
              fontFamily: "BalooRegular",
              fontSize: fontPixel(24),
              width: wp(6),
            }}
          >
            {" "}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            color: "#232323",
            fontFamily: "BalooRegular",
            fontSize: fontPixel(24),
          }}
        >
          {title}
        </Text>
      )}

      <View
        style={[
          styles.imageWrapper,
          { alignItems: backPress ? "center" : "center" },
        ]}
      >
        <Image style={styles.image} source={image} />
      </View>
    </SafeAreaView>
  );
};

export default ImageHeader;

const styles = StyleSheet.create({
  header: {},
  imageWrapper: {
    width: "100%",
  },
  image: {
    height: hp(35),
    width: hp(35),
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: wp(2),
  },
  chevron: {
    height: wp(6),
    width: wp(6),
    marginTop: wp(5),
    tintColor: "#FFFFFF",
    marginRight: wp(3.5),
  },
  bell: {
    flexDirection: "row",
    alignItems: "center",
  },
});
