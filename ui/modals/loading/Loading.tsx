import React, { useEffect, useRef } from "react";
import { Modal, View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // You can use any icon library

const LoadingModal: React.FC<{ visible: boolean }> = ({ visible }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Start the bounce and fade animations when visible
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10, // Moves up
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 10, // Moves down
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1, // Fully visible
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0, // Invisible
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      // Stop animations when the modal is not visible
      bounceAnim.stopAnimation();
      fadeAnim.stopAnimation();
    }
  }, [visible]);

  return (
    <Modal transparent={false} animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Ionicons name="logo-react" size={64} color="pink" />
          </Animated.View>
          <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
            Preparing your lesson...
          </Animated.Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default LoadingModal;
