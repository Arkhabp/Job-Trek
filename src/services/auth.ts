import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = (email: any, password: any) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert("User account created & signed in!");
    })
    .catch((error: any) => {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        Alert.alert("That email address is invalid!");
      }

      console.error(error);
    });
};

export const login = async (email: any, password: any) => {
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
};

export const logout = async () => {
  try {
    await auth().signOut();
    console.log("User signed out!");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
