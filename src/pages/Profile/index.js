import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: "https://api.adorable.io/avatars/285/2.png",
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.name}>Monica Wood</Text>
        <Text style={styles.description}>Pacient</Text>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#8A8284" }}>Nome</Text>
        <TextInput
          placeholder="Ex: João"
          style={{
            height: 40,
            borderColor: "#8A8284",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#8A8284" }}>Sobrenome</Text>
        <TextInput
          placeholder="Ex: Silva"
          style={{
            height: 40,
            borderColor: "#8A8284",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#8A8284" }}>E-Mail</Text>
        <TextInput
          placeholder="Ex: email@email.com"
          style={{
            height: 40,
            borderColor: "#8A8284",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#4F46BA",
            height: 50,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}>
            Salvar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
