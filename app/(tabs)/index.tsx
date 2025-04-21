import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IUnit, CourseBackground, ICourse } from "@/models";
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


// TODO now header is looking for module name it must take a look for section data instead unit
export default function HomeScreen() {
  const dispatch = useDispatch();

  const courses = useSelector((state: RootState) => state.courses.courses);

  const activeCourse = useSelector((state: RootState) => state.courses.courses.find((course) => course.id === state.courses.activeCourseId));

  const activeMockCourse: ICourse = mockCourses[0]


  const activeCourseData  = 4>3 ? activeMockCourse: activeCourse;

  const units: IUnit[] = activeCourseData?.sections[0]?.units || [];

  const scrollRef = useRef<Animated.ScrollView>(null);

  const [currentScrollY, setCurrentScrollY] = useState(0);

  const [visibleModule, setVisibleUnit] = useState<IUnit>(units[0]);

  // module id => positionY
  const [modulePositionsY, setModulePositionsY] = useState<
    Record<number, number>
  >([]);

  const courseClickedHandler = (id: number) => {
    router.navigate({
      pathname: "/loading-screen",
    });

    dispatch(setActiveCourseId(id));
    console.log("course clicked index.tsx", id);
  };

  const setVisibleUnitHandler = (moduleID: number) => {
    if (moduleID === visibleModule.id) {
      return;
    }

    const unit = units.find((unit) => unit.id === moduleID);

    if (unit) {
      setVisibleUnit(unit);
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

    setVisibleUnitHandler(closestModalId);
  };

  const setUnitPositionsYHandler = useCallback(
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
        courses={courses}
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
          {
          // activeCourse?.sections[0]?.units.map((module) => {
            activeCourseData?.sections.map((section) => {
            return (
              <Section
                updateModulePosition={setUnitPositionsYHandler}
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
