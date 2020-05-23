import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import styles from "./styles";

export default function Profile() {
  const [avatar, setAvatar] = useState('');

  const navigation = useNavigation();

  async function _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setAvatar(result.uri)
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, [])



  async function getPermissionAsync() {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } 
      else {
        console.log(status);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.userAvatar}
        />
        <TouchableOpacity
          onPress={() => _pickImage()}
        >
          <Text style={styles.name}>Monica Wood</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Pacient</Text>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#8A8284" }}>Nome</Text>
        <TextInput
          placeholder="Ex: João"
          style={{
            height: 40,
            borderColor: "#8A8284",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#8A8284" }}>Sobrenome</Text>
        <TextInput
          placeholder="Ex: Silva"
          style={{
            height: 40,
            borderColor: "#8A8284",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#8A8284" }}>E-Mail</Text>
        <TextInput
          placeholder="Ex: email@email.com"
          style={{
            height: 40,
            borderColor: "#8A8284",
            borderBottomWidth: 1,
          }}
        />
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
            Salvar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
