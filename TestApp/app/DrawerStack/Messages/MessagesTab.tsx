import AlertModal from "@/components/AlertModal";
import CText from "@/components/CText";
import MainHeader from "@/components/MainHeader";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { appImages } from "@/services/utilities/appAssets";
import { fontPixel, hp, wp } from "@/services/utilities/appFontSizes";
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

interface MessageUser {
  id: string;
  name: string;
  age: number;
  location: string;
  image: any;
  isOnline?: boolean;
  selected?: boolean;
  notifications?: boolean;
  lastMessage?: string;
}

const messageUsers: MessageUser[] = [
  {
    id: "1",
    name: "Alexa Oliver",
    age: 22,
    location: "Washington DC",
    image: appImages.person5,
    isOnline: true,
    selected: false,
  },
  {
    id: "2",
    name: "Alfredo Calzoni",
    age: 22,
    location: "Washington DC",
    image: appImages.person4,
    isOnline: true,
    selected: false,
  },
  {
    id: "3",
    name: "Amina Mina",
    age: 22,
    location: "Washington DC",
    image: appImages.person3,
    isOnline: false,
    selected: false,
  },
  {
    id: "4",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person2,
    isOnline: true,
    selected: false,
  },
  {
    id: "5",
    name: "Savanna Hall",
    age: 22,
    location: "Washington DC",
    image: appImages.person1,
    isOnline: false,
    selected: false,
  },
  {
    id: "6",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person2,
    isOnline: true,
    selected: false,
  },
  {
    id: "7",
    name: "Sara Grif",
    age: 22,
    location: "Washington DC",
    image: appImages.person3,
    isOnline: false,
    selected: false,
  },
];

const MessagesTab = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Messages");
  const [users, setUsers] = useState(messageUsers);
  const [filteredUsers, setFilteredUsers] = useState(messageUsers);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlertModal1, setShowAlertModal1] = useState(false);
  const [tickPress, setTickPress] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);

  const toggleSelection = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, selected: !user.selected } : user
    );
    setUsers(updatedUsers);

    // Update filtered users as well
    const updatedFilteredUsers = filteredUsers.map((user) =>
      user.id === userId ? { ...user, selected: !user.selected } : user
    );
    setFilteredUsers(updatedFilteredUsers);

    // Check if any user is selected to maintain selection mode
    const hasSelected = updatedUsers.some((user) => user.selected);
    if (!hasSelected) {
      setSelectionMode(false);
    }
  };

  const handleLongPress = (userId: string) => {
    // Only allow long press selection in Messages tab
    if (activeTab === "Messages") {
      setSelectionMode(true);
      toggleSelection(userId);
    }
  };

  const handleCancelSelection = () => {
    setShowAlertModal(false);
    // Clear all selections
    const updatedUsers = users.map((user) => ({ ...user, selected: false }));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectionMode(false);
  };

  const handleRemoveUsers = () => {
    const selectedUsers = users.filter((user) => user.selected);
    const remainingUsers = users.filter((user) => !user.selected);
    setUsers(remainingUsers);
    setFilteredUsers(remainingUsers);
    setShowAlertModal(false);
    setSelectionMode(false);
  };

  const renderTab = (tabName: string) => (
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === tabName && [
          styles.activeTab,
          { backgroundColor: colors.primary, gap: wp(0.5) },
        ],
      ]}
      onPress={() => {
        // Clear selection mode when switching tabs
        if (selectionMode) {
          setSelectionMode(false);
          const clearedUsers = users.map((user) => ({
            ...user,
            selected: false,
          }));
          setUsers(clearedUsers);
          setFilteredUsers(clearedUsers);
        }
        setActiveTab(tabName);
      }}
    >
      {activeTab === tabName && (
        <View
          style={{
            backgroundColor: colors.black,
            height: wp(7),
            width: wp(7),
            borderRadius: wp(4),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={
              tabName === "Messages"
                ? appImages.chat
                : tabName === "Favorites"
                ? appImages?.starFill
                : appImages.request
            }
            style={styles.tabIcon}
          />
        </View>
      )}
      <CText
        title={tabName}
        fontSize={fontPixel(14)}
        fontWeight={activeTab === tabName ? "bold" : "normal"}
        color={activeTab === tabName ? "#000" : "#666"}
        style={{ textAlign: "center" }}
        textStyle={{ textAlign: "center" }}
      />
    </TouchableOpacity>
  );

  const handleNavButtonPress = (index: number) => {
    const hasSelectedUsers = users.some((user) => user.selected);

    if (hasSelectedUsers) {
      // When users are selected, use the 3-button layout
      if (index === 0) {
        // Shield button - Report
        setShowAlertModal1(true);
      } else if (index === 1) {
        // Bin button - Delete
        const selectedUsers = users.filter((user) => user.selected);
        if (selectedUsers.length === 0) {
          setShowAlertModal1(true);
          return;
        }
        setShowAlertModal(true);
      } else if (index === 2) {
        // Return button - Exit selection mode
        handleCancelSelection();
      }
    } else {
      // When no users are selected, only magnify button (index 0)
      if (index === 0) {
        // Navigate to search
        router.navigate({ pathname: "/DrawerStack/Messages/SerachPeople" });
      }
    }
  };

  const renderUserItem = ({
    item,
    index,
  }: {
    item: MessageUser;
    index: number;
  }) => (
    <Pressable
      style={[styles.userItem, { backgroundColor: colors.background }]}
      onPress={() => {
        if (selectionMode && activeTab === "Messages") {
          toggleSelection(item.id);
        } else {
          router.push({ pathname: "/DrawerStack/Messages/Chat" });
        }
      }}
      onLongPress={
        activeTab === "Messages" ? () => handleLongPress(item.id) : undefined
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

      {/* Gift image for first 3 items in Requests tab */}
      {activeTab === "Requests" && index < 3 && (
        <View style={styles.giftContainer}>
          <Image
            source={appImages.gift} // Make sure you have this image in your appImages
            style={styles.giftImage}
          />
        </View>
      )}

      {selectionMode && activeTab === "Messages" && (
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
      )}
    </Pressable>
  );

  const navigation = useNavigation();

  // Check if any users are selected
  const hasSelectedUsers = users.some((user) => user.selected);

  return (
    <ParentWrapper colors={colors} style={{}}>
      <MainHeader
        drawer
        backPress={() => {
          navigation.openDrawer();
        }}
        containerStyle={{}}
        title="Messages"
      />
      <MainWrapper
        navImages={
          activeTab === "Requests"
            ? [appImages.sort]
            : hasSelectedUsers && selectionMode && activeTab === "Messages"
            ? [appImages.shieldExclaim, appImages.bin, appImages.return]
            : activeTab === "Messages" || activeTab === "Favorites"
            ? [appImages.magnify]
            : []
        }
        navButton={
          activeTab === "Requests" ||
          activeTab === "Favorites" ||
          (selectionMode && activeTab === "Messages") ||
          (!selectionMode && activeTab === "Messages")
        }
        navButtonPress={handleNavButtonPress}
      >
        <View
          style={[
            styles.tabContainer,
            { borderColor: colors.primary, borderWidth: wp(0.2) },
          ]}
        >
          {renderTab("Favorites")}
          {renderTab("Messages")}
          {renderTab("Requests")}
        </View>

        <View style={{ flex: 1, backgroundColor: "#292323" }}>
          <FlatList
            data={users}
            renderItem={({ item, index }) => renderUserItem({ item, index })}
            keyExtractor={(item) => item.id}
            style={{
              borderBottomLeftRadius: wp(5),
              borderBottomRightRadius: wp(5),
            }}
            contentContainerStyle={[styles.listContainer, {}]}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{ height: hp(7.4), backgroundColor: "#292323" }} />
      </MainWrapper>

      <AlertModal
        modalVisible={showAlertModal}
        closeModal={() => setShowAlertModal(false)}
        rightButtonText="Delete"
        leftButtonText="Cancel"
        onPressLeft={handleCancelSelection}
        onPressRight={handleRemoveUsers}
        title={"Are you sure you want delete this\nchat?"}
        buttons={true}
        image={null}
        imageStyle={{}}
        titleStyle={{}}
        tickPress={() => {
          setTickPress(!tickPress);
        }}
        check={true}
        tick={tickPress}
      />
      <AlertModal
        modalVisible={showAlertModal1}
        closeModal={() => setShowAlertModal1(false)}
        rightButtonText="Report"
        leftButtonText="Cancel"
        onPressLeft={() => setShowAlertModal1(false)}
        onPressRight={() => setShowAlertModal1(false)}
        title={"Are you sure you want to report this\nchat? "}
        description={
          "Your chat will be deleted, and for\nyour safety we will block any further\ncontact between you."
        }
        buttons={true}
        image={appImages.shield}
        imageStyle={{}}
        titleStyle={{}}
      />
    </ParentWrapper>
  );
};

export default MessagesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  listContainer: {
    paddingHorizontal: wp(4),
    flexGrow: 1,
    paddingBottom: wp(0),
    paddingTop: wp(0.4),
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFAE8",
    borderRadius: wp(10),
    marginHorizontal: wp(4),
    marginVertical: wp(4),
    padding: wp(1),
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: wp(1),
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "flex-start",
    paddingLeft: wp(1),
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
  },
  notificationButton: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    width: wp(4),
    height: wp(4),
  },
  tabIcon: {
    width: wp(3),
    height: wp(3),
    tintColor: "#3CE4A3",
  },
  giftContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  giftImage: {
    width: wp(6),
    height: wp(6),
  },
});
