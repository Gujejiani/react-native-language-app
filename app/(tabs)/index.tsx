import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IUnit, CourseBackground } from "@/models";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import HomeScreenHeader from "@/pages/home/header/Header";
import SectionHeader from "@/pages/home/course-module/components/section-header/SectionHeader";
import modulesMock from "@/mock/course.mock";
import { CourseModule } from "@/pages/home/course-module/Course-module";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchCourses } from "@/store/courses.effects";
import { router } from "expo-router";

export default function HomeScreen() {
  const dispatch = useDispatch();


  const courses = useSelector((state: RootState) => state.courses);

  const modules: IUnit[] = modulesMock;
  const scrollRef = useRef<Animated.ScrollView>(null);

  const [currentScrollY, setCurrentScrollY] = useState(0);

  const [visibleModule, setVisibleModule] = useState<IUnit>(modules[0]);

  // module id => positionY
  const [modulePositionsY, setModulePositionsY] = useState<
    Record<number, number>
  >([]);

  const courseClickedHandler = (id: number) => {
   

    router.navigate({
      pathname: '/loading-screen',
      params: {
        redirectUrl: './index.tsx'
      }
    })

    console.log("course clicked index.tsx", id);
  };

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
    
    console.log("fetching courses");
    dispatch(fetchCourses() as any);
  }, []);
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

      <HomeScreenHeader
        courseClicked={courseClickedHandler}
        courses={courses.courses}
      ></HomeScreenHeader>

      <SectionHeader
        sectionBackgroundColor={visibleModule.unitColor}
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
