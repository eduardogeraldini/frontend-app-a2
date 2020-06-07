import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";

import styles from "./styles";

const apiBase = "https://consultai.herokuapp.com/files/";

export default function Consult() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get("/alldocespec");

        setData(res.data);
      } catch (error) {
        Alert.alert(
          "Ocorreu um erro!",
          "Não foi possível carregar as informações, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function navigateToNewConsult(params) {
    navigation.push("NewConsult", params);
  }

  if (loading) {
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
                  uri: `${apiBase}${item.avatar_path}`,
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
                    avatar_path: `${apiBase}${item.avatar_path}`,
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
