import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages } from "@/services/utilities/appAssets";
import {
  fontPixel,
  heightPixel,
  hp,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
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
  age: number;
  location: string;
  image: any;
  isOnline: boolean;
  notifications: boolean;
  lastMessage?: string;
  selected?: boolean;
}

const favoriteUsers: FavoriteUser[] = [
  {
    id: "1",
    name: "Alexa Oliver",
    age: 22,
    location: "Washington DC",
    image: appImages.person5,
    isOnline: true,
    notifications: true,
    selected: false,
  },
  {
    id: "2",
    name: "Alfredo Calzoni",
    age: 22,
    location: "Washington DC",
    image: appImages.person4,
    isOnline: true,
    notifications: true,
    selected: false,
  },
  {
    id: "3",
    name: "Amina Mina",
    age: 22,
    location: "Washington DC",
    image: appImages.person3,
    isOnline: false,
    notifications: true,
    selected: false,
  },
  {
    id: "4",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person1,
    isOnline: false,
    notifications: true,
    selected: false,
  },
  {
    id: "5",
    name: "Savanna Hall",
    age: 22,
    location: "Washington DC",
    image: appImages.person2,
    isOnline: false,
    notifications: true,
    selected: false,
  },
  {
    id: "6",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person5,
    isOnline: false,
    notifications: true,
    lastMessage: "",
    selected: false,
  },
  {
    id: "7",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person5,
    isOnline: false,
    notifications: true,
    lastMessage: "What about that new jacket if I...",
    selected: false,
  },
];

const RemoveFavorite = () => {
  const { colors } = useTheme();
  const navigation = useNavigation() as any;
  const [users, setUsers] = useState(favoriteUsers);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(favoriteUsers);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlertModal1, setShowAlertModal1] = useState(false);
  const [tickPress, setTickPress] = useState(false);
  const toggleSelection = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, selected: !user.selected }
        : { ...user, selected: false }
    );
    setUsers(updatedUsers);

    // Update filtered users as well
    const updatedFilteredUsers = filteredUsers.map((user) =>
      user.id === userId
        ? { ...user, selected: !user.selected }
        : { ...user, selected: false }
    );
    setFilteredUsers(updatedFilteredUsers);
  };

  const toggleNotifications = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, notifications: !user.notifications }
        : user
    );
    setUsers(updatedUsers);

    // Update filtered users as well
    const updatedFilteredUsers = filteredUsers.map((user) =>
      user.id === userId
        ? { ...user, notifications: !user.notifications }
        : user
    );
    setFilteredUsers(updatedFilteredUsers);
  };

  const handleNavButtonPress = (index: number) => {
    if (index === 0) {
      // Minus circle pressed - Remove selected items
      const selectedUsers = users.filter((user) => user.selected);
      if (selectedUsers.length === 0) {
        setShowAlertModal1(true);
        return;
      }

      setShowAlertModal(true);
    } else if (index === 1) {
      // Return button pressed
      // Alert.alert("Return", "Do you want to go back to the previous screen?", [
      //   { text: "Cancel", style: "cancel" },
      //   {
      //     text: "Yes",
      //     onPress: () => {
      //       router.back();
      //     },
      //   },
      // ]);
    }
  };

  const handleRemoveUsers = () => {
    const remainingUsers = users.filter((user) => !user.selected);
    setUsers(remainingUsers);
    setFilteredUsers(remainingUsers);
    setShowAlertModal(false);
  };

  const handleCancelSelection = () => {
    const unselectedUsers = users.map((user) => ({ ...user, selected: false }));
    setUsers(unselectedUsers);
    setFilteredUsers(unselectedUsers);
    setShowAlertModal(false);
  };

  const renderUserItem = ({ item }: { item: FavoriteUser }) => (
    <Pressable
      style={[
        styles.userItem,
        {
          backgroundColor: colors.background,
        },
      ]}
      onPress={() => {}}
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
                textStyle={{ textAlign: "left" }}
              />
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.notificationButton,
          {
            backgroundColor: item.selected ? "white" : "#D9D9D9",
            borderWidth: item.selected ? wp(0.5) : wp(0),
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
              height: wp(3.5),
              width: wp(3.5),
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
        title={"Favorites"}
        containerStyle={{
          marginBottom: wp(5),
          backgroundColor: colors.primary,
        }}
        titleStyle={{ color: colors.text }}
      />
      <MainWrapper
        enableScroll={false}
        colors={colors}
        mainStyle={{ marginTop: wp(0) }}
        appImage={appImages.splashLogo}
        showButton={false}
        changeMainContainerStyle={heightPixel(50)}
        buttonStyle={{}}
        buttonTitle=""
        onButtonPress={() => {}}
        disableButton={false}
        showGoogleButton={false}
        absolutePosition={false}
        showAboveButton={false}
        aboveButtonTitle=""
        onAboveButtonPress={() => {}}
        disableAboveButton={false}
        absoluteAbovePosition={false}
        dontApplyFlex={false}
        buttonTextStyle={{}}
        scrollEnabled={true}
        navImages={[appImages.minusCircle, appImages.return]}
        navButton={true}
        navButtonPress={handleNavButtonPress}
      >
        <View style={{ flex: 1, backgroundColor: "#292323" }}>
          <FlatList
            data={filteredUsers}
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
        </View>

        <View style={{ height: hp(7.4), backgroundColor: "#292323" }} />
      </MainWrapper>
      <AlertModal
        modalVisible={showAlertModal}
        closeModal={() => setShowAlertModal(false)}
        rightButtonText="Remove"
        leftButtonText="Cancel"
        onPressLeft={handleCancelSelection}
        onPressRight={handleRemoveUsers}
        title={
          "Are you sure you want to remove this\nuser from your favorites?"
        }
        buttons={true}
        image={null}
        imageStyle={{}}
        titleStyle={{}}
        tickPress={() => {
          setTickPress(!tickPress);
        }}
        check={true}
        tick={tickPress}
        check={true}
      />
      <AlertModal
        modalVisible={showAlertModal1}
        closeModal={() => setShowAlertModal1(false)}
        title={"No Selection"}
        description={"Please select users to remove from favorites."}
        image={null}
        imageStyle={{}}
        titleStyle={{}}
        descriptionStyle={{ marginBottom: wp(5) }}
      />
    </ParentWrapper>
  );
};

export default RemoveFavorite;

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
    textAlign: "left",
  },
  notificationButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    width: wp(4),
    height: wp(4),
  },
});
