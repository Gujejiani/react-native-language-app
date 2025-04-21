import { ThemedView } from "@/components/ThemedView";
import InfoModal from "@/components/ui-library/Info-modal/InfoModal";
import LessonButton from "@/components/ui-library/Lesson-Button/LessonButton";
import { CourseBackground, ILesson, IUnit } from "@/models";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

interface LessonProps {

  startLesson: () => void;
  title: string;
  description: string;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: number; // Receive shared scroll value
  unit: IUnit;
  sectionColor: CourseBackground;
}

const Lesson: React.FC<LessonProps> = ({

  startLesson,
  title,
  description,
  scrollViewRef,
  scrollY,
  unit,
  sectionColor
}) => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  const buttonRef = useRef<View>(null);
  const buttonPressHandler = () => {
    buttonRef?.current?.measure((fx, fy, width, height, px, py) => {
      setButtonPosition({ x: px, y: py + height });
      setShowModal(true);
    });
  };
  const closeModal = () => {
    setShowModal(false);
    console.log("Close  Modal FROM MEE");
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
          label={unit.status === "unlocked" ? "Start" : ""}
          disabled={unit.status === "locked"}
          moduleBackground={sectionColor}
          onPress={buttonPressHandler}
        />
      </View>
      <View style={styles.modal}>
        {showModal ? (
          <InfoModal
            visible={showModal}
            title={title}
            scrollViewRef={scrollViewRef}
            scrollY={scrollY}
            description={description}
            action={startLessonHandler}
            buttonPosition={buttonPosition}
            onClose={closeModal}
            locked={unit.status === "locked"}
            buttonText={unit.status === "locked" ? "Locked" : "Start Lesson"}
          />
        ) : (
          ""
        )}
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
    position: "relative",
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
