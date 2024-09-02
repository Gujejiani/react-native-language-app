import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCustomThemeContext } from "@/context/theme/themeProvider";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const ModuleTitle: React.FC<{ title: string }> = ({ title }) => {
  const themeContext = useCustomThemeContext();

  const color = Colors[themeContext.theme].textSecondaryColor;

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={[styles.line, { backgroundColor: color }]} />
      <ThemedText style={[styles.moduleTitle, { color: color }]}>
        {title}
      </ThemedText>
      <ThemedView style={[styles.line, { backgroundColor: color }]} />
    </ThemedView>
  );
};

export default ModuleTitle;

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  moduleTitle: {
    textAlign: "center",
    paddingHorizontal: 10,
    color: "gray",
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    height: 1,

    marginHorizontal: 10,
  },
});
