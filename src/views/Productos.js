import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native"; 
import { db } from "../database/firebaseconfig";
import { 
  collection, 
  getDocs, 
  doc, 
  deleteDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';

import TablaProductos from "../Components/TablaProductos";
import ListaProductos from "../Components/ListaProductos";
import FormularioProductos from "../Components/FormularioProductos";

const Productos = ({ cerrarSesion }) => { 
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoId, setProductoId] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
  });

 
  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos")); 
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
      console.log("Productos traídos:", data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  // Eliminar producto por id
  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      cargarDatos(); // recargar productos
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const manejoCambio = (nombre, valor) => {
     setNuevoProducto((prev) => ({
      ...prev,
      [nombre]: valor,
    }));
  };
  const guardarProducto = () => { /* Lógica de guardar */ cargarDatos(); };
  const actualizarProducto = () => { /* Lógica de actualizar */ cargarDatos(); };
  const editarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
    });
    setProductoId(producto.id);
    setModoEdicion(true);
  };

  

  const pruebaConsulta1 = async () => {
    try {
      
      const q = query(
        collection(db, "ciudades"), 
        where("pais", "==", "Guatemala"),
        orderBy("poblacion", "desc"),
        limit(2)
      );
      const snapshot = await getDocs(q);
      
      console.log("---------- Consulta 1 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
  
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 1:", error);
      Alert.alert("Error de Consulta", "Verifica si la colección 'ciudades' existe o si necesitas un índice en Firestore.");
    }
  };


  useEffect(() => {
    cargarDatos();
    pruebaConsulta1(); 
  }, []);



  return (
    <View style={styles.container}>
      {/* Botón de cerrar sesión encima del formulario */}
      <Button title="Cerrar Sesión" onPress={cerrarSesion} />

      {/* Formulario para agregar/editar productos */}
      <FormularioProductos 
        nuevoProducto={nuevoProducto}
        manejoCambio={manejoCambio}
        guardarProducto={guardarProducto}
        actualizarProducto={actualizarProducto}
        modoEdicion={modoEdicion}
      />

      {/* Lista de productos simple */}
      <ListaProductos productos={productos} eliminarProducto={eliminarProducto} />

      {/* Tabla de productos con botón de eliminar */}
      <TablaProductos
        productos={productos}
        eliminarProducto={eliminarProducto}
        editarProducto={editarProducto} // Añadido para completar la funcionalidad
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
});

export default Productos;