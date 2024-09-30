import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CourseBackground } from "@/models";
import BounceButton from "@/components/ui-library/bounce-button/BounceButton";

interface SectionHeaderProps {
  title: string;
  description: string;
  onPress?: () => void;
  sectionBackgroundColor?: CourseBackground; // Add sectionId or sectionType prop
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  onPress,
  sectionBackgroundColor,
}) => {
  const handlePress = () => {
    console.log("section header pressed");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.infoWrapper}>
          <BounceButton
            style={{ ...styles.info, backgroundColor: sectionBackgroundColor }}
            pressEffectStyle={styles.infoPressEffect}
            onPress={handlePress}
          >
            <ThemedText style={styles.description}> {description} </ThemedText>
            <ThemedText style={styles.title}> {title} </ThemedText>
          </BounceButton>
        </ThemedView>
        <BounceButton
          onPress={handlePress}
          style={{ ...styles.guide, backgroundColor: sectionBackgroundColor }}
          pressEffectStyle={styles.guidePressEffect}
        >
          <ThemedText>
            <FontAwesome name="book" size={24} color="white" />
          </ThemedText>
        </BounceButton>
      </ThemedView>
    </ThemedView>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    position: "relative",
    top: 36,
    zIndex: 100,
    width: "100%",
  },
  infoPressEffect: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    left: 1,
  },
  guidePressEffect: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 200,
  },
  infoWrapper: {
    flex: 1,
  },
  info: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    zIndex: 10,
  },
  guide: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderLeftColor: "gray",
    borderLeftWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    left: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
    opacity: 0.6,
  },
});
