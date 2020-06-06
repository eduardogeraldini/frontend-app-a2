import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";

import styles from "./styles";

export default function Consult() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/alldocespec");

      setData(res.data);
    }

    fetchData();
  }, []);

  function navigateToNewConsult(params) {
    navigation.push("NewConsult", params);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Médicos</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeftSide}>
              <Image
                source={{
                  uri: `http://192.168.0.105:3000/files/${item.avatar_path}`,
                }}
                style={styles.doctorAvatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.doctorName}>
                  {item.first_name + " " + item.last_name}
                </Text>
                <Text style={styles.doctorDescription}>{item.title}</Text>
              </View>
            </View>

            <View style={styles.cardRightSide}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  navigateToNewConsult({
                    id: item.id,
                    name: item.first_name + " " + item.last_name,
                    description: item.title,
                    avatar_path: `http://192.168.0.105:3000/files/${item.avatar_path}`,
                  })
                }
              >
                <Feather name="arrow-right" size={25} color="#4F46BA" />
                <Text style={styles.textIcon}>Agendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
