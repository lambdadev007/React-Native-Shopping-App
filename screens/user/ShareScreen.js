import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const ShareScreen = (props) => {
  const TouchableCmp = (Platform.OS = "ios"
    ? TouchableOpacity
    : TouchableNativeFeedback);

  return (
    <View style={styles.screen}>
      <TouchableCmp>
        <View>
          <Text>Share screen</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShareScreen;
