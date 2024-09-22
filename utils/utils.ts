import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";

/**
 *
 * @param modalContentRef
 * @param setIsFullyVisible
 * @param setModalTopOffset
 * @param scrollViewRef
 * @param scrollY
 * @description Check if modal is fully visible and adjust its position and scroll view accordingly
 */
export const checkIfModalIsFullyVisible = (
  modalContentRef: React.RefObject<View>,
  setModalTopOffset: (val: number) => void,
  scrollViewRef: React.RefObject<Animated.ScrollView>,
  scrollY: number,
) => {
  if (modalContentRef.current) {
    modalContentRef.current.measureInWindow((x, y, width, height) => {
      const windowHeight = Dimensions.get("window").height;
      const windowWidth = Dimensions.get("window").width;

      const isInViewport =
        x >= 0 &&
        y >= 0 &&
        x + width <= windowWidth &&
        y + height <= windowHeight;

      if (!isInViewport) {
        // Move modal up by 200 units if not fully visible

        setModalTopOffset(200);
        scrollViewRef.current?.scrollTo({
          y: scrollY + 200,
          animated: true,
        });
      }
    });
  }
};



