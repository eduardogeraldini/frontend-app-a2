import React, { createContext, useState } from "react";

import api from "../services/api";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  async function handleLogin(email, password) {
    try {
      const { data, status } = await api.post("/login", {
        email,
        password,
      });

      if (data && status == 200) {
        setAuthenticated(true);
        setUserId(data[0].id)
      }
    } catch (error) {
      setAuthenticated(false);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout, userId }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
