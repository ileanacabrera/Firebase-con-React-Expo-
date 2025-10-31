import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";



const validarDatos = async (datos) => {
  try {
    const response = await fetch("https://uf3xcktwy9.execute-api.us-east-1.amazonaws.com/validarusuarioo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const resultado = await response.json();

    if (resultado.success) {
      return resultado.data; // Datos limpios y validados
    } else {
      Alert.alert("Errores en los datos", resultado.errors.join("\n"));
      return null;
    }
  } catch (error) {
    console.error("Error al validar con Lambda:", error);
    Alert.alert("Error", "No se pudo validar la información con el servidor.");
    return null;
  }
};

const guardarUsuario = async () => {
  const datosValidados = await validarDatos(nuevoUsuario);
  if (datosValidados) {
    try {
      await addDoc(collection(db, "usuarios"), {
        nombre: datosValidados.nombre,
        correo: datosValidados.correo,
        telefono: datosValidados.telefono,
        edad: parseInt(datosValidados.edad),
      });
      cargarDatos();
      setNuevoUsuario({ nombre: "", correo: "", telefono: "", edad: "" });
      Alert.alert("Éxito", "Usuario registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  }
};

const actualizarUsuario = async () => {
  const datosValidados = await validarDatos(nuevoUsuario);
  if (datosValidados) {
    try {
      await updateDoc(doc(db, "usuarios", usuarioId), {
        nombre: datosValidados.nombre,
        correo: datosValidados.correo,
        telefono: datosValidados.telefono,
        edad: parseInt(datosValidados.edad),
      });

      setNuevoUsuario({ nombre: "", correo: "", telefono: "", edad: "" });
      setModoEdicion(false);
      setUsuarioId(null);
      cargarDatos();
      Alert.alert("Éxito", "Usuario actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  }
};
