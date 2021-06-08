import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile, Main, FreeBoard } from "../screens";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";

const Tab = createBottomTabNavigator();

const TabBarIconIonicons = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <Ionicons
      name={name}
      size={focused ? 32 : 24}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const TabBarIconMaterialIcons = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={focused ? 32 : 24}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const TabBarIconAntDesign = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <AntDesign
      name={name}
      size={focused ? 32 : 24}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const MainTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
        headerShown: false,
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Idu"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconIonicons({
              focused,
              name: focused ? "home" : "home-outline",
            }),
        }}
      />
      <Tab.Screen
        name="게시판"
        component={FreeBoard}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconMaterialIcons({
              focused,
              name: "forum",
            }),
        }}
      />
      <Tab.Screen
        name="프로필"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconMaterialIcons({
              focused,
              name: "person",
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
