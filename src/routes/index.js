import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import {
  View,
  ActivityIndicator
} from "react-native";

// Stacks screens
import ProfileStackScreen from "../routes/Stacks/Profile";
import HistoricStackScreen from "../routes/Stacks/History";
import ScheduleStackScreen from "../routes/Stacks/Schedule";
import ConsultStackScreen from "../routes/Stacks/Consult";
import AuthStackScreen from "../routes/Stacks/Auth";

// Tab navigation
const Tabs = createBottomTabNavigator();

//Auth Context
import { Context } from "./../context/AuthContext";

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
  const { authenticated, loadingAuth } = useContext(Context);

  if (loadingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authenticated ? TabsNavigation() : AuthStackScreen()}
    </NavigationContainer>
  );
}
