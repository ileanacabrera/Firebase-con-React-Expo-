// Promedios.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, getDocs, deleteDoc,doc } from "firebase/firestore";
import FormularioPromedio from "../Components/FormularioPromedio";
import TituloPromedio from "../Components/Titulopromedio";
import TablaEdad from "../Components/TablaEdad";


const Edad = () => {
    const [Edad, setEdad] = React.useState([]);
    const [promedio,setPromedio]=useState(null);    

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Clientes"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setEdad(data);
        } catch (error) {
            console.error("Error al cargar los los clientes:", error);
        }
    };

    const BotonEliminarPromedios= async (id) => {
        try {
            await deleteDoc(doc(db, "Clientes", id));
            cargarDatos();
        } catch (error) {
            console.error("Error al  intentar eliminar el cliente:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioPromedio cargarDatos={cargarDatos} />
             <TituloPromedio promedio={promedio} />
            <TablaEdad
            Edad={Edad}
             eliminarPromedios={BotonEliminarPromedios} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Edad;




