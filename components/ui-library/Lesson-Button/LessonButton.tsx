import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import InfoModal from "../Info-modal/InfoModal";

const SIZE = 100; // Button size
const STROKE_WIDTH = 10; // Width of the progress ring

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LessonButton: React.FC<{
  progress: number;
  iconName: string;
  label?: string;
}> = ({ progress = 0.75, iconName = "star", label }) => {
  const radius = (SIZE - STROKE_WIDTH) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedProgress = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(0)).current;
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const [showLabel, setShowLabel] = useState(true);

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

  const handlePressIn = () => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Animate the inner circle to jump down
    Animated.spring(positionY, {
      toValue: 6, // Move down 10 units
      useNativeDriver: true,
    }).start();

    if (label) {
      setShowLabel(false);
    }
  };

  const handlePressOut = () => {
    // Animate the inner circle back to its original position
    Animated.spring(positionY, {
      toValue: 0, // Move back to the original position
      useNativeDriver: true,
    }).start();
    let timer: any;
    if (label) {
      timer = setTimeout(() => {
        setShowLabel(true);
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false, // Set to false for SVG animations
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const modalActionHandler = () => {
    console.log("Action");
  };

  return (
    <ThemedView>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* <InfoModal title="Title" locked={false} visible={true} review={false}  description="Description" action={() => {modalActionHandler}} /> */}

        {label && (
          <Animated.View
            style={[
              styles.label,
              {
                transform: [{ translateY: labelAnimation }],
              },
              showLabel ? { opacity: 1 } : { opacity: 0 },
            ]}
          >
            <ThemedView
              lightColor="white"
              darkColor="white"
              style={styles.labelContent}
            >
              <View style={styles.labelArrow} />
              <ThemedText style={styles.labelText}>{label}</ThemedText>
            </ThemedView>
          </Animated.View>
        )}

        <Svg width={SIZE} height={SIZE}>
          <Circle
            stroke="#e0e0e0"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            strokeWidth={STROKE_WIDTH}
          />
          <AnimatedCircle
            stroke="#3b82f6"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <Animated.View
          style={[
            styles.innerCircleWrapper,
            {
              transform: [{ translateY: positionY }],
            },
          ]}
        >
          <LinearGradient
            colors={["#ff7eeb", "#ff61a6"]} // Pink gradient colors
            style={styles.innerCircle}
          >
            <View style={styles.iconContainer}>
              <FontAwesome6 name={iconName} size={24} color="#ffffff" />
            </View>
          </LinearGradient>
        </Animated.View>
        <View style={styles.bounceEffect}></View>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bounceEffect: {
    height: SIZE / 1.8,
    backgroundColor: "pink",

    width: SIZE / 1.65,
    borderRadius: 100,
    top: 28,
    position: "absolute",
  },
  innerCircleWrapper: {
    position: "absolute",
    width: SIZE - STROKE_WIDTH * 4, // Adjust size to fit the inner circle
    height: SIZE - STROKE_WIDTH * 4,
    zIndex: 10,
  },
  innerCircle: {
    flex: 1, // Ensure the gradient fills the container
    borderRadius: (SIZE - STROKE_WIDTH * 4) / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    zIndex: 100,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    position: "absolute",
    top: -30,
    alignSelf: "center",
    // backgroundColor: '#f5f5f5', // Background color of the label cloud
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  labelContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#f5f5f5",
    marginBottom: -6, // Adjust arrow position
    alignSelf: "center",
    position: "absolute",
    zIndex: 20,
    bottom: -5, // Adjust arrow position
    left: "50%",

    transform: [
      { translateX: -6 }, // Adjust to horizontally center the arrow (half the width)
    ],
  },
  labelText: {
    color: "green", // Text color
    fontSize: 14, // Font size
    fontWeight: "bold", // Font weight
    textTransform: "uppercase", // Uppercase text
  },
});

export default LessonButton;
