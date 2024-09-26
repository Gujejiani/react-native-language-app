// Question.tsx
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Entypo } from "@expo/vector-icons";

import { IChallenge } from "@/models";

interface QuickQuizChallengeProps {
  challenge: IChallenge;

  correctlyAnswered: () => void;
}

export const QuickQuizChallenge: React.FC<QuickQuizChallengeProps> = ({
  challenge,
  correctlyAnswered,
}) => {
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<null | number>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = challenge.question;

  const handleOptionPress = (optionId: number, isCorrect: boolean) => {
    setSelectedOption(optionId);
    setIsAnswered(true);

    // Handle correct answer logic here, like updating progress, etc.
    if (isCorrect) {
      console.log("Correct Answer!");
      correctlyAnswered();
    } else {
      console.log("Wrong Answer");
    }
  };

  const renderOptions = () =>
    challenge.options.map((option) => (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.optionButton,
          selectedOption === option.id && isAnswered
            ? option.isCorrect
              ? styles.correctOption
              : styles.wrongOption
            : {},
        ]}
        onPress={() => handleOptionPress(option.id, option.isCorrect)}
        disabled={isAnswered}
      >
        <Text style={styles.optionText}>{option.optionText}</Text>
        {selectedOption === option.id && isAnswered && (
          <Entypo
            name={option.isCorrect ? "check" : "cross"}
            size={20}
            color="white"
            style={styles.optionIcon}
          />
        )}
      </TouchableOpacity>
    ));

  return (
    <ThemedView style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion}</Text>
        <View style={styles.optionsContainer}>{renderOptions()}</View>
      </View>
    </ThemedView>
  );
};

export default QuickQuizChallenge;

const styles = StyleSheet.create({
  container: {},
  questionContainer: {
    marginTop: 50,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionsContainer: {},
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  optionIcon: {
    marginLeft: 10,
  },
  correctOption: {
    backgroundColor: "#4CAF50",
  },
  wrongOption: {
    backgroundColor: "#F44336",
  },
});
