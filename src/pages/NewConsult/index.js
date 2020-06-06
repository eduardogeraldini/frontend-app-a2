import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import moment from "moment";
import api from "../../services/api";

import styles from "./styles";

export default function NewConsult({ route }) {
  const [avatar, setAvatar] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptons, setSymptons] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    if (mode == "date") setDate(currentDate);
    else setTime(currentDate);
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

  useEffect(() => {
    async function fetchData() {
      console.log(route.params);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
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
            uri: route.params.avatar_path,
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.name}>{route.params.name}</Text>
        <Text style={styles.description}>{route.params.description}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Data</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            placeholder="Selecione uma data..."
            value={date && moment(date).format("DD/MM/YYYY")}
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
            value={time && moment(time).format("HH:mm")}
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
            Agendar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
