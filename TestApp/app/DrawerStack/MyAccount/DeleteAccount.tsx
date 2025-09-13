import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface FavoriteUser {
  id: string;
  name: string;
  image: any;
  selected?: boolean;
}

const favoriteUsers: FavoriteUser[] = [
  {
    id: "1",
    name: "I was just curious.",
    image: appImages.payment1,
    selected: false,
  },
  {
    id: "2",
    name: "I met someone.",
    image: appImages.payment2,
    selected: false,
  },
  {
    id: "3",
    name: "I don’t have time.",
    image: appImages.payment3,
    selected: false,
  },
  {
    id: "4",
    name: "I didn’t like using the app.",
    image: appImages.payment4,
    selected: false,
  },
  {
    id: "5",
    name: "I didn’t feel safe.",
    image: appImages.payment5,
    selected: false,
  },
  {
    id: "6",
    name: "Something is broken.",
    image: appImages.payment6,
    selected: false,
  },
  {
    id: "7",
    name: "Other.",
    image: appImages.payment7,
    selected: false,
  },
];

const DeleteAccount = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState(favoriteUsers);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleSelection = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, selected: !user.selected }
        : { ...user, selected: false }
    );
    setUsers(updatedUsers);
  };

  const isAnySelected = users.some((user) => user.selected);

  const renderUserItem = ({
    item,
    index,
  }: {
    item: FavoriteUser;
    index: number;
  }) => (
    <Pressable
      style={[
        styles.userItem,
        {
          backgroundColor: item.selected ? colors.primary : colors.background,
        },
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      <View style={styles.userInfo}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.textContainer}>
            <CText
              title={`${item.name}`}
              fontSize={fontPixel(16)}
              color={"#22172A"}
              style={{ textAlign: "left" }}
              textStyle={{ textAlign: "left" }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.notificationButton,
          {
            backgroundColor: item.selected ? colors.primary : "#D9D9D9",

            width: wp(5),
            height: wp(5),
            borderRadius: wp(5),
            borderColor: item.selected ? "#292323" : "#D9D9D9",
          },
        ]}
        onPress={() => toggleSelection(item.id)}
      >
        {item.selected && (
          <Image
            source={appImages.tickCircleBlack}
            style={{
              height: wp(5),
              width: wp(5),
            }}
          />
        )}
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <ParentWrapper>
      <MainHeader
        backPress={() => {
          router.back();
        }}
        title={"Delete account"}
        containerStyle={{
          marginBottom: wp(4),
          backgroundColor: colors.primary,
        }}
        titleStyle={{ color: colors.text }}
      />
      <MainWrapper
        enableScroll={false}
        colors={colors}
        mainStyle={{ marginTop: wp(0) }}
        appImage={appImages.splashLogo}
        showButton={true}
        onAboveButtonPress={() => {
          setShowAlertModal(true);
        }}
        changeMainContainerStyle={heightPixel(50)}
        showAboveButton={true}
        aboveButtonTitle={"Delete Account"}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        buttonTitle="Cancel"
        onButtonPress={() => {}}
        disableAboveButton={!isAnySelected}
        dontApplyFlex={false}
        scrollEnabled={true}
      >
        <CText
          title={"Help us improve. Why do you want to leave?"}
          fontSize={fontPixel(16)}
          fontWeight="bold"
          style={styles.titleStyle}
        />

        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          style={{
            borderBottomLeftRadius: wp(5),
            borderBottomRightRadius: wp(5),
          }}
          contentContainerStyle={[
            styles.listContainer,
            { backgroundColor: colors.background },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </MainWrapper>
      <AlertModal
        modalVisible={showAlertModal}
        closeModal={() => setShowAlertModal(false)}
        rightButtonText="Accept"
        leftButtonText="Reject"
        onPressLeft={() => setShowAlertModal(false)}
        onPressRight={() => {
          setShowAlertModal(false);
          setTimeout(() => {
            setModalVisible(true);
          }, 200);

          setTimeout(() => {
            setModalVisible(false);
            setTimeout(() => {
              router.navigate({ pathname: "/AuthStack/OnBoarding" });
            }, 200);
          }, 2000);
        }}
        title={"We don't want to lose you!"}
        description={
          "Please choose to stay and we will add 1000 free Elloo Credits."
        }
        buttons={true}
        // image={appImages.bellCircle}
        imageStyle={{}}
        titleStyle={{}}
      />
      <AlertModal
        modalVisible={modalVisible}
        image={appImages.circleTick}
        imageStyle={{ height: wp(30), width: wp(30), marginTop: -wp(15) }}
        // closeModal={() => setModalVisible(false)}
        title="Done!"
        titleStyle={{
          color: colors.black,
          fontSize: fontPixel(30),
          fontFamily: FontFamily.BalooRegular,
        }}
        description={"Your account has been deleted."}
        descriptionStyle={{
          fontFamily: FontFamily.NunitoRegular,
          fontSize: fontPixel(16),
          marginBottom: wp(10),
        }}
      />
    </ParentWrapper>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(4),
    flexGrow: 1,
    paddingBottom: wp(),
    paddingTop: wp(0.4),
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
    marginBottom: wp(5),
    borderRadius: wp(3),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: hp(3),
  },
  imageContainer: {
    marginRight: wp(3),
  },
  profileImage: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(2),
  },
  textContainer: {
    alignItems: "flex-start",
  },
  notificationButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#ffffff",
  },
  buttonTextStyle: {
    color: "#121212",
  },
  titleStyle: {
    marginVertical: wp(2),
    marginBottom: wp(6),
  },
});
