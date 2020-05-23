import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import logo from "../../assets/logo.png";
import medic from "../../assets/medic.png";

export default function Initial() {
  const navigation = useNavigation();

  const toHome = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => alert("Sair")}>
          <Feather name="log-out" size={25} color="#F9896B" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Image source={medic} style={styles.bodyImage} resizeMode="contain" />
        <Text style={styles.bodyDescription}>
          Agende sua consulta com um profissional da saúde mais perto da casa!
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerPreTitle}>REALIZE UMA</Text>
            <Text style={styles.footerTitle}>CONSULTA RÁPIDA</Text>
          </View>
          <TouchableOpacity style={styles.blockIcon} onPress={toHome}>
            <Feather name="arrow-right" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
