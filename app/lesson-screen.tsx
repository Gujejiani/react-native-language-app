import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
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
  }, [lesson]);
  const navigateToHomeHandler = () => {
    router.navigate("/");
  };

  const challengeCompletedHandler = () => {
    console.log("switch to next challenge");
  };

  const questionAnswered = (isCorrect: boolean) => {
    if (isCorrect && lesson) {
      console.log("Correct Answer", lesson.challenges[1].question);
    } else {
      console.log("Wrong Answer");
    }
    setCurrentChallenge(() => {
      return lesson?.challenges[1];
    });
  };

  useEffect(() => {
    if (lessonID) {
      // const lesson = modules
      //   .flatMap((module) => module.lessons)
      //   .find((lesson) => lesson.id === Number(lessonID));
      // if (lesson) {
      //   setLesson(lesson);
      //   // console.log(lesson);
      // }
      const lesson = modules[0].lessons[0];
      setLesson(lesson);
    }
    console.log("lesson props ", lessonID);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "lesson-screen!", headerShown: false }} />
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

    paddingHorizontal: 16,
  },
});

export default LessonScreen;
