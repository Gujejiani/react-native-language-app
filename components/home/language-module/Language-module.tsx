import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IModule } from "@/models/";
import React, { useState, useRef } from "react";
import { StyleSheet, View, findNodeHandle } from "react-native";
import LessonButton from "@/components/ui-library/Lesson-Button/LessonButton";
import InfoModal from "@/components/ui-library/Info-modal/InfoModal";
import ModuleTitle from "./components/module-title/ModuleTitle";
import Lesson from "./components/lesson/Lesson";

interface LanguageModuleProps {
  module: IModule;
}

export const LanguageModule: React.FC<LanguageModuleProps> = ({ module }) => {

  const startLessonHandler = () =>{
    console.log('start lesson from module')
  }

 

  const moduleLessons = module.lessons.map((lesson) => {
    return (
      <ThemedView key={lesson.id}>
        <ThemedText>{lesson.name.en}</ThemedText>
        <ThemedText>{lesson.description.en}</ThemedText>
      </ThemedView>
    );
  });

  return (
    <ThemedView style={styles.moduleContainer}>
      <ModuleTitle title={module.name.en} />

      <View style={styles.module}>
      <Lesson startLesson={startLessonHandler} />
      </View>
      <View style={styles.module}>
      <Lesson  startLesson={startLessonHandler} />
      </View>

      {moduleLessons}
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
});
