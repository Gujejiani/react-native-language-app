import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IModule } from "@/models/";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, findNodeHandle } from "react-native";
import LessonButton from "@/components/ui-library/Lesson-Button/LessonButton";
import InfoModal from "@/components/ui-library/Info-modal/InfoModal";
import ModuleTitle from "./components/module-title/ModuleTitle";
import Lesson from "./components/lesson/Lesson";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface LanguageModuleProps {
  module: IModule;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: number; // Receive shared scroll value
}

export const LanguageModule: React.FC<LanguageModuleProps> = ({
  module,
  scrollViewRef,
  scrollY,
}) => {
  const startLessonHandler = () => {
    console.log("start lesson from module");
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
          title={lesson.name.en}
          description={lesson.description.en}
          startLesson={startLessonHandler}
        />
      </ThemedView>
    );
  });

  return (
    <ThemedView style={styles.moduleContainer}>
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
    // position: "absolute",
    marginTop: 70,
    alignItems: "center",
  },
  module: {
    position: "relative",
    marginTop: 50,
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
  left: {
    alignSelf: "flex-start", // Aligns the lesson to the left
  },
  right: {
    alignSelf: "flex-end", // Aligns the lesson to the right
  },
});
