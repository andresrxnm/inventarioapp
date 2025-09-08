import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function ListaInventarioScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  const productosFiltrados = productos.filter(
    (item) =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
        📦 Inventario
      </Text>

      
      <TextInput
        placeholder="Buscar por nombre o código..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nombre}</Text>
            <Text>Código: {item.codigo}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
          </View>
        )}
      />

      
      <Button
        title="➕ Agregar Producto"
        onPress={() => navigation.navigate("AgregarProducto")}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="🚪 Cerrar Sesión" onPress={handleLogout} />
      </View>
    </View>
  );
}
