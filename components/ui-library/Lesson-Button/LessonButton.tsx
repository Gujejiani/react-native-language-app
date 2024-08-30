import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const SIZE = 100; // Button size
const STROKE_WIDTH = 10; // Width of the progress ring

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LessonButton: React.FC<{ progress: number; iconName: string; label?: string }> = ({ progress = 0.75, iconName = "star" }) => {
  const radius = (SIZE - STROKE_WIDTH) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedProgress = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Animate the inner circle to jump down
    Animated.spring(positionY, {
      toValue: 40, // Move down 10 units
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Animate the inner circle back to its original position
    Animated.spring(positionY, {
      toValue: 0, // Move back to the original position
      useNativeDriver: true,
    }).start();
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
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
          colors={['#ff7eeb', '#ff61a6']} // Pink gradient colors
          style={styles.innerCircle}
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name={iconName} size={24} color="#ffffff" />
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircleWrapper: {
    position: 'absolute',
    width: SIZE - STROKE_WIDTH * 4, // Adjust size to fit the inner circle
    height: SIZE - STROKE_WIDTH * 4,
  },
  innerCircle: {
    flex: 1, // Ensure the gradient fills the container
    borderRadius: (SIZE - STROKE_WIDTH * 4) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LessonButton;
