import CText from "@/components/CText";
import InputField from "@/components/InputField";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, wp } from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
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
  },
  {
    id: "2",
    name: "Alfredo Calzoni",
    age: 22,
    location: "Washington DC",
    image: appImages.person4,
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
  {
    id: "5",
    name: "Savanna Hall",
    age: 22,
    location: "Washington DC",
    image: appImages.person2,
    isOnline: false,
    notifications: true,
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
  },
];

const SearchFavorite = () => {
  const { colors } = useTheme();
  const navigation = useNavigation() as any;
  const [users, setUsers] = useState(favoriteUsers);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(favoriteUsers);

  // Search functionality
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const searchValue = searchText.toLowerCase();
        const userName = user.name.toLowerCase();
        const userLocation = user.location.toLowerCase();

        return (
          userName.includes(searchValue) || userLocation.includes(searchValue)
        );
      });
      setFilteredUsers(filtered);
    }
  }, [searchText, users]);

  const handleSearch = (text: string) => {
    setSearchText(text);
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

  const renderUserItem = ({ item }: { item: FavoriteUser }) => (
    <Pressable
      style={[styles.userItem, { backgroundColor: colors.background }]}
      onPress={() =>
        router.push({ pathname: "/DrawerStack/Favorites/RemoveFavorite" })
      }
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
        style={[
          styles.notificationButton,
          { backgroundColor: item.notifications ? "#D9D9D9" : "#292323" },
        ]}
        onPress={() => toggleNotifications(item.id)}
      >
        <Image
          source={item.notifications ? appImages.bellCross : appImages.belFill}
          style={{ height: wp(4), width: wp(4) }}
        />
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
        buttonStyle={{}}
        buttonTitle=""
      >
        <InputField
          maxLength={35}
          onChangeText={handleSearch}
          value={searchText}
          placeholder={"Enter username"}
          colors={colors}
          rightSearchIcon={true}
          onPressInputField={undefined}
          keyboardType="default"
          changeMainContainer={{ marginBottom: wp(5) }}
        />
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            { backgroundColor: colors.background },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </MainWrapper>
    </ParentWrapper>
  );
};

export default SearchFavorite;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(4),
    flexGrow: 1,
    paddingBottom: wp(20),
    marginTop: wp(0.2),
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
  textContainer: { alignItems: "flex-start" },
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
    width: wp(4),
    height: wp(4),
  },
});
