import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCustomThemeContext } from "@/context/theme/themeProvider";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const themeContext = useCustomThemeContext();

  const handleThemeToggle = () => {
    themeContext.setTheme();
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          title: "Home",
          // href: null if you want to hide
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore haha",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="theme"
        options={{
          title: "Theme",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={themeContext.theme === "dark" ? "sunny" : "moon-outline"}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={(e) => {
                e.preventDefault(); // Prevent the default navigation behavior
                handleThemeToggle(); // Toggle the theme
              }}
              style={{ flex: 1, alignItems: "center" }} // Adjust styling as needed
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
