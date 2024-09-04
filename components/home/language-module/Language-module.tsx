import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IModule } from "@/models/";
import React, { useState, useRef } from "react";
import { StyleSheet, View, findNodeHandle } from "react-native";
import ModuleTitle from "./components/module-title/ModuleTitle";
import LessonButton from "@/components/ui-library/Lesson-Button/LessonButton";
import InfoModal from "@/components/ui-library/Info-modal/InfoModal";

interface LanguageModuleProps {
  module: IModule;
}

export const LanguageModule: React.FC<LanguageModuleProps> = ({ module }) => {
  const [showModal, setShowModal] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);

  const buttonPressHandler = () => {
    // Measure the button position on the screen
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setButtonPosition({ x: px, y: py + height });
      setShowModal(true);
    });
  };

  const modalAction = () => {
    setShowModal(false);
    console.log("Modal Action");
  };

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
        <View ref={buttonRef}>
          <LessonButton iconName="star" progress={0.75} label="Start" onPress={buttonPressHandler} />
        </View>
        <View style={styles.modal}>
          <InfoModal
            visible={showModal}
            title="Describe a scary hotel"
            description={"1 - 4 lesson"}
            action={modalAction}
            buttonPosition={buttonPosition}
            onClose={modalAction}
          />
        </View>
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
  modal: {},
  module: {
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
