import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Importa tus pantallas
import RegistroScreen from "./screens/RegistroScreen";
import AgregarProductoScreen from "./screens/AgregarProductoScreen";
import ListaInventarioScreen from "./screens/ListaInventarioScreen";

// -------------------------
// Pantalla Login
// -------------------------
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Iniciar sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Inventario");
    } catch (error) {
      Alert.alert("Error al iniciar sesión", error.message);
    }
  };

  
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registro exitoso ✅", "Tu cuenta fue creada con éxito");
    } catch (error) {
      Alert.alert("Error al registrarse", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Iniciar Sesión
      </Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 15,
        }}
      />

      <Text>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      <Button title="Ingresar" onPress={handleLogin} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Registro")}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: "center", color: "blue" }}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// -------------------------
// Stack Navigator principal
// -------------------------
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Inventario" component={ListaInventarioScreen} />
        <Stack.Screen
          name="AgregarProducto"
          component={AgregarProductoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
