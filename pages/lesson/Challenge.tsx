import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import LessonHeader from "./components/Lesson-Header";
import { IChallenge } from "@/models";
import QuickQuizChallenge from "./challenge-types/QuickQuiz/QuickQuiz";

interface ChallengeProps {
  navigateToHome: () => void;
  progress: number;
  challenge: IChallenge;
  challengeCompleted: () => void;
  questionAnswered: (isCorrect: boolean) => void;
  nextChallengeUnlocked: boolean;
}

export const Challenge: React.FC<ChallengeProps> = ({
  navigateToHome,
  progress,
  challenge,
  challengeCompleted,
  questionAnswered,
  nextChallengeUnlocked,
}) => {
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <LessonHeader navigateToHome={navigateToHome} progress={progress} />

      <View style={styles.challenge}>
        <QuickQuizChallenge
          questionAnswered={questionAnswered}
          challenge={challenge}
        />
      </View>

      {/* <View style={styles.buttonContainer}>
        <ChallengeButton  onClick={questionAnswered} disabled={isSelected} buttonText={isSelected && checkAnswer? 'Continue': 'Check'} ></ChallengeButton>  

        </View> */}
    </ThemedView>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },

  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  challenge: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  nextButtonDisabled: {
    opacity: 0.5,
    backgroundColor: "#f0f0f0",
  },
  nextButton: {
    alignItems: "center",
    padding: 15,
    borderRadius: 8,

    backgroundColor: "#34D399", // Green background

    marginBottom: 40,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
});
