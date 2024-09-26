// Question.tsx
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Entypo } from "@expo/vector-icons";

import { IChallenge } from "@/models";
import ChallengeButton from "../../components/Challange-Button";

interface QuickQuizChallengeProps {
  challenge: IChallenge;
  questionAnswered: (answerIsCorrect: boolean) => void;
}

export const QuickQuizChallenge: React.FC<QuickQuizChallengeProps> = ({
  challenge,
  questionAnswered,
}) => {
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<null | number>(null);

  const [isCorrect, setIsCorrect] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const currentQuestion = challenge.question;

  const handleOptionPress = (optionId: number, isCorrect: boolean) => {
    setSelectedOption(optionId);
    console.log("Option Pressed: ", optionId);
  };

  const buttonClickHandler = () => {
    if (answerChecked) {
      questionAnswered(isCorrect);

      return;
    }
    setAnswerChecked(true);
    const correct = challenge.options.find(
      (option) => option.id === selectedOption,
    )?.isCorrect;
    if (correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const renderOptions = () =>
    challenge.options.map((option) => (
      <TouchableOpacity
        key={option.id}
        disabled={answerChecked}
        style={[
          styles.optionButton,
          selectedOption === option.id && selectedOption
            ? option.isCorrect || !answerChecked
              ? styles.selectedOption
              : styles.wrongOption
            : {},
        ]}
        onPress={() => handleOptionPress(option.id, option.isCorrect)}
      >
        <Text style={styles.optionText}>{option.optionText}</Text>
        {selectedOption === option.id && selectedOption && answerChecked && (
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

      <View>
        <ChallengeButton
          style={!isCorrect && answerChecked ? styles.wrongAnswer : {}}
          onClick={buttonClickHandler}
          disabled={!selectedOption}
          buttonText={selectedOption && answerChecked ? "Continue" : "Check"}
        ></ChallengeButton>
      </View>
    </ThemedView>
  );
};

export default QuickQuizChallenge;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  wrongAnswer: {},
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
  selectedOption: {
    backgroundColor: "#4CAF50",
  },
  wrongOption: {
    backgroundColor: "#F44336",
  },
});
