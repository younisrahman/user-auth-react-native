import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

function Loader() {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require("@/src/assets/images/kloudius.webp")}
        style={styles.logo}
      />
      <ActivityIndicator
        size="large"
        color={Colors.light.tint}
        style={styles.spinner}
      />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 70,
    resizeMode: "contain",
    marginBottom: 20,
  },
  spinner: {
    marginTop: 10,
  },
});
