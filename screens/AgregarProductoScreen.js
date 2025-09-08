import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AgregarProductoScreen() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAgregarProducto = async () => {
    if (!nombre || !codigo || !cantidad) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const producto = {
        nombre,
        codigo,
        cantidad: parseInt(cantidad),
        fechaAlta: serverTimestamp(),
      };

      console.log("📌 Guardando producto:", producto);

      await addDoc(collection(db, "productos"), producto);

      Alert.alert("Éxito", "Producto agregado correctamente");

      // Limpiar campos
      setNombre("");
      setCodigo("");
      setCantidad("");
    } catch (error) {
      console.log("❌ Error en agregar producto:", error);
      Alert.alert("Error", error.message || "Ocurrió un error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>

      <Text>Nombre</Text>
      <TextInput value={nombre} onChangeText={setNombre} style={styles.input} placeholder="Nombre del producto" />

      <Text>Código</Text>
      <TextInput value={codigo} onChangeText={setCodigo} style={styles.input} placeholder="Código del producto" />

      <Text>Cantidad</Text>
      <TextInput value={cantidad} onChangeText={setCantidad} keyboardType="numeric" style={styles.input} placeholder="Cantidad" />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
      ) : (
        <Button title="Agregar Producto" onPress={handleAgregarProducto} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 },
});
