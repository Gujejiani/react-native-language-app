import { StyleSheet, TouchableOpacity, View } from "react-native";

import * as Haptics from "expo-haptics";
import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";

interface BounceButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: {};
  pressEffectStyle?: {};
}

const BounceButton: React.FC<BounceButtonProps> = ({
  onPress,
  children,
  style,
  pressEffectStyle,
}) => {
  const [bounce, setBounce] = useState(true);

  const handlePress = (e: any) => {
    e.stopPropagation();
    setBounce(false);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // todo fix this
    let timer = setTimeout(() => {
      if (onPress) {
        onPress();
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  };

  const handlePressOut = () => {
    setBounce(true);
  };

  return (
    <ThemedView>
      <TouchableOpacity
        style={[styles.button, !bounce ? styles.bounceEffect : {}, style]}
        onPressIn={handlePress}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>

      <View style={[styles.pressEffect, pressEffectStyle]}></View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  bounceEffect: {
    top: 4,
  },

  pressEffect: {
    backgroundColor: "gray",
    width: "100%",
    height: 20,
    borderRadius: 100,
    position: "absolute",
    bottom: -3,
    zIndex: 1,
    left: 0,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,

    zIndex: 10,
  },
});

export default BounceButton;
