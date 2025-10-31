// TablaUsuarios.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonEliminarUsuario from "./BotonElimnarUsuario";


const TablaUsuarios = ({ usuarios, eliminarUsuario, cargarDatos }) => {
  return (
    <View style={style.container}>
      <Text style={style.titulo}>Tabla de Usuarios</Text>

      {/* Encabezado */}
      <View style={[style.fila, style.encabezado]}>
        <Text style={[style.celda, style.TextoEncabezado]}>Nombre</Text>
        <Text style={[style.celda, style.TextoEncabezado]}>Correo</Text>
        <Text style={[style.celda, style.TextoEncabezado]}>Edad</Text>
          <Text style={[style.celda, style.TextoEncabezado]}>Telefono</Text>
        <Text style={[style.celda, style.TextoEncabezado]}>Acciones</Text>
      </View>

      {/* Filas de usuarios */}
      <ScrollView>
        {usuarios.map((item) => (
          <View key={item.id} style={style.fila}>
            <Text style={style.celda}>{item.nombre}</Text>
            <Text style={style.celda}>{item.correo}</Text>
            <Text style={style.celda}>{item.edad}</Text>
            <Text style={style.celda}>{item.telefono}</Text>
            <View style={style.celdaAcciones}>
             
              {/* Botón Eliminar */}
              <BotonEliminarUsuario id={item.id} eliminarUsuario={eliminarUsuario} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    alignItems: "center",
  },
  encabezado: { backgroundColor: "#f0f0f0" },
  celda: { flex: 1, fontSize: 16, textAlign: "center" },
  celdaAcciones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

export default TablaUsuarios;
