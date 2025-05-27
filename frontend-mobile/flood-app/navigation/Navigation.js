import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { MaterialCommunityIcons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LocationScreen from "../screens/Location";
import TipsScreen from "../screens/TipsScreen";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { customTheme, theme, isDark, toggleTheme } = useTheme();

  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        screenOptions={{
          headerTitle: "HydroGuard",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerRight: () => (
            <Pressable onPress={toggleTheme} style={{ marginRight: 15 }}>
              <MaterialCommunityIcons
                name={isDark ? "white-balance-sunny" : "weather-night"}
                color={theme.accent}
                size={24}
              />
            </Pressable>
          ),
          // Adjust the tab bar style to evenly space the tabs
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Tips"
          component={TipsScreen}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: 'none' }, // Completely hide it
            headerTitle: "Tips för översvämningsskydd",
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="login" color={color} size={size} />
            ),
            tabBarLabel: "Login",
          }}
        />
        <Tab.Screen
          name="Location"
          component={LocationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
             <FontAwesome6 name="location-dot" color={color} size={size} />
            ),
            tabBarLabel: "Location",
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" color={color} size={size} />
            ),
            tabBarLabel: "User",
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" color={color} size={size} />
            ),
            tabBarLabel: "Setting",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;