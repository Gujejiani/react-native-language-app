import React, { useEffect, useRef } from "react";
import { Href, Stack, router, useLocalSearchParams } from "expo-router";
import LoadingPage from "@/pages/loading/Loading-page";

const LoadingScreen: React.FC = () => {
  const navigationTimeout = useRef<NodeJS.Timeout>();
  const { redirectUrl } = useLocalSearchParams<{ redirectUrl: string }>();

  useEffect(() => {
    // Clear any existing timeout when component mounts
    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
    }

    navigationTimeout.current = setTimeout(() => {
      try {
        router.replace("/");
      } catch (error) {
        console.warn("Navigation failed:", error);
      }
    }, 3000);

    // Cleanup function
    return () => {
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Loading screen",
          headerShown: false,
          gestureEnabled: false, // Prevent gesture navigation during loading
        }}
      />
      <LoadingPage />
    </>
  );
};

export default LoadingScreen;
