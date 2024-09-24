import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Lesson from "@/pages/lesson/Lesson";
import { ILesson } from "@/models";
import modulesMock from "@/mock/language.mock";

const modules = modulesMock;
const LessonScreen: React.FC<{}> = (props) => {
  const progress = 0.5;
  const [lesson, setLesson] = useState<ILesson>();
  const { lessonID } = useLocalSearchParams();

  const navigateToHomeHandler = () => {
    router.navigate("/home-screen");
  };

  useEffect(() => {
    if (lessonID) {
      const lesson = modules
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.id === Number(lessonID));
      if (lesson) {
        setLesson(lesson);
        console.log(lesson);
      }
    }
    console.log("lesson props ", lessonID);
  }, [props]);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        {lesson?.challenges.length ? (
          <Lesson
            challenge={lesson.challenges[0]}
            progress={progress}
            navigateToHome={navigateToHomeHandler}
          />
        ) : (
          ""
        )}
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
  },
});

export default LessonScreen;
