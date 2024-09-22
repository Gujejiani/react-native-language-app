import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { modulesMock } from "@/mock/language.mock";
import { LanguageModule } from "@/components/home/language-module/Language-module";
import { IModule, LanguageBackground } from "@/models";
import Animated from "react-native-reanimated";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/home/language-module/components/section-header/SectionHeader";
import HomeScreenHeader from "@/components/home/header/header";
export default function HomeScreen() {
  const modules: IModule[] = modulesMock;
  const scrollRef = useRef<Animated.ScrollView>(null);

  const [currentScrollY, setCurrentScrollY] = useState(0);

  const [visibleModule, setVisibleModule] = useState<IModule>(modules[0]);

  // module id => positionY
  const [modulePositionsY, setModulePositionsY] = useState<
    Record<number, number>
  >([]);

  const setVisibleModuleHandler = (moduleID: number) => {
    if (moduleID === visibleModule.id) {
      return;
    }

    const module = modules.find((module) => module.id === moduleID);

    if (module) {
      setVisibleModule(module);
    }
  };

  useEffect(() => {
    determineVisibleModule(currentScrollY);
  }, [currentScrollY]);

  const determineVisibleModule = useCallback(
    (scrollY: number) => {
      const moduleIDs = Object.keys(modulePositionsY).map((id) => parseInt(id));

      let closestModalId = moduleIDs[0];
      moduleIDs.forEach((id) => {
        if (modulePositionsY[id] < scrollY) {
          closestModalId = id;
        }
      });
      setVisibleModuleHandler(closestModalId);
    },
    [modulePositionsY],
  );

  const setModulePositionsYHandler = useCallback(
    (moduleID: number, positionY: number) => {
      setModulePositionsY((prevState) => {
        return {
          ...prevState,
          [moduleID]: positionY,
        };
      });
    },
    [],
  );

  return (
    <ThemedView>
      <HomeScreenHeader></HomeScreenHeader>

      <SectionHeader
        sectionBackgroundColor={visibleModule.moduleColor}
        title={visibleModule.name.en}
        description={visibleModule.description.en}
      ></SectionHeader>
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
                updateModulePosition={setModulePositionsYHandler}
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
