import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ChallengeButtonProps {
  onClick: () => void;
  disabled: boolean;

  buttonText: string;
  style?: {};
}

const ChallengeButton: React.FC<ChallengeButtonProps> = ({
  onClick,
  disabled,
  buttonText,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.nextButton,
        disabled ? styles.nextButtonDisabled : {},

        style,
      ]}
      onPress={onClick}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
  return;
};

const styles = StyleSheet.create({
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
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

export default ChallengeButton;
