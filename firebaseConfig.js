// Importa solo lo necesario
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDcErmgef5NeoguhIkKaAQY-zcTTK2RhX8",
  authDomain: "inventario-7644a.firebaseapp.com",
  projectId: "inventario-7644a",
  storageBucket: "inventario-7644a.appspot.com",
  messagingSenderId: "1035529045909",
  appId: "1:1035529045909:web:2bc0c22216df5d2116189c",
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Exporta la autenticación, la base de datos y el almacenamiento
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
