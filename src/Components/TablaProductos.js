// TablaProductos.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonEliminarProducto from "./BotonEliminarProducto";
import BotonEditarProducto from "./BotonEditarProducto";

const TablaProductos = ({ productos, eliminarProducto, cargarDatos }) => {
  return (
    <View style={style.container}>
      <Text style={style.titulo}>Tabla de Productos</Text>

      {/* Encabezado */}
      <View style={[style.fila, style.encabezado]}>
        <Text style={[style.celda, style.TextoEncabezado]}>Nombre</Text>
        <Text style={[style.celda, style.TextoEncabezado]}>Precio</Text>
        <Text style={[style.celda, style.TextoEncabezado]}>Acciones</Text>
      </View>

      {/* Filas de productos */}
      <ScrollView>
        {productos.map((item) => (
          <View key={item.id} style={style.fila}>
            <Text style={style.celda}>{item.nombre}</Text>
            <Text style={style.celda}>{item.precio}</Text>
            <View style={style.celdaAcciones}>
              {/* Botón Editar */}
              <BotonEditarProducto producto={item} cargarDatos={cargarDatos} />
              {/* Botón Eliminar */}
              <BotonEliminarProducto id={item.id} eliminarProducto={eliminarProducto} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View> 
  );
};




const style = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  fila: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: 6, alignItems: "center" },
  encabezado: { backgroundColor: "#f0f0f0" },
  celda: { flex: 1, fontSize: 16, textAlign: "center" },
  celdaAcciones: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
});

export default TablaProductos;
