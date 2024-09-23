import React from "react";
import { StyleSheet, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router, Stack } from 'expo-router';
const LessonScreen: React.FC<{}> = () => {
  const progress = 0.5; // Progress value between 0 and 1

  const navigateToHome =()=>{
    router.navigate('/home-screen')
  }

  return (
    <>   
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
    <ThemedView style={styles.container}>
      <View style={styles.lessonHeader}>
        <Entypo onPress={navigateToHome} name="cross" size={30} color="black" />

        {/* Custom progress bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>

        <MaterialIcons name="bug-report" size={30} color="black" />
      </View>

      <ThemedText>LessonScreen</ThemedText>
    </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
  },
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

export default LessonScreen;
