import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppLoading } from "expo";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import moment from "moment";
import api from "../../services/api";
import { Context } from "./../../context/AuthContext";

import styles from "./styles";

export default function NewConsult({ route }) {
  const { spec_id, doctor_id, name, description, avatar_path } = route.params;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptons, setSymptons] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const navigation = useNavigation();
  const { userId } = useContext(Context);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");


    if (mode == "date") {
      setDate(moment(currentDate).format("DD/MM/YYYY"));
    } else {
      setTime(moment(currentDate).format("HH:mm"));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const toggleSwitch = () => setIsOpen((previousState) => !previousState);

  async function handleNewConsult() {
    setLoading(true);

    try {
      const { data } = await api.post("/consultations", {
        date,
        time,
        symptons,
        isOpen,
        doctor_id: doctor_id,
        user_id: userId,
      });

      Alert.alert(
        "Deu tudo certo!",
        "A sua consulta foi agendada com sucesso."
      );

      navigation.push("Consult");
    } catch (error) {
      Alert.alert(
        "Ocorreu um erro!",
        "Não foi possível agendar uma consulta, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
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
        <ActivityIndicator  size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.userContainer}>
        <Image
          source={{
            uri: avatar_path,
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Data</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            placeholder="Selecione uma data..."
            value={date}
            style={styles.inputText}
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Horário</Text>
        <TouchableOpacity onPress={showTimepicker}>
          <TextInput
            placeholder="Selecione um horário..."
            value={time}
            style={styles.inputText}
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Sintomas</Text>
        <TextInput
          placeholder="Descreva seus sintomas..."
          onChangeText={(text) => setSymptons(text)}
          style={styles.inputTextArea}
          multiline={true}
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainerSwitch}>
        <Text style={styles.inputLabel}>Concluída ?</Text>
        <Switch onValueChange={toggleSwitch} value={isOpen} />
      </View>

      <TouchableOpacity onPress={() => handleNewConsult()}>
        <View
          style={{
            backgroundColor: "#4F46BA",
            height: 50,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}>
            Agendar
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
