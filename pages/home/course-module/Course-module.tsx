import { ThemedView } from "@/components/ThemedView";
import { IUnit } from "@/models/";
import React from "react";
import { StyleSheet, LayoutChangeEvent } from "react-native";
import UnitTitle from "./components/module-title/UnitTitle";
import Lesson from "./components/lesson/Lesson";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { router } from "expo-router";

interface CourseModuleProps {
  module: IUnit;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: number; // Receive shared scroll value
  updateModulePosition: (id: number, positionY: number) => void;
}

export const CourseModule: React.FC<CourseModuleProps> = ({
  module,
  scrollViewRef,
  scrollY,
  updateModulePosition,
}) => {
  const startLessonHandler = (lessonID: number) => {
    console.log("start lesson from module");
    router.navigate({
      pathname: "/lesson-screen",
      params: { lessonID: lessonID },
    });
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;

    console.log("module id", module.id, "positionY", y);
    updateModulePosition(module.id, y);
  };

  const moduleLessons = module.lessons.map((lesson, index) => {
    const offset = index * 20; // Increase left or right offset progressively
    const isLeft = index % 2 !== 0;

    return (
      <ThemedView
        style={[
          styles.lesson,
          {
            marginLeft: isLeft ? offset : 0,
            marginRight: !isLeft ? offset : 0,
          },
        ]}
        key={lesson.id}
      >
        <Lesson
          scrollViewRef={scrollViewRef}
          scrollY={scrollY}
          lesson={lesson}
          module={module}
          title={lesson.name.en}
          description={lesson.description.en}
          startLesson={() => startLessonHandler(lesson.id)}
        />
      </ThemedView>
    );
  });

  return (
    <ThemedView style={styles.moduleContainer} onLayout={handleLayout}>
      <UnitTitle title={module.name.en} />
      {moduleLessons}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  moduleContainer: {
    marginTop: 40,
    width: "100%",
  },
  lesson: {
    marginTop: 70,
    alignItems: "center",
  },
});
