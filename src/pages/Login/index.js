import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import api from '../../services/api';


import styles from "./styles";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function handleLogin() {
    const { data, status } = await api.post('/login', {
        email,
        password
    })

    console.log(data)

  }

  return (
    <View style={styles.container}>
      <View style={styles.ImgView}>
        <Image source={require('../../assets/logo.png')} resizeMode='contain' style={{ width: 300, height: 60 }} />
      </View>
      <View style={styles.InputsView}>
        <TextInput
          placeholder='Seu email'
          keyboardType='email-address'
          textContentType='emailAddress'
          style={styles.txtInput}
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Sua senha'
          secureTextEntry
          style={styles.txtInput}
          onChangeText={text => setPassword(text)}
          value={password}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.InputsBtns}>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.signInBtn}
        >
          <Text style={styles.btnTxt}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => false}
          style={styles.signUpBtn}
        >
          <Text style={styles.btnTxt}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
