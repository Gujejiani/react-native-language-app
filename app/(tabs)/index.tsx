import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IModule, CourseBackground } from "@/models";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import HomeScreenHeader from "@/pages/home/header/Header";
import SectionHeader from "@/pages/home/course-module/components/section-header/SectionHeader";
import modulesMock from "@/mock/course.mock";
import { CourseModule } from "@/pages/home/course-module/Course-module";

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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  useEffect(() => {
    determineVisibleModule(currentScrollY);
  }, [currentScrollY]);

  const determineVisibleModule = (scrollY: number) => {
    const moduleIDs = Object.keys(modulePositionsY).map((id) => parseInt(id));

    let closestModalId = moduleIDs[0];
    moduleIDs.forEach((id) => {
      if (modulePositionsY[id] < scrollY) {
        closestModalId = id;
      }
    });

    setVisibleModuleHandler(closestModalId);
  };

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
              <CourseModule
                updateModulePosition={setModulePositionsYHandler}
                scrollY={currentScrollY}
                scrollViewRef={scrollRef}
                key={module.id}
                module={module}
              ></CourseModule>
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
