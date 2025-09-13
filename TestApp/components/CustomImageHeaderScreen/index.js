// import { router } from "expo-router";
// import React from "react";
// import { StyleSheet, View } from "react-native";
// import CText from "../../components/CText";
// import Heading from "../../components/Heading";
// import ImageHeader from "../../components/ImageHeader";
// import MainWrapper from "../../components/MainWrapper";
// import ParentWrapper from "../../components/ParentWrapper";
// import { FontFamily } from "../../constants/Fonts";
// import { appImages } from "../../services/utilities/appAssets";
// import {
//   fontPixel,
//   heightPixel,
//   wp,
// } from "../../services/utilities/appFontSizes";
// import { useTheme } from "../../services/utilities/appTheme";

// const ImageHeaderScreen = () => {
//   const { colors } = useTheme();
//   return (
//     <ParentWrapper>
//       <ImageHeader image={appImages.selfieImage} />
//       <MainWrapper
//         enableScroll={true}
//         buttonStyle={{ backgroundColor: "#ffffff" }}
//         buttonTextStyle={{ color: "#121212" }}
//         colors={colors}
//         showButton={true}
//         onAboveButtonPress={() => router.navigate("/AuthStack/Congratulation")}
//         onButtonPress={() => router.navigate("/AuthStack/BeforeSelfie")}
//         buttonTitle={"Upload from camera"}
//         changeMainContainerStyle={heightPixel(50)}
//         showAboveButton={true}
//         aboveButtonTitle={"Upload from gallery"}
//         // disableButton={true}
//       >
//         <View style={styles.text}>
//           <Heading
//             textStyle={{
//               fontSize: fontPixel(28),
//               fontFamily: FontFamily.BalooBold,
//             }}
//             containerStyle={styles.heading}
//             title={"Selfie Time!"}
//           />
//           <CText
//             fontSize={fontPixel(20)}
//             style={styles.title}
//             title={
//               "Upload your profile photo. You will be\n able to change it later at any time."
//             }
//           />
//         </View>
//       </MainWrapper>
//     </ParentWrapper>
//   );
// };

// export default ImageHeaderScreen;

// const styles = StyleSheet.create({
//   text: {
//     textAlign: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     marginVertical: wp(6),
//   },
//   heading: {
//     marginTop: wp(10),
//   },
// });
