import CText from "@/components/CText";
import MainWrapper from "@/components/MainWrapper";
import ParentWrapper from "@/components/ParentWrapper";
import { FontFamily } from "@/constants/Fonts";
import { appImages } from "@/services/utilities/appAssets";
import {
  fontPixel,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from "@/services/utilities/appFontSizes";
import { useTheme } from "@/services/utilities/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data for messages
const initialMessages = [
  {
    id: "1",
    text: "Hi Sean, what are you up to?",
    sender: "other",
    timestamp: new Date(),
  },
  {
    id: "2",
    text: "Hey gorgeous, just chilling with friends at the beach 😎lbu?",
    sender: "me",
    timestamp: new Date(),
  },
  {
    id: "3",
    text: "Wow nice I'm just home, bored.",
    sender: "other",
    timestamp: new Date(),
  },
  {
    id: "4",
    text: "You wanna join us? I could pick you up if you like.",
    sender: "me",
    timestamp: new Date(),
  },
];

// Mock gift data
const gifts = [
  {
    id: "1",
    name: "Bear",
    price: 50,
    emoji: "🧸",
    color: "#FFD700",
  },
];

const Chat = () => {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const getStyles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        marginTop: top - wp(3),
        marginBottom: wp(1),
        paddingHorizontal: wp(4),
        paddingVertical: wp(3),
        paddingTop: Platform.OS === "ios" ? wp(3) : wp(4),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      headerButton: {
        padding: wp(2),
      },
      backIcon: {
        width: wp(6),
        height: wp(6),
      },
      actionIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: "#000",
      },
      profileSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp(2),
      },
      profileImage: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(2),
        borderWidth: wp(0.8),
        borderColor: "#ffffff",
        marginRight: wp(3),
        elevation: 3,
      },
      profileInfo: {
        flexDirection: "row",
        alignItems: "center",
      },
      headerActions: {
        flexDirection: "row",
      },
      chatContainer: {
        flex: 1,
      },
      messagesList: {
        flex: 1,
        backgroundColor: "white",
      },
      messagesContent: {
        paddingVertical: wp(4),
        paddingHorizontal: wp(4),
      },
      messageContainer: {
        marginVertical: wp(1),
      },
      myMessage: {
        alignItems: "flex-end",
      },
      otherMessage: {
        alignItems: "flex-start",
      },
      messageBubble: {
        maxWidth: SCREEN_WIDTH * 0.75,
        paddingHorizontal: wp(4),
        paddingVertical: wp(2.5),
        borderRadius: wp(3),
        backgroundColor: "#FFFCF2",
        borderColor: colors.primary,
        borderWidth: wp(0.2),
        marginTop: wp(3),
      },
      myBubble: {
        borderBottomRightRadius: wp(1),
      },
      otherBubble: {
        borderBottomLeftRadius: wp(1),
      },
      giftBubble: {
        backgroundColor: "#FFE4B5",
        borderWidth: 2,
        borderColor: "#FFD539",
      },
      giftContent: {
        alignItems: "center",
        minWidth: wp(25),
      },
      messageFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: wp(1),
      },
      inputContainer: {
        backgroundColor: "white",
        paddingHorizontal: wp(4),
        paddingVertical: wp(3),
      },
      inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFCF2",
        borderRadius: wp(3),
        paddingHorizontal: wp(2),
        paddingVertical: wp(2),
        minHeight: wp(12),
        borderColor: colors.primary,
        borderWidth: wp(0.2),
      },
      textInput: {
        flex: 1,
        fontSize: fontPixel(16),
        maxHeight: wp(25),
        paddingVertical: wp(2),
        color: "black",
        fontFamily: FontFamily.NunitoRegular,
      },
      inputActions: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp(2),
      },
      actionButton: {
        padding: wp(1.5),
        marginLeft: wp(1),
      },
      sendButton: {
        width: wp(9),
        height: wp(9),
        borderRadius: wp(4.5),
        justifyContent: "center",
        alignItems: "center",
        marginLeft: wp(2),
      },
      sendButtonActive: {
        backgroundColor: "#FFD539",
      },
      separator: {
        height: wp(6),
        width: wp(0.2),
        backgroundColor: "#C2C2C2",
      },

      modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
      },
      giftModal: {
        backgroundColor: "white",
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        paddingTop: wp(5),
        paddingBottom: wp(10),
        maxHeight: SCREEN_HEIGHT * 0.6,
      },
      modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp(5),
        paddingBottom: wp(5),
      },
      closeButton: {
        padding: wp(1),
      },
      giftsContainer: {
        paddingHorizontal: wp(5),
      },
      giftsContent: {
        paddingBottom: wp(5),
      },
      giftItem: {
        flex: 1,
        margin: wp(2),
        padding: wp(5),
        borderRadius: wp(5),
        alignItems: "center",
        justifyContent: "center",
        minHeight: wp(25),
        position: "relative",
      },
      selectedGift: {},
      selectedIndicator: {
        position: "absolute",
        top: wp(2),
        right: wp(2),
        width: wp(6),
        height: wp(6),
        borderRadius: wp(3),
        justifyContent: "center",
        alignItems: "center",
      },
      sendGiftButton: {
        backgroundColor: "#333",
        marginHorizontal: wp(5),
        paddingVertical: wp(4),
        borderRadius: wp(4),
        alignItems: "center",
        marginTop: wp(2.5),
        elevation: 4,
      },
      sendGiftButtonDisabled: {
        backgroundColor: "#CCC",
      },
    });

  const styles = getStyles();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showClipOptions, setShowClipOptions] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const flatListRef = useRef<FlatList>(null);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const formatTime = (timestamp: Date) => {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "me",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const sendGift = () => {
    if (selectedGift) {
      const giftMessage = {
        id: Date.now().toString(),
        text: `🎁 Sent a ${selectedGift.name}`,
        sender: "me",
        timestamp: new Date(),
        isGift: true,
        gift: selectedGift,
      };
      setMessages([...messages, giftMessage]);
      setShowGiftModal(false);
      setSelectedGift(null);
    }
  };

  const handleClipPress = () => {
    setShowClipOptions(!showClipOptions);
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.sender === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myBubble : styles.otherBubble,
            item.isGift && styles.giftBubble,
          ]}
        >
          {item.isGift ? (
            <View style={styles.giftContent}>
              <Image
                source={appImages.bear}
                style={{ width: wp(20), height: wp(20) }}
              />
              <CText
                title={item.text}
                fontSize={fontPixel(14)}
                fontWeight="bold"
                color="#FFFCF2"
                style={{ marginTop: wp(1), textAlign: "center" }}
                textStyle={{ textAlign: "center" }}
              />
            </View>
          ) : (
            <>
              <CText
                title={item.text}
                fontSize={fontPixel(16)}
                color={isMe ? "#000" : "#000"}
                style={{ textAlign: "left" }}
                textStyle={{ textAlign: "left", lineHeight: fontPixel(20) }}
              />
              {isMe && (
                <View style={styles.messageFooter}>
                  <CText
                    title={formatTime(item.timestamp)}
                    fontSize={fontPixel(12)}
                    color="#00000040"
                    style={{ marginRight: wp(1) }}
                  />
                  <Image
                    source={appImages.doubleTick}
                    style={{ width: wp(4), height: wp(2) }}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  const renderGiftItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.giftItem,
        { backgroundColor: item.color },
        selectedGift?.id === item.id && styles.selectedGift,
      ]}
      onPress={() => setSelectedGift(item)}
    >
      <Image
        source={appImages.bear}
        style={{ width: wp(40), height: wp(40) }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: wp(2),
          right: wp(2),
        }}
      >
        <CText
          title={item.price.toString()}
          fontSize={fontPixel(16)}
          fontWeight="semiBold"
        />
        <Image
          source={appImages.credits}
          style={{ width: wp(10), height: wp(10) }}
        />
      </View>
      {selectedGift?.id === item.id && (
        <View style={styles.selectedIndicator}>
          <Image
            source={appImages.tickCircleBlack}
            style={{ width: wp(4), height: wp(4) }}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ParentWrapper colors={colors} style={{}}>
      <MainWrapper>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Image source={appImages.backArrow} style={styles.backIcon} />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <View style={styles.profileInfo}>
              <Image
                source={appImages.person1}
                contentFit="cover"
                style={styles.profileImage}
              />
              <View style={{ alignItems: "flex-start" }}>
                <CText
                  title="Sean"
                  fontSize={fontPixel(18)}
                  fontWeight="semiBold"
                  color="#000"
                  style={{ textAlign: "left" }}
                  textStyle={{ textAlign: "left" }}
                />
                <CText
                  title="12:31m away"
                  fontSize={fontPixel(14)}
                  color="#797979"
                  style={{ textAlign: "left", marginTop: wp(0.5) }}
                  textStyle={{ textAlign: "left" }}
                />
              </View>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Image source={appImages.starOutline} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Image
                source={appImages.phone}
                style={{ height: wp(6), width: wp(6) }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Image
                source={appImages.cameraFill}
                style={{ height: wp(6), width: wp(6) }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              {!showClipOptions ? (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleClipPress}
                >
                  <Image
                    source={appImages.clip}
                    style={{ height: wp(6), width: wp(6) }}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {}}
                  >
                    <Image
                      source={appImages.image}
                      style={{ height: wp(5), width: wp(6) }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {}}
                  >
                    <Image
                      source={appImages.yotube}
                      style={{ height: wp(6), width: wp(6) }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {}}
                  >
                    <Image
                      source={appImages.pinFill}
                      style={{ height: wp(6), width: wp(6) }}
                    />
                  </TouchableOpacity>
                </>
              )}
              <View style={[styles.separator, { marginRight: wp(2) }]} />
              <TextInput
                style={styles.textInput}
                placeholder="Write here"
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                onFocus={() => setShowClipOptions(false)}
              />

              <View style={styles.inputActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setShowGiftModal(true)}
                >
                  <Image
                    source={appImages.giftOutline}
                    style={{ height: wp(6), width: wp(6) }}
                  />
                </TouchableOpacity>

                <View style={[styles.separator, { marginLeft: wp(2) }]} />

                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    inputText.trim() ? styles.sendButtonActive : null,
                  ]}
                  onPress={sendMessage}
                  disabled={!inputText.trim()}
                >
                  <Image
                    source={appImages.send}
                    style={{
                      height: wp(6),
                      width: wp(6),
                      tintColor: inputText.trim() ? "white" : "#999",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Gift Modal */}
        <Modal
          visible={showGiftModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowGiftModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.giftModal}>
              <View style={styles.modalHeader}>
                <CText
                  title="Select a gift"
                  fontSize={fontPixel(18)}
                  fontWeight="bold"
                  color="#000"
                  style={{ textAlign: "center" }}
                  textStyle={{ textAlign: "center" }}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowGiftModal(false)}
                >
                  <Ionicons name="close" size={wp(6)} color="black" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={gifts}
                renderItem={renderGiftItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={styles.giftsContainer}
                contentContainerStyle={styles.giftsContent}
              />

              <TouchableOpacity
                style={[
                  styles.sendGiftButton,
                  !selectedGift && styles.sendGiftButtonDisabled,
                ]}
                onPress={sendGift}
                disabled={!selectedGift}
              >
                <CText
                  title="Send gift"
                  fontSize={fontPixel(18)}
                  color="white"
                  style={{ textAlign: "center" }}
                  textStyle={{ textAlign: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Chat;
