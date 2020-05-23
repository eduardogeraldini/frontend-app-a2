import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";


import styles from "./styles";

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Autenticação</Text>
    </View>
  );
}
