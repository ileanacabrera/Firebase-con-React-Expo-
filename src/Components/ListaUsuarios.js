// ListaUsuarios.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ListaUsuarios = ({ usuarios }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>
              <Text style={styles.label}>Nombre:</Text> {item.nombre}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.label}>Correo:</Text> {item.correo}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.label}>Teléfono:</Text> {item.telefono}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.label}>Edad:</Text> {item.edad}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  item: { fontSize: 16, marginBottom: 3 },
  label: { fontWeight: "bold" },
});

export default ListaUsuarios;
