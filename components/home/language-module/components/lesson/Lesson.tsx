import { ThemedView } from "@/components/ThemedView";
import InfoModal from "@/components/ui-library/Info-modal/InfoModal";
import LessonButton from "@/components/ui-library/Lesson-Button/LessonButton";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

interface LessonProps {
  lesson?: any;
  startLesson: () => void;

  title: string;
  description: string;
}

const Lesson: React.FC<LessonProps> = ({ lesson, startLesson, title, description }) => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  const buttonRef = useRef<View>(null);
  const buttonPressHandler = () => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setButtonPosition({ x: px, y: py + height });
      setShowModal(true);
    });
  };
  const closeModal = () => {
    setShowModal(false);
    console.log("Close  Modal");
  };

  const startLessonHandler = () => {
    console.log("Start Lesson");
    setShowModal(false);
    startLesson();
  };

  return (
    <ThemedView>
      <View ref={buttonRef}>
        <LessonButton
          iconName="star"
          progress={0.75}
          label="Start"
          onPress={buttonPressHandler}
        />
      </View>
      <View style={styles.modal}>
        <InfoModal
          visible={showModal}
          title={title}
          description={description}
          action={startLessonHandler}
          buttonPosition={buttonPosition}
          onClose={closeModal}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  moduleContainer: {
    display: "flex",
    width: "100%",
  },
  modal: {
    position: "absolute",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  moduleTitle: {
    textAlign: "center",
    paddingHorizontal: 10,
    color: "gray",
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 10,
  },
});

export default Lesson;
