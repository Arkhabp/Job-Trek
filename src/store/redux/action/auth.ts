import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function handleLogin(email: string, password: any) {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    const token = await user.getIdToken();

    // Lakukan sesuatu dengan token
    console.log("User token:", token);
    AsyncStorage.setItem("USER_TOKEN", token);
    console.log(user);
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
}
