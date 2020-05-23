import React from "react";

import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";

export default function Consult() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Médicos</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(list) => String(list)}
        renderItem={() => (
          <View style={styles.card}>
            <View style={styles.cardLeftSide}>
              <Image
                source={{
                  uri: "https://api.adorable.io/avatars/285/4.png",
                }}
                style={styles.doctorAvatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.doctorName}>Dr. Auzio da Silva</Text>
                <Text style={styles.doctorDescription}>Clinico Geral</Text>
              </View>
            </View>

            <View style={styles.cardRightSide}>
              <TouchableOpacity style={styles.iconContainer}>
                <Feather name="arrow-right-circle" size={25} color="#4F46BA" />
                <Text style={styles.textIcon}>Agendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
