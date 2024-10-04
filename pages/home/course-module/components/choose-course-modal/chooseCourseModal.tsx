import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  SafeAreaView,
} from "react-native";
import { ICourse } from "@/models";

interface ChooseCourseModalProps {
  courses: ICourse[];
  isVisible: boolean;
  onClose: () => void;
  onCourseClick: (id: number) => void;
}

export const ChooseCourseModal: React.FC<ChooseCourseModalProps> = ({
  courses,
  isVisible,
  onClose,
  onCourseClick,
}) => {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start hidden above the screen
  const opacityAnim = useRef(new Animated.Value(0)).current; // Start with transparent background

  const [innerVisible, setInnerVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setInnerVisible(true), 300);
      // Animate both slide and opacity
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate both slide out and opacity out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setInnerVisible(false);
      });
    }
  }, [isVisible, slideAnim, opacityAnim]);

  return (
    <Modal transparent={true} visible={innerVisible} onRequestClose={onClose}>
      {/* Animated overlay for smooth opacity transition */}
      <TouchableWithoutFeedback onPress={onClose}>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View
            style={[styles.modalBackground, { opacity: opacityAnim }]}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContainer,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                {/* Horizontal scrolling of courses */}
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.listContainer}
                  showsHorizontalScrollIndicator={false}
                >
                  {/* Render courses */}
                  {courses.map((course) => (
                    <View key={course.id} style={styles.courseItem}>
                      <TouchableOpacity
                        onPress={() => onCourseClick(course.id)}
                      >
                        <Image
                          source={{ uri: course.imageUrl }}
                          style={styles.courseImage}
                        />
                        <Text style={styles.courseName}>{course.name.en}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  {/* Add Course button */}
                  <TouchableOpacity
                    style={styles.courseItem}
                    onPress={() => console.log("Add Course pressed")}
                  >
                    <View style={styles.addCourseImage}>
                      <Text style={styles.addCourseText}>+</Text>
                    </View>
                    <Text style={styles.courseName}>Add Course</Text>
                  </TouchableOpacity>
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for modal
    justifyContent: "flex-start", // Modal is positioned at the top
  },
  modalContainer: {
    backgroundColor: "#fff", // Background for the modal
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    maxHeight: "60%", // Limit max height of modal to 60% of screen
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseItem: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  courseImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  courseName: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  addCourseImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  addCourseText: {
    fontSize: 24,
    color: "#808080",
  },
});

export default ChooseCourseModal;
