import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./src/database/firebaseconfig";
import Login from "./src/Components/Login";
import Productos from "./src/views/Productos";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  // Detecta si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  // Cierra sesión
  const cerrarSesion = async () => {
    await signOut(auth);
  };

  // Si no hay usuario, muestra el login
  if (!usuario) {
    return <Login onLoginSuccess={() => setUsuario(auth.currentUser)} />;
  }

  // Si hay usuario, muestra Productos
  return (
    <View style={{ flex: 1 }}>
      <Productos />

      <TouchableOpacity
        style={styles.botonCerrar}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoCerrar}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  botonCerrar: {
    padding: 10,
    backgroundColor: "#ff4444",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
  },
  textoCerrar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
