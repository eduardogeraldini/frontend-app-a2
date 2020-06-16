import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../../pages/Login";
import Register from "../../../pages/Register";

const AppStack = createStackNavigator();

export default function AuthStackScreen() {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
    >
      <AppStack.Screen
        name="Auth"
        options={{ title: "Auth" }}
        component={Login}
      />
      <AppStack.Screen
        name="Register"
        options={{ title: "Register" }}
        component={Register}
      />
    </AppStack.Navigator>
  );
}
