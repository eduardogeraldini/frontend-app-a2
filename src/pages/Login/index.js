import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";

import { Context } from "../../context/AuthContext";

import styles from "./styles";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loadingAuth } = useContext(Context);

  const toRegister = () => {
    navigation.navigate("Register");
  };
  
  if (loadingAuth) {
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
          onPress={() => handleLogin(email, password)}
          style={styles.signInBtn}
        >
          <Text style={styles.btnTxt}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toRegister} style={styles.signUpBtn}>
          <Text style={styles.btnTxt}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
