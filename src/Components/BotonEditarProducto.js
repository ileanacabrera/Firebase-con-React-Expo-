// BotonEditarProducto.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebaseconfig";

const BotonEditarProducto = ({ producto, cargarDatos }) => {
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio.toString());

  const confirmarEditar = async () => {
    try {
      const docRef = doc(db, "productos", producto.id);
      await updateDoc(docRef, {
        nombre,
        precio: parseFloat(precio),
      });
      cargarDatos();
      setVisible(false);
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.boton} onPress={() => setVisible(true)}>
        <Text style={styles.textoBoton}>✏️</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.titulo}>Editar Producto</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={precio}
              keyboardType="numeric"
              onChangeText={setPrecio}
            />

            <View style={styles.fila}>
              <TouchableOpacity style={[styles.botonAccion, styles.cancelar]} onPress={() => setVisible(false)}>
                <Text style={styles.textoAccion}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botonAccion, styles.confirmar]} onPress={confirmarEditar}>
                <Text style={styles.textoAccion}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: { padding: 4, borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: "#ffba08", marginHorizontal: 4 },
  textoBoton: { color: "white", fontSize: 14, fontWeight: "bold" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginBottom: 10 },
  fila: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  botonAccion: { flex: 1, marginHorizontal: 5, padding: 10, borderRadius: 5, alignItems: "center" },
  cancelar: { backgroundColor: "#ccc" },
  confirmar: { backgroundColor: "#3f37ff" },
  textoAccion: { color: "white", fontWeight: "bold" },
});

export default BotonEditarProducto;
