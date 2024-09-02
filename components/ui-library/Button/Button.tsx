import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

const Button: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  const [bounce, setBounce] = useState(true);

  const handlePress = () => {
    setBounce(false);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const handlePressOut = () => {
    setBounce(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPressIn={handlePress}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.button, !bounce ? styles.bounceEffect : {}]}
        onPress={onPress}
      >
        <ThemedText style={styles.buttonText}> {title} </ThemedText>
      </TouchableOpacity>
      <View style={styles.shadowEffect}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bounceEffect: {
    top: 8,
  },
  shadowEffect: {
    backgroundColor: "#F0F0F0",
    width: "100%",
    height: 20,
    borderRadius: 8,

    bottom: 14,
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    zIndex: 4,
  },
  buttonText: {
    color: "#34D399", // Green color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Button;
