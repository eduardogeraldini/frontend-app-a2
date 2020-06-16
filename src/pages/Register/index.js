import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { Context } from "../../context/AuthContext";

import styles from "./styles";

export default function Register() {
  const navigation = useNavigation();

  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleCreate, loadingCreate } = useContext(Context);

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
  
  const toAuth = () => {
    navigation.navigate("Auth");
  };
  
  if (loadingCreate) {
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
    <View style={styles.container}>
      <View style={styles.ImgView}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode="contain"
          style={{ width: 300, height: 60 }}
        />
      </View>
      <View style={styles.InputsView}>

        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => _pickImage()}>
            <Image
              source={{
                uri: avatar.includes('file://') ? `${avatar}` : `https://static.thenounproject.com/png/212328-200.png`,
              }}
              style={styles.userAvatar}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Seu primeiro nome"
          style={styles.txtInput}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          placeholder="Seu último nome"
          style={styles.txtInput}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          placeholder="Seu email"
          keyboardType="email-address"
          textContentType="emailAddress"
          style={styles.txtInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Sua senha"
          secureTextEntry
          style={styles.txtInput}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.InputsBtns}>
        <TouchableOpacity
          onPress={() => handleCreate(avatar, firstName, lastName, email, password)}
          style={styles.signInBtn}
        >
          <Text style={styles.btnTxt}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toAuth} style={styles.signUpBtn}>
          <Text style={styles.btnTxt}>Autenticar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
