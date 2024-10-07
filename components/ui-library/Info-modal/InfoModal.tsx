import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../Button/Button";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import { checkIfModalIsFullyVisible } from "@/utils/utils";

interface InfoModalProps {
  visible: boolean;
  title: string;
  description: string;
  action: () => void;
  onClose: () => void;
  buttonPosition: { x: number; y: number }; // Accept button position
  locked?: boolean;
  review?: boolean;
  buttonText: string;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: number;
}

const screenWidth = Dimensions.get("window").width;

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  title,
  description,
  action,
  onClose,
  buttonPosition,
  locked,
  buttonText,
  scrollViewRef,
  scrollY,
}) => {
  const [modalTopOffset, setModalTopOffset] = useState(0); // State for position adjustment
  const modalContentRef = useRef<View>(null);

  useEffect(() => {
    let timer = null;
    if (visible) {
      // Add a slight delay to ensure that the modal is fully rendered before checking visibility
      timer = setTimeout(() => {
        checkIfModalIsFullyVisible(
          modalContentRef,
          setModalTopOffset,
          scrollViewRef,
          scrollY,
        );
      }, 100);
    }
    () => timer && clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const preventClose = (e: any) => {
    e.stopPropagation();
  };

  // Calculate the arrow's left position relative to the modal
  const arrowLeftPosition = buttonPosition.x;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onShow={() =>
          checkIfModalIsFullyVisible(
            modalContentRef,
            setModalTopOffset,
            scrollViewRef,
            scrollY,
          )
        }
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.container,
                { top: buttonPosition.y + 10 - modalTopOffset },
              ]}
            >
              <TouchableWithoutFeedback onPress={preventClose}>
                <View
                  ref={modalContentRef}
                  style={[styles.modalContent, locked ? styles.locked : {}]}
                >
                  <View
                    style={[styles.arrowContainer, { left: arrowLeftPosition }]}
                  >
                    <View
                      style={[styles.arrow, locked ? styles.lockedArrow : {}]}
                    />
                  </View>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.description}>{description}</Text>

                  <View style={styles.button}>
                    <Button
                      title={buttonText}
                      onPress={action}
                      disabled={locked}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
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
  lockedArrow: {
    borderBottomColor: Colors.light.locked,
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
  locked: {
    backgroundColor: Colors.light.locked,
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
  visibilityText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
});

export default InfoModal;
