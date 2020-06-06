import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";

export default function Schedule() {

  const navigation = useNavigation();

  function callPhoneNmber(number) {
    Linking.openURL(`tel:${number}`);
  }

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
                uri: "https://api.adorable.io/avatars/285/5.png",
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
          <TouchableOpacity onPress={() => callPhoneNmber("19994521874")}>
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

      <Text style={styles.title}>Consultas em aberto</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2]}
        keyExtractor={(list) => String(list)}
        renderItem={() => (
          <View style={styles.cardAllConsults}>
            <View style={styles.bodyAllConsults}>
              <Image
                source={{
                  uri: `https://api.adorable.io/avatars/285/${
                    Math.random() * 100
                  }.png`,
                }}
                style={styles.avatarAllConsults}
              />
              <View style={styles.textContainerAllConsults}>
                <Text style={styles.doctorNameAllConsults}>
                  Dr. Auzio da Silva
                </Text>
                <Text style={styles.doctorDataAllConsults}>
                  31/05/2020 às 14:20h
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
    </View>
  );
}
