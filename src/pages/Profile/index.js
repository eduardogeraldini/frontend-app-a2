import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import api from "../../services/api";
import { Context } from "./../../context/AuthContext";

import styles from "./styles";


const apiBase = "https://consultai.herokuapp.com/files/"

export default function Profile() {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [changedPhoto, setChangedPhoto] = useState(false);
  const { userId } = useContext(Context);

  const navigation = useNavigation();

  async function listUserData() {
    api.get(`/users/${userId}/profile`).then(function (response) {
      console.log(response.data[0].avatar_path);
      setFirst_name(response.data[0].first_name);
      setLast_name(response.data[0].last_name);
      setEmail(response.data[0].email);
      setAvatar(response.data[0].avatar_path);
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
        setAvatar(result.uri)
        setChangedPhoto(true);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }

  useEffect(() => {
    listUserData();
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

  // async function handleChange(uri) {
  //   let uploadResponse, uploadResult;

  //   try {
  //       uploadResponse = await uploadImageAsync(uri);
  //       if (uploadResponse.status === 200) {
  //         alert("Foto alterada com sucesso");

  //     }
  //   } catch (e) {
  //     console.log({ uploadResponse });
  //     console.log(e);
  //     alert("Erro ao salvar imagem no banco de dados:(");
  //   }
  // }

  async function handleChange(uri) {
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();

    formData.append("userphoto", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("id", userId);
    formData.append("changedPhoto", changedPhoto);

    let options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return await api.put("/user", formData, options);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: avatar.includes('file://') ? `${avatar}` : `${apiBase}${avatar}`,
          }}
          style={styles.userAvatar}
        />
        <TouchableOpacity onPress={() => _pickImage()}>
          <Text style={styles.changePic}>Mudar foto</Text>
        </TouchableOpacity>
          <Text style={styles.name}>{first_name} {last_name}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome</Text>
        <TextInput
          value={first_name}
          placeholder="Ex: João"
          onChangeText={txt => setFirst_name(txt)}
          style={styles.inputText} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Sobrenome</Text>
        <TextInput
          value={last_name}
          placeholder="Ex: Silva"
          onChangeText={txt => setLast_name(txt)}
          style={styles.inputText} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-Mail</Text>
        <TextInput
          value={email}
          placeholder="Ex: email@email.com"
          onChangeText={txt => setEmail(txt)}
          style={styles.inputText} />
      </View>

      <TouchableOpacity
        onPress={() => handleChange(avatar)}
        disabled={avatar.includes('file://') ? false : true}
      >
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
    </ScrollView>
  );
}
