import React, { useState, useEffect, useContext } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { Context } from "./../../context/AuthContext";

import api from "../../services/api";
const apiBase = "https://consultai.herokuapp.com/files/";

export default function Historic() {
  const [consultationsOpened, setConsultationsOpened] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userId } = useContext(Context);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await api.get(`/users/${userId}/consults`);

      if (!data.message) {
        setConsultationsOpened(data.filter((consult) => consult.isOpen == 1));
      }

    } catch (error) {
      Alert.alert(
        "Ocorreu um erro!",
        "Não foi possível carregar as informações, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10, marginLeft: 10, fontSize: 19, fontWeight: 'bold', color: 'grey' }}>Histórico</Text>
      {
        consultationsOpened.length > 0 ?
          <FlatList
            showsVerticalScrollIndicator={false}
            data={consultationsOpened}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardAllConsults}>
                <View style={styles.bodyAllConsults}>
                  <Image
                    source={{ uri: `${apiBase}${item.avatar_path}` }}
                    style={styles.avatarAllConsults}
                  />
                  <View style={styles.textContainerAllConsults}>
                    <Text style={styles.doctorNameAllConsults}>
                      {item.first_name} {item.last_name}
                    </Text>
                    <Text style={styles.doctorDataAllConsults}>
                      {item.date} às {item.time}h
                  </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Feather
                    style={styles.icons}
                    name="info"
                    color="#4F46BA"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            )}
          /> :
          <View style={styles.notFoundContainer}>
            <Text>Você nunca usou o app para consultas!</Text>
            <Image
              source={require("../../assets/not_found.png")}
              resizeMode="contain"
              style={{ width: 200, height: 200 }}
            />
          </View>

      }
    </View>
  );
}
