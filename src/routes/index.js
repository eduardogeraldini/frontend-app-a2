import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { Image, TouchableOpacity } from "react-native";

import Profile from "../pages/Profile";
import Historic from "../pages/Historic";
import Schedule from "../pages/Schedule";
import Consult from "../pages/Consult";
import Login from '../pages/Login';

import logo from "../assets/logo.png";

const AppStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const InitialStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
  >
    <AppStack.Screen
      name="Initial"
      options={{ title: "Initial" }}
      component={Login}
    />
  </AppStack.Navigator>
);

const ProfileStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerLeft: () => (
        <Image
          source={logo}
          style={{ width: 130, height: 25, marginLeft: 20 }}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Sair")}>
          <Feather
            name="log-out"
            size={25}
            color="#F9896B"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    }}
  >
    <AppStack.Screen
      name="Profile"
      options={{ headerTitle: "" }}
      component={Profile}
    />
  </AppStack.Navigator>
);

const HistoricStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerLeft: () => (
        <Image
          source={logo}
          style={{ width: 130, height: 25, marginLeft: 20 }}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Sair")}>
          <Feather
            name="log-out"
            size={25}
            color="#F9896B"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    }}
  >
    <AppStack.Screen
      name="Historic"
      options={{ headerTitle: "" }}
      component={Historic}
    />
  </AppStack.Navigator>
);

const ScheduleStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerLeft: () => (
        <Image
          source={logo}
          style={{ width: 130, height: 25, marginLeft: 20 }}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Sair")}>
          <Feather
            name="log-out"
            size={25}
            color="#F9896B"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    }}
  >
    <AppStack.Screen
      name="Schedule"
      options={{ headerTitle: "" }}
      component={Schedule}
    />
  </AppStack.Navigator>
);

const ConsultStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerLeft: () => (
        <Image
          source={logo}
          style={{ width: 130, height: 25, marginLeft: 20 }}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Sair")}>
          <Feather
            name="log-out"
            size={25}
            color="#F9896B"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    }}
  >
    <AppStack.Screen
      name="Consult"
      options={{ headerTitle: "" }}
      component={Consult}
    />
  </AppStack.Navigator>
);

const TabsNavigation = () => (
  <Tabs.Navigator
    tabBarOptions={{
      showLabel: true,
      activeTintColor: "#4F46BA",
      style: { backgroundColor: "#FFF" },
      keyboardHidesTabBar: true,
    }}
    initialRouteName="Initial"
  >
    <Tabs.Screen
      name="Agenda"
      component={ScheduleStackScreen}
      options={{
        tabBarLabel: "Agenda",
        tabBarIcon: ({ size, color }) => (
          <Feather name="book" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Historico"
      component={HistoricStackScreen}
      options={{
        tabBarLabel: "Histórico",
        tabBarIcon: ({ size, color }) => (
          <Feather name="archive" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Consultar"
      component={ConsultStackScreen}
      options={{
        tabBarLabel: "Consultar-se",
        tabBarIcon: ({ size, color }) => (
          <Feather name="plus-circle" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Perfil",
        tabBarIcon: ({ size, color }) => (
          <Feather name="user" size={size} color={color} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default function Routes() {
  const [showInitialPage, setShowInitialPage] = useState(true);

  return (
    <NavigationContainer>
      {showInitialPage ? InitialStackScreen() : TabsNavigation()}
    </NavigationContainer>
  );
}
