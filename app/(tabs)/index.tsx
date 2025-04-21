import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ICourse, ISection } from "@/models";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { act, useCallback, useEffect, useRef, useState } from "react";
import HomeScreenHeader from "@/pages/home/header/Header";
import SectionHeader from "@/pages/home/course-module/components/section-header/SectionHeader";
import {mockCourses, unitsMock} from "@/mock/course.mock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchCourses } from "@/store/courses.effects";
import { router } from "expo-router";
import { setActiveCourseId } from "@/store/courses";
import { Section } from "@/pages/home/course-module/Section";


export default function HomeScreen() {
  const dispatch = useDispatch();

  const courses = useSelector((state: RootState) => state.courses.courses);

  const activeCourse = useSelector((state: RootState) => state.courses.courses.find((course) => course.id === state.courses.activeCourseId));

  const activeMockCourse: ICourse = mockCourses[0]


  const activeCourseData  = 4>3 ? activeMockCourse: activeCourse;

  const sections: ISection[] = activeCourseData?.sections || [];

  const scrollRef = useRef<Animated.ScrollView>(null);

  const [currentScrollY, setCurrentScrollY] = useState(0);

  const [visibleModule, setVisibleUnit] = useState<ISection>(sections[0]);

  // module id => positionY
  const [sectionPositionY, setSectionPositionsY] = useState<
    Record<number, number>
  >([]);

  const courseClickedHandler = (id: number) => {
    router.navigate({
      pathname: "/loading-screen",
    });

    dispatch(setActiveCourseId(id));
    console.log("course clicked index.tsx", id);
  };

  const setVisibleSectionHandler = (moduleID: number) => {
    if (moduleID === visibleModule.id) {
      return;
    }

    const section = sections.find((unit) => unit.id === moduleID);

    if (section) {
      setVisibleUnit(section);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };
  useEffect(() => {
    console.log("fetching courses");
    dispatch(fetchCourses() as any);

  }, []);
  useEffect(() => {
    determineVisibleSection(currentScrollY);
  }, [currentScrollY]);

  const determineVisibleSection = (scrollY: number) => {
    const sectionIds = Object.keys(sectionPositionY).map((id) => parseInt(id));

    let closestModalId = sectionIds[0];
    sectionIds.forEach((id) => {
      if (sectionPositionY[id] < scrollY) {
        closestModalId = id;
      }
    });

    setVisibleSectionHandler(closestModalId);
  };

  const setSectionPositionYHandler = useCallback(
    (sectionID: number, positionY: number) => {
      setSectionPositionsY((prevState) => {
        return {
          ...prevState,
          [sectionID]: positionY,
        };
      });
    },
    [],
  );

  return (
    <ThemedView>
      <HomeScreenHeader
        courseClicked={courseClickedHandler}
        courses={courses}
      ></HomeScreenHeader>

      <SectionHeader
        sectionBackgroundColor={visibleModule.sectionColor}
        // TODO 
        title={visibleModule.name.en}
        description={visibleModule.name.en}
      ></SectionHeader>
      <Animated.ScrollView
        onScroll={(event) => {
          setCurrentScrollY(event.nativeEvent.contentOffset.y);
        }}
        ref={scrollRef}
      >
        <ThemedView style={styles.container}>
          {
          // activeCourse?.sections[0]?.units.map((module) => {
            activeCourseData?.sections.map((section) => {
            return (
              <Section
                updateModulePosition={setSectionPositionYHandler}
                scrollY={currentScrollY}
                scrollViewRef={scrollRef}
                key={section.id}
                section={section}
              ></Section>
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
