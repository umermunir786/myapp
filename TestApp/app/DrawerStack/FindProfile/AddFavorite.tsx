import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages, fontPixel, tempImages, useTheme, wp } from "@/services";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const favoriteUsers: FavoriteUser[] = [
  {
    id: "1",
    name: "Alexa Oliver",
    age: 22,
    location: "Washington DC",
    image: appImages.person5,
    isOnline: true,
    notifications: true,
  },
  {
    id: "2",
    name: "Alfredo Calzoni",
    age: 22,
    location: "Washington DC",
    image: tempImages.addFavoriteImage1,
    isOnline: true,
    notifications: true,
  },
  {
    id: "3",
    name: "Amina Mina",
    age: 22,
    location: "Washington DC",
    image: appImages.person3,
    isOnline: false,
    notifications: true,
  },
  {
    id: "4",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person1,
    isOnline: false,
    notifications: true,
  },
];
const AddFavorite = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState(favoriteUsers);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const renderUserItem = ({ item }: { item: FavoriteUser }) => (
    <Pressable
      style={[styles.userItem, { backgroundColor: colors.background }]}
      onPress={() => setShowAlertModal(true)}
    >
      <View style={styles.userInfo}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              contentFit="cover"
              style={styles.profileImage}
            />
            {item.isOnline && (
              <View
                style={[
                  styles.onlineIndicator,
                  { backgroundColor: colors.online },
                ]}
              />
            )}
          </View>
          <View style={styles.textContainer}>
            <CText
              title={`${item.name}, ${item.age}`}
              fontSize={fontPixel(18)}
              fontWeight="semi"
              color={"#22172A"}
              style={{ textAlign: "left" }}
              textStyle={{ textAlign: "left" }}
            />
            <CText
              title={item.location}
              fontSize={fontPixel(14)}
              color={"#797979"}
              style={styles.locationText}
              textStyle={{ textAlign: "left" }}
            />
            {item.lastMessage && (
              <CText
                title={item.lastMessage}
                fontSize={fontPixel(12)}
                color={colors.textSecondary}
                style={styles.messageText}
                textStyle={{}}
              />
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.notificationButton]}
        onPress={() => toggleNotifications(item.id)}
      >
        <Image
          source={
            item.notifications ? appImages.starOutline : appImages.starFill
          }
          style={{ height: wp(6), width: wp(6) }}
        />
      </TouchableOpacity>
    </Pressable>
  );
  const toggleNotifications = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, notifications: !user.notifications }
          : user
      )
    );
  };

  const handleYes = () => {
    setShowAlertModal(false);
  };

  const handleNo = () => {
    setShowAlertModal(false);
  };
  return (
    <ParentWrapper>
      <MainHeader
        containerStyle={{
          marginBottom: wp(4),
        }}
        backPress={() => router.back()}
        title={"Add To Favorites"}
      />
      <MainWrapper enableScroll={true} colors={colors}>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </MainWrapper>
      <AlertModal
        modalVisible={showAlertModal}
        closeModal={() => setShowAlertModal(false)}
        rightButtonText="Yes"
        leftButtonText="No"
        onPressLeft={handleYes}
        onPressRight={handleNo}
        title={
          "Would you like us to notify you\nwhenever this user is available?"
        }
        buttons={true}
        image={appImages.bellCircle}
        imageStyle={{}}
        titleStyle={{}}
      />
    </ParentWrapper>
  );
};

export default AddFavorite;

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    marginTop: wp(8),
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  listContainer: {
    paddingHorizontal: wp(4),
    flexGrow: 1,
    paddingBottom: wp(0),
    paddingTop: wp(0.4),

    backgroundColor: "white",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(4),
    marginTop: wp(0.2),
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
  },
  imageContainer: {
    marginRight: wp(3),
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2),
  },
  onlineIndicator: {
    position: "absolute",
    bottom: -wp(1.1),
    right: -wp(1.1),
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: "#fff",
  },
  textContainer: {
    alignItems: "flex-start",
  },
  locationText: {
    marginTop: wp(0.5),
    textAlign: "left",
  },
  messageText: {
    marginTop: wp(0.5),
  },
  notificationButton: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    width: wp(6),
    height: wp(6),
  },
});
