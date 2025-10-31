import React, { useState } from "react";
import {View,Text,TextInput, TouchableOpacity, StyleSheet, Alert,} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebaseconfig";

const Login = ({ onLoginSuccess }) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor complete ambos campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(); // Notifica que el login fue exitoso
    } catch (error) {
      let mensaje = "";

      if (error.code === "auth/invalid-email") {
        mensaje = "Correo inválido.";

      }
       else if (error.code === "auth/user-not-found") {
        mensaje = "Usuario no encontrado.";
      } else if (error.code === "auth/wrong-password") {
        mensaje = "Contraseña incorrecta.";
      } else {
        mensaje = "Error al iniciar sesión.";
      }

      Alert.alert("Error", mensaje);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={manejLogin}>
        <Text style={styles.textoBoton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  boton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
