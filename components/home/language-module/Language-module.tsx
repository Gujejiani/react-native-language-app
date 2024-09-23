import { ThemedView } from "@/components/ThemedView";
import { IModule } from "@/models/";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, LayoutChangeEvent } from "react-native";
import ModuleTitle from "./components/module-title/ModuleTitle";
import Lesson from "./components/lesson/Lesson";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface LanguageModuleProps {
  module: IModule;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: number; // Receive shared scroll value
  updateModulePosition: (id: number, positionY: number) => void;
}

export const LanguageModule: React.FC<LanguageModuleProps> = ({
  module,
  scrollViewRef,
  scrollY,
  updateModulePosition,
}) => {
  const startLessonHandler = () => {
    console.log("start lesson from module");
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
          startLesson={startLessonHandler}
        />
      </ThemedView>
    );
  });

  return (
    <ThemedView style={styles.moduleContainer} onLayout={handleLayout}>
      <ModuleTitle title={module.name.en} />
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
