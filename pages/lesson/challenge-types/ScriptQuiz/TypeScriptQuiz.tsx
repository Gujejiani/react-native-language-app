import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ChallengeButton from "../../components/Challange-Button";
import { IChallenge } from "@/models";

interface TypeScriptQuizProps {
  challenge: IChallenge;
  questionAnswered: (answerIsCorrect: boolean) => void;
}

export const TypeScriptQuiz: React.FC<TypeScriptQuizProps> = ({
  challenge,
  questionAnswered,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [answerChecked, setAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    const answer = challenge.options.find((option) => option.isCorrect);
    setCorrectAnswer(answer?.optionText || "");
  }, [challenge]);

  const handleSuggestionPress = (suggestion: string) => {
    setUserAnswer(suggestion);
  };

  const handleCheckAnswer = () => {
    setAnswerChecked(true);
    const isCorrectAnswer = userAnswer.trim() === correctAnswer.trim();
    setIsCorrect(isCorrectAnswer);
    questionAnswered(isCorrectAnswer);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{challenge.question}</Text>
        <TextInput
          style={styles.input}
          value={userAnswer}
          onChangeText={(text) => setUserAnswer(text)}
          placeholder="Type your answer here..."
          editable={!answerChecked}
        />
        <View style={styles.suggestionsContainer}>
          {challenge.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionButton}
              onPress={() => handleSuggestionPress(option.optionText)}
            >
              <Text style={styles.suggestionText}>{option.optionText}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <ChallengeButton
          style={!isCorrect && answerChecked ? styles.wrongAnswer : {}}
          onClick={handleCheckAnswer}
          disabled={!userAnswer}
          buttonText={answerChecked ? "Continue" : "Check Answer"}
        />
      </View>
    </ThemedView>
  );
};

export default TypeScriptQuiz;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  wrongAnswer: {
    backgroundColor: "red",
  },
  questionContainer: {
    marginTop: 50,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  suggestionText: {
    color: "#333",
  },
});
