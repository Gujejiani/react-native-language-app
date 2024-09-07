import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCustomThemeContext } from "@/context/theme/themeProvider";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const HomeScreenHeader = () => {
  const themeContext = useCustomThemeContext();

  const iconColor = Colors[themeContext.theme].tint;

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity>
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
    top: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sideBySide: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
