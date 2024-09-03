import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const useLessonButtonAnimations = (
  progress: number,
  label: string | undefined,
) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(0)).current;
  const labelAnimation = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * ((100 - 10) / 2); // Calculate based on SIZE and STROKE_WIDTH
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    if (label) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(labelAnimation, {
            toValue: 6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(labelAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [label]);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false, // Set to false for SVG animations
    }).start();
  }, [progress]);

  const handlePressIn = () => {
    // Animate the inner circle to jump down
    Animated.timing(positionY, {
      toValue: 6, // Move down 6 units
      useNativeDriver: true,
      duration: 50,
    }).start();
  };

  const handlePressOut = () => {
    // Animate the inner circle back to its original position
    Animated.timing(positionY, {
      toValue: 0, // Move back to the original position
      useNativeDriver: true,
    }).start();
  };

  return {
    animatedProgress,
    positionY,
    labelAnimation,
    strokeDashoffset,
    handlePressIn,
    handlePressOut,
  };
};
