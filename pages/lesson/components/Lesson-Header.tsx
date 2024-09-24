import { ThemedView } from "@/components/ThemedView";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface LessonHeaderProps {
  navigateToHome: () => void;
  progress: number;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  navigateToHome,
  progress,
}) => {
  return (
    <ThemedView>
      <ThemedView style={styles.lessonHeader}>
        <Entypo onPress={navigateToHome} name="cross" size={30} color="black" />

        {/* Custom progress bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
          />
        </View>

        <MaterialIcons name="bug-report" size={30} color="black" />
      </ThemedView>
    </ThemedView>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBarBackground: {
    flex: 1,
    marginHorizontal: 10,
    height: 10,
    backgroundColor: "#e0e0e0", // Light gray background
    borderRadius: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "pink", // Progress bar color
    borderRadius: 5,
  },
});
