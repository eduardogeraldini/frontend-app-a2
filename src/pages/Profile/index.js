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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import api from "../../services/api";

import styles from "./styles";

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  async function listAll() {
    api.get("/users").then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
  }

  async function _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setAvatar(result.uri);
        _handleImagePicked(result);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        console.log(status);
      }
    }
  }

  async function _handleImagePicked(pickerResult) {
    let uploadResponse, uploadResult;

    try {
      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        if (uploadResponse.status === 200) {
          alert("Foto alterada com sucesso");
        }
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log(e);
      alert("Erro ao salvar imagem no banco de dados:(");
    }
  }

  async function uploadImageAsync(uri) {
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();

    formData.append("userphoto", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("first_name", "claire");
    formData.append("last_name", "bennet");
    formData.append("email", "bennet@gmail.com");
    formData.append("password", "333333");

    let options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return await api.post("/users", formData, options);
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.userAvatar}
        />
        <TouchableOpacity onPress={() => _pickImage()}>
          <Text style={styles.name}>Monica Wood</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Pacient</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome</Text>
        <TextInput placeholder="Ex: João" style={styles.inputText} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Sobrenome</Text>
        <TextInput placeholder="Ex: Silva" style={styles.inputText} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-Mail</Text>
        <TextInput placeholder="Ex: email@email.com" style={styles.inputText} />
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
