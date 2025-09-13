import { appImages, heightPixel, widthPixel, wp } from "@/services";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Modal as RNModal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { Image } from "expo-image";
import { FontFamily } from "../../constants/Fonts";
import { fontPixel, hp } from "../../services/utilities/appFontSizes";
import Button from "../Button";
import Headers from "../Header";

const SmallMessageModel = ({
  colors,
  title,
  description,
  onClose,
  visible,
  onPressYes,
  onPressNo,
  yesImage = false,
  onPressBack,
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={"transparent"}
          barStyle={"dark-content"}
        />

        <SafeAreaView
          style={[styles.mainView, { backgroundColor: colors.white }]}
        >
          <ScrollView>
            <View style={{ marginHorizontal: wp(5), marginTop: wp(5) }}>
              <Headers title={title} />

              <Text
                style={[
                  styles.des,
                  {
                    color: "#121212",
                    fontFamily: FontFamily.NunitoMedium,
                    fontSize: fontPixel(16),
                    paddingBottom: heightPixel(26),
                    marginTop: wp(3),
                  },
                ]}
              >
                {description}
              </Text>
            </View>
            <Button onPress={onPressBack} children={"Back"} />
            <View style={styles.rowView}>
              <Pressable onPress={onPressYes}>
                {yesImage ? (
                  <ActivityIndicator color={colors?.parimary} size={wp(10)} />
                ) : (
                  <Image
                    source={appImages.yesCircle}
                    style={styles.imageStyle}
                    contentFit="contain"
                  />
                )}
              </Pressable>
              <Pressable onPress={onPressNo}>
                <Image
                  source={appImages.noCircle}
                  style={styles.imageStyle}
                  contentFit="contain"
                />
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    zIndex: 100,
  },
  extraView: {
    flex: 1,
    width: "100%",
  },
  mainView: {
    height: hp(96),
    width: wp(94),
    margin: wp(8),
    borderRadius: wp(6),
    alignItems: "center",
  },
  iconStyleView: {
    position: "absolute",
    top: heightPixel(30),
    right: widthPixel(20),
  },
  iconStyle: {
    width: widthPixel(18),
    height: heightPixel(18),
    contentFit: "contain",
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FontFamily.NunitoRegular,
    textAlign: "center",
    paddingBottom: heightPixel(16),
  },
  des: {
    textAlign: "justify",
    fontSize: responsiveFontSize(2),
    fontFamily: FontFamily.NunitoRegular,
    lineHeight: widthPixel(21),
  },
  imageStyle: {
    width: widthPixel(42),
    height: widthPixel(42),
  },
  imageStyle2: {
    width: widthPixel(20),
    height: widthPixel(20),
    marginTop: heightPixel(5),
    marginHorizontal: widthPixel(10),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: widthPixel(50),
  },
});

export default SmallMessageModel;

// --> 2  Simple Custom Modal

// import React from 'react'
// import { StyleSheet, Image, TouchableOpacity, Text, View, StatusBar} from 'react-native'
// import { appIcons, colors, fontFamily, heightPixel, widthPixel } from '../../services'
// import { responsiveFontSize } from 'react-native-responsive-dimensions'

// const SmallModelView = ({ title, des, onPress, firstButtontext, onPressFirstButton, secondButtontext, onPressSecondButton, showSmallModel}) => {
//     return (
//         showSmallModel ?
//             <View style={styles.container}>
//             <StatusBar translucent={true} backgroundColor={colors.transparent} barStyle={'dark-content'} />
//                 <View  style={styles.extraView} />
//                 <View style={styles.mainView}>
//                     <Text style={styles.title}>{title}</Text>
//                     <Text style={styles.des}>{des}</Text>
//                     <View style={{flexDirection:'row',columnGap:widthPixel(20),marginTop:heightPixel(20)}}>
//                         <TouchableOpacity onPress={onPressFirstButton} style={[styles.pillStyle]}>
//                           <Text style={styles.buttonTextStyle}>{firstButtontext}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={onPressSecondButton} style={[styles.pillStyle,{backgroundColor:colors.darkErrorColor,borderColor:colors.darkErrorColor}]}>
//                           <Text style={[styles.buttonTextStyle,{color:colors.white}]}>{secondButtontext}</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.iconStyleView}>
//                     <Image source={appIcons.crossIcon} style={styles.iconStyle}/>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.extraView} />
//             </View>
//             :
//             null
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         // backgroundColor: 'rgba(102,102,102,0.5)',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         alignItems: 'center',
//         height: '100%',
//         width: '100%',
//         position: 'absolute',
//         justifyContent: 'space-between',
//         zIndex:100,
//     },
//     extraView:{
//         flex: 1,
//         width: '100%',
//     },
//     mainView:{
//         width: '90%',
//         marginHorizontal: widthPixel(16),
//         paddingVertical: heightPixel(20),
//         backgroundColor: colors.white,
//         borderRadius: widthPixel(20),
//         alignItems: 'center'
//     },
//     iconStyleView:{
//         position:'absolute',
//         top:heightPixel(18),
//         right:widthPixel(20)
//     },
//     iconStyle:{
//         width: widthPixel(24),
//         height: heightPixel(24),
//         resizeMode: 'contain',
//     },
//     title:{
//         fontSize: responsiveFontSize(2.2),
//         fontFamily: fontFamily.appTextBold,
//         color: colors.black,
//         textAlign: 'center',
//         paddingBottom:heightPixel(20)
//     },
//     des:{
//         fontSize: responsiveFontSize(2),
//         fontFamily: fontFamily.appTextRegular,
//         color: '#475467',
//         textAlign: 'center',
//         lineHeight:widthPixel(22)
//     },
//     pillStyle:{
//         width:widthPixel(120),
//         height:heightPixel(40),
//         // paddingVertical:heightPixel(11),
//         backgroundColor:colors.white,
//         borderRadius:widthPixel(30),
//         borderWidth:1,
//         borderColor:'#B0B0B0',
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     buttonTextStyle:{
//         fontFamily:fontFamily.appTextSemiBold,
//         fontSize:responsiveFontSize(2),
//         color:'#B0B0B0',
//         textAlign:'center'
//     }

// })
// export default SmallModelView
