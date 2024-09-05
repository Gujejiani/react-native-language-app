// Updated InfoModal component to accept coordinates and adjust the arrow position
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../Button/Button";

interface InfoModalProps {
  visible: boolean;
  title: string;
  description: string;
  action: () => void;
  onClose: () => void;
  buttonPosition: { x: number; y: number }; // Accept button position
  locked?: boolean;
  review?: boolean;
}

const screenWidth = Dimensions.get("window").width;

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  title,
  description,
  action,
  onClose,
  buttonPosition,
}) => {
  if (!visible) return null;

  // Calculate the arrow's left position relative to the modal
  const arrowLeftPosition = buttonPosition.x + 10; // Add offset for arrow centering

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <View style={[styles.container, { top: buttonPosition.y + 10 }]}>
              <View style={styles.modalContent}>
                <View
                  style={[styles.arrowContainer, { left: arrowLeftPosition }]}
                >
                  <View style={styles.arrow} />
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

                <View style={styles.button}>
                  <Button title="Start Lesson" onPress={action} />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start", // Align modal near the button
    alignItems: "center",
    zIndex: 1000,
    height: "100%",
  },
  arrowContainer: {
    position: "absolute",
    top: -10,
  },
  button: {
    width: "100%",
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#34D399", // Green color matching the modal
  },
  modalContent: {
    backgroundColor: "#34D399", // Green background
    borderRadius: 16,
    padding: 16,
    paddingTop: 30, // Add some padding at the top for the arrow
    width: screenWidth * 0.8, // Ensure modal takes up 80% of the screen width
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#34D399", // Green color
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default InfoModal;
