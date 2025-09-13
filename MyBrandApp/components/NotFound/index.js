import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { wp } from "../../Services/Responsive";
import { Image } from "expo-image";

const NotFound = ({ title = "" }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.notfound}>
        <Image
          style={styles.find}
          source={require("../../assets/images/find.png")}
        />
        <Text style={styles.text}>{`No ${title} found.`}</Text>
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  find: {
    height: wp(30),
    width: wp(30),
  },
  notfound: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "#939090",marginTop:wp(2)
  },
});
