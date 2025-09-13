import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "./src/database/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Función para obtener productos y sus subcolecciones
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const data = querySnapshot.docs.map(async (doc) => {
          const productoData = { id: doc.id, ...doc.data() };
          // Subcolecciones, por ejemplo "sabores"
          const saboresSnapshot = await getDocs(collection(db, `productos/${doc.id}/sabores`));
          productoData.sabores = saboresSnapshot.docs.map(subDoc => ({
            id: subDoc.id,
            ...subDoc.data(),
          }));
          return productoData;
        });
        const productosConSabores = await Promise.all(data);
        setProductos(productosConSabores);
      } catch (error) {
        console.error("Error al obtener productos: ", error);
      }
    };

    // Función para obtener clientes
    const fetchClientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Clientes"));
        const clientesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientes(clientesData);
      } catch (error) {
        console.error("Error al obtener clientes: ", error);
      }
    };

    fetchProductos();
    fetchClientes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre} - ${item.precio}</Text>
            {item.sabores && item.sabores.length > 0 && (
              <FlatList
                data={item.sabores}
                keyExtractor={(subItem) => subItem.id}
                renderItem={({ item: subItem }) => (
                  <Text style={styles.subItem}> - {subItem.sabor}</Text>
                )}
              />
            )}
          </View>
        )}
      />

      <Text style={[styles.titulo, { marginTop: 20 }]}>Lista de Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre} - {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { marginBottom: 15 },
  subItem: { fontSize: 16, marginLeft: 20 },
});
