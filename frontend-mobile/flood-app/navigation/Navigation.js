import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { MaterialCommunityIcons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LocationScreen from "../screens/Location";
import TipsScreen from "../screens/TipsScreen";

const Tab = createBottomTabNavigator();


const HeaderTitle = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: theme.textColor }]}>
        Hydro<Text style={{ color: theme.primary }}>Guard</Text>
      </Text>
      <MaterialCommunityIcons
        name="water"
        size={24}
        color={theme.primary}
        style={styles.primary}
      />
    </View>
  );
};

const Navigation = () => {
  const { customTheme, theme, isDark, toggleTheme } = useTheme();

  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        screenOptions={{
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: theme.card,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          },
          headerRight: () => (
            <Pressable
              onPress={toggleTheme}
              style={({ pressed }) => [
                styles.themeToggle,
                {
                  backgroundColor: pressed ? theme.backgroundSecondary : 'transparent',
                }
              ]}
            >
              <MaterialCommunityIcons
                name={isDark ? "white-balance-sunny" : "weather-night"}
                color={theme.primary}
                size={24}
              />
            </Pressable>
          ),
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={focused ? theme.primary : theme.secondary}
                size={focused ? size + 2 : size}
                style={{ opacity: focused ? 1 : 0.8 }}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ 
                color: focused ? theme.primary : theme.secondary,
                fontSize: 12,
                opacity: focused ? 1 : 0.8
              }}>
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Tips"
          component={TipsScreen}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: 'none' },
            headerTitle: "Tips för översvämningsskydd",
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign
                name="login"
                color={focused ? theme.primary : theme.secondary}
                size={focused ? size + 2 : size}
                style={{ opacity: focused ? 1 : 0.8 }}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ 
                color: focused ? theme.primary : theme.secondary,
                fontSize: 12,
                opacity: focused ? 1 : 0.8
              }}>
                Login
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Location"
          component={LocationScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome6 
                name="location-dot"
                color={focused ? theme.primary : theme.secondary}
                size={focused ? size + 2 : size}
                style={{ opacity: focused ? 1 : 0.8 }}
              />
            ),
            tabBarLabel: "Location",
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign 
                name="user" 
                color={focused ? theme.primary : theme.secondary}  
                size={focused ? size + 2 : size}
                style={{ opacity: focused ? 1 : 0.8 }}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ 
                color: focused ? theme.primary : theme.secondary,
                fontSize: 12,
                opacity: focused ? 1 : 0.8
              }}>
                User
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign 
                name="setting" 
                color={focused ? theme.primary : theme.secondary}  
                size={focused ? size + 2 : size}
                style={{ opacity: focused ? 1 : 0.8 }}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ 
                color: focused ? theme.primary : theme.secondary,
                fontSize: 12,
                opacity: focused ? 1 : 0.8
              }}>
                Setting
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerIcon: {
    marginLeft: 8,
  },
  themeToggle: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Navigation;