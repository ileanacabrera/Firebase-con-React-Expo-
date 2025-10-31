// FormularioUsuarios.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioUsuarios = ({ cargarDatos }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  const guardarUsuario = async () => {
    if (nombre && correo && telefono && edad) {
      try {
        await addDoc(collection(db, "usuarios"), {
          nombre,
          correo,
          telefono,
          edad: parseInt(edad),
        });

        // Limpiar los campos después de guardar
        setNombre("");
        setCorreo("");
        setTelefono("");
        setEdad("");

        // Recargar datos si existe la función
        if (cargarDatos) cargarDatos();

        alert("Usuario registrado con éxito");
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Ocurrió un error al guardar el usuario");
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Usuarios</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del usuario"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <Button title="Guardar Usuario" onPress={guardarUsuario} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default FormularioUsuarios;
