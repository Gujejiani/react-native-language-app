import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import HomeScreenHeader from "@/components/home/header/Header";
import { modulesMock } from "@/mock/language.mock";
import { LanguageModule } from "@/components/home/language-module/Language-module";
import { IModule } from "@/models";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
export default function HomeScreen() {
  const modules: IModule[] = modulesMock;
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/partial-react-logo.png")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    <ThemedView>
           <HomeScreenHeader></HomeScreenHeader>
  <Animated.ScrollView >
 

      <ThemedView>
        {modules.map((module) => {
          return (
            <LanguageModule key={module.id} module={module}></LanguageModule>
          );
        })}
      </ThemedView>

      </Animated.ScrollView>
  
      </ThemedView>
  );
}
  {/* </ParallaxScrollView> */}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
