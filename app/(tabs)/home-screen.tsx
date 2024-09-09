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
} from "react-native-reanimated";

import { useRef, useState } from "react";
export default function HomeScreen() {
  const modules: IModule[] = modulesMock;
  const scrollRef = useRef<Animated.ScrollView>(null);

  const [currentScrollY, setCurrentScrollY] = useState(0);



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
      <Animated.ScrollView
        onScroll={(event) => {
          setCurrentScrollY(event.nativeEvent.contentOffset.y);
        }}
        ref={scrollRef}
    
      >
        <ThemedView style={styles.container}>
          {modules.map((module) => {
            return (
              <LanguageModule
                scrollY={currentScrollY}
                scrollViewRef={scrollRef}
                key={module.id}
                module={module}
              ></LanguageModule>
            );
          })}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
{
  /* </ParallaxScrollView> */
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 350,
  },
});
