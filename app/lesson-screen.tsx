import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router, Stack, useLocalSearchParams } from "expo-router";

import { IChallenge, ILesson } from "@/models";
import modulesMock from "@/mock/course.mock";
import Challenge from "@/pages/lesson/Challenge";

const modules = modulesMock;
const LessonScreen: React.FC<{}> = (props) => {
  const progress = 0.5;
  const [lesson, setLesson] = useState<ILesson>();
  const { lessonID } = useLocalSearchParams();

  const [nextChallengeUnlocked, setNextChallengeUnlocked] = useState(false);

  const [currentChallenge, setCurrentChallenge] = useState<IChallenge>();

  useEffect(() => {
    if (lesson) {
      setCurrentChallenge(lesson.challenges[0]);
    }
  });
  const navigateToHomeHandler = () => {
    router.navigate("/");
  };

  const challengeCompletedHandler = () => {
    console.log("switch to next challenge");
  };

  const questionAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      setCurrentChallenge(lesson?.challenges[1]);
    } else {
      console.log("Wrong Answer");
    }
  };

  useEffect(() => {
    if (lessonID) {
      const lesson = modules
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.id === Number(lessonID));
      if (lesson) {
        setLesson(lesson);
        // console.log(lesson);
      }
    }
    console.log("lesson props ", lessonID);
  }, [props]);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        {currentChallenge ? (
          <Challenge
            nextChallengeUnlocked={nextChallengeUnlocked}
            challenge={currentChallenge}
            progress={progress}
            navigateToHome={navigateToHomeHandler}
            challengeCompleted={challengeCompletedHandler}
            questionAnswered={questionAnswered}
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
