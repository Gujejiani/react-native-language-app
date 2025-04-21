import { ThemedView } from "@/components/ThemedView";
import { ISection, IUnit } from "@/models/";
import React from "react";
import { StyleSheet, LayoutChangeEvent } from "react-native";
import UnitTitle from "./components/module-title/UnitTitle";
import Unit from "./components/unit/Unit";
import Animated from "react-native-reanimated";
import { router } from "expo-router";

interface CourseModuleProps {
  section: ISection;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: number; // Receive shared scroll value
  updateModulePosition: (id: number, positionY: number) => void;
}

export const Section: React.FC<CourseModuleProps> = ({
  section,
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
    updateModulePosition(section.id, y);
  };

  const moduleLessons = section?.units?.map((unit, index) => {
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
        key={unit.id}
      >
        <Unit
          scrollViewRef={scrollViewRef}
          scrollY={scrollY}
          sectionColor={section.sectionColor}
          // lesson={lesson}
          unit={unit}
          title={unit.name.en}
          description={unit.description.en}
          startLesson={() => startLessonHandler(unit.id)}
        />
      </ThemedView>
    );
  });

  return (
    <ThemedView style={styles.moduleContainer} onLayout={handleLayout}>
      <UnitTitle title={section.name.en} />
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
