import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import { Image, TouchableOpacity } from "react-native";

import Schedule from "../../../pages/Schedule";

import logo from "../../../assets/logo.png";

//Auth Context
import { Context } from "../../../context/AuthContext";

const AppStack = createStackNavigator();

export default function ScheduleStackScreen() {
  const { handleLogout } = useContext(Context);

  return (
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
          <TouchableOpacity onPress={() => handleLogout()}>
            <Feather
              name="log-out"
              size={25}
              color="#4F46BA"
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
}
