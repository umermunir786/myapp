import { heightPixel } from "@/services";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ParentWrapper = ({
  colors = { background: "#ffffff" },
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: colors.background,
          paddingBottom:
            Platform.OS == "ios"
              ? heightPixel(insets.bottom - 10)
              : heightPixel(insets.bottom),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

export default ParentWrapper;
