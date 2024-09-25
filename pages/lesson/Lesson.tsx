// Question.tsx
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Entypo } from "@expo/vector-icons";
import LessonHeader from "./components/Lesson-Header";
import { IChallenge } from "@/models";
import QuickQuizChallenge from "./lesson-types/QuickQuiz/QuickQuiz";

interface LessonProps {
  navigateToHome: () => void;
  progress: number;
  challenge: IChallenge;
}

export const Lesson: React.FC<LessonProps> = ({
  navigateToHome,
  progress,
  challenge,
}) => {
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <LessonHeader navigateToHome={navigateToHome} progress={progress} />

      <View style={styles.challenge}>
        <QuickQuizChallenge challenge={challenge} />
      </View>
    </ThemedView>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  challenge: {},
});
