import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { Context } from "./../../context/AuthContext";

import styles from "./styles";

const apiBase = "https://consultai.herokuapp.com/files/";

export default function Schedule() {
  const navigation = useNavigation();
  const { userId } = useContext(Context);

  const [consultationsOpened, setConsultationsOpened] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get(`/users/${userId}/consults`);

        if (!data.message) {
          setConsultationsOpened(data.filter((consult) => consult.isOpen == 0));
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

    fetchData();
  }, []);

  function callPhoneNmber(number) {
    Linking.openURL(`tel:${number}`);
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
      <Text style={styles.title}>Próxima consulta</Text>

      {consultationsOpened.length == 0 && (
        <View style={styles.notFoundContainer}>
          <Image
            source={require("../../assets/not_found.png")}
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
      {consultationsOpened.length > 0 && (
        <View style={styles.nextSchedule}>
          <View style={styles.headerNextSchedule}>
            <Text style={styles.headerTitleNextSchedule}>
              Consulta agendada para
            </Text>
            <Text style={styles.headerDateNextSchedule}>
              {consultationsOpened[0].date} às {consultationsOpened[0].time}h
            </Text>
          </View>
          <View style={styles.bodyNextSchedule}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri: `${apiBase}${consultationsOpened[0].avatar_path}`,
                }}
                style={styles.avatarBodyNextSchedule}
              />
              <View>
                <Text style={styles.doctorNameBodyNextSchedule}>
                  {consultationsOpened[0].first_name}{" "}
                  {consultationsOpened[0].last_name}
                </Text>
                <Text style={styles.doctorDescriptionBodyNextSchedule}>
                  Clinico Geral
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => callPhoneNmber(consultationsOpened[0].phone)}
            >
              <Feather
                style={styles.icons}
                name="phone-call"
                color="#4F46BA"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.footerNextSchedule}>
            <Text style={styles.footerTextNextSchedule}>
              Ver mais informações
            </Text>
            <Feather name="arrow-right" size={15} color="#4F46BA" />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.title}>Consultas em aberto</Text>

      {consultationsOpened.length == 0 && (
        <View style={styles.notFoundContainer}>
          <Image
            source={require("../../assets/not_found.png")}
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}

      {consultationsOpened.length > 0 && (
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
        />
      )}
    </View>
  );
}
