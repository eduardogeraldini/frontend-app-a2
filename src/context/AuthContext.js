import React, { createContext, useState } from "react";

import { Alert } from "react-native";

import api from "../services/api";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  async function handleLogin(email, password) {
    setLoadingAuth(true);

    try {
      const { data, status } = await api.post("/login", {
        email,
        password,
      });

      if (data && status == 200) {
        setAuthenticated(true);
        setUserId(data[0].id);
      }
    } catch (error) {
      setAuthenticated(false);

      Alert.alert(
        "Ocorreu um erro!",
        "Não foi possível autenticar-se. Verifique seus dados."
      );
    } finally {
      setLoadingAuth(false);
    }
  }

  async function handleCreate(uri, firstName, lastName, email, password) {
    setLoadingCreate(true);

    
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();

    formData.append("userphoto", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("first_name",firstName);
    formData.append("last_name",lastName);
    formData.append("email", email);
    formData.append("password", password);

    let options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await api.post("/users", formData, options);
    
    setAuthenticated(true);
    setUserId(response.data[0]);

    setLoadingCreate(false);

    return response;
  }

  function handleLogout() {
    setAuthenticated(false);
  }

  return (
    <Context.Provider
      value={{ authenticated, handleLogin, handleCreate, handleLogout, loadingAuth, loadingCreate, userId }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
