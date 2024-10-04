import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCustomThemeContext } from "@/context/theme/themeProvider";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ChooseCourseModal from "../course-module/components/choose-course-modal/chooseCourseModal";
import { ICourse } from "@/models";
import { useState } from "react";

interface HomeScreenHeaderProps {
  courses: ICourse[];
  courseClicked: (id: number) => void;
}
export const HomeScreenHeader: React.FC<HomeScreenHeaderProps> = ({
  courses,
  courseClicked,
}) => {
  const themeContext = useCustomThemeContext();

  const [showChooseCourseModal, setShowChooseCourseModal] = useState(false);

  const iconColor = Colors[themeContext.theme].tint;

  const showCourseHandler = () => {
    setShowChooseCourseModal(true);
  };

  const courseClickedHandler = (id: number) => {
    setShowChooseCourseModal(false);
    courseClicked(id);
  };
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={showCourseHandler}>
        <Ionicons name="flag" size={24} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.sideBySide}>
          <Text>
            <FontAwesome5 name="fire-alt" size={24} color={iconColor} />
          </Text>

          <ThemedText>286</ThemedText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="diamond-sharp" size={24} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity>
        <View>
          <FontAwesome6 name="earlybirds" size={24} color={iconColor} />
        </View>
      </TouchableOpacity>

      <ChooseCourseModal
        onCourseClick={courseClickedHandler}
        courses={courses}
        isVisible={showChooseCourseModal}
        onClose={() => setShowChooseCourseModal(false)}
      />
    </ThemedView>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    zIndex: 100,
    top: 0,
    paddingHorizontal: 16,
  },
  sideBySide: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
