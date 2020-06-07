import React, { createContext, useState } from "react";

import { Alert } from "react-native";

import api from "../services/api";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

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

  function handleLogout() {
    setAuthenticated(false);
  }

  return (
    <Context.Provider
      value={{ authenticated, handleLogin, handleLogout, loadingAuth, userId }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
