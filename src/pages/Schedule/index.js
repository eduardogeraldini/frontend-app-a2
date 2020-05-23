import React from "react";

import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";

export default function Schedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próxima consulta</Text>

      <View style={styles.nextSchedule}>
        <View style={styles.headerNextSchedule}>
          <Text style={styles.headerTitleNextSchedule}>
            Consulta agendada para
          </Text>
          <Text style={styles.headerDateNextSchedule}>
            25/04/2020 às 13:30h
          </Text>
        </View>
        <View style={styles.bodyNextSchedule}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://api.adorable.io/avatars/285/4.png",
              }}
              style={styles.avatarBodyNextSchedule}
            />
            <View>
              <Text style={styles.doctorNameBodyNextSchedule}>
                Dr. Auzio da Silva
              </Text>
              <Text style={styles.doctorDescriptionBodyNextSchedule}>
                Clinico Geral
              </Text>
            </View>
          </View>
          <Feather name="phone-call" color="#F9896B" size={25} />
        </View>
          <TouchableOpacity style={styles.footerNextSchedule}>
            <Text style={styles.footerTextNextSchedule}>
              Ver mais informações
            </Text>
            <Feather name="arrow-righ" size={15} color="#F9896B" />
          </TouchableOpacity>
      </View>

      <Text style={styles.title}>Todas as consultas</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(list) => String(list)}
        renderItem={() => <Text></Text>}
      />
    </View>
  );
}
