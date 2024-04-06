import auth from "@react-native-firebase/auth";
import { types } from "../../../constans/auth.constan";
import { ToastAndroid, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../../../store";
import * as Burnt from "burnt";

// const dispatch = useDispatch();
export function handleLogin(email: string, password: any) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Check if the user's email is verified
      if (!userCredential.user?.emailVerified) {
        dispatch({
          type: types.LOGIN_FAILED,
          payload: "Email is not verified"
        });
        Alert.alert("Please verify your email before logging in!");
        return;
      }
      // Dispatch the action with the token
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: token
      });

      // Optionally, you can store the token in AsyncStorage here
      AsyncStorage.setItem("@token", token);
      AsyncStorage.setItem("@displayName", user.displayName || "");
      AsyncStorage.setItem("@email", user.displayName || "");

      ToastAndroid.show("Login succesed !", ToastAndroid.SHORT);

      // Return the user
      return user;
    } catch (error: any) {
      console.log(error.message);
      // You can dispatch an action for login failure here if needed
      dispatch({ type: types.LOGIN_FAILED, payload: error.message });
      // ToastAndroid.show("Login failed !", ToastAndroid.SHORT);
      Burnt.toast({
        title: "Login failed !",
        preset: "error",
        message: "Login failed !",
        haptic: "warning",
        shouldDismissByDrag: true,
        from: "top"
      });

      // Return null in case of error
      return null;
    }
  };
}

export const handleSignup = (email: string, password: string, name: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: types.SIGNUP_REQUEST });
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      // Send email verification
      await userCredential.user?.sendEmailVerification();

      // Update user profile
      await auth().currentUser?.updateProfile({
        displayName: name
      });

      Alert.alert(
        "User account created. Please check your email for verification!"
      );

      const userData = { email: email, name: name };
      dispatch({ type: types.SIGNUP_SUCCESS, payload: true });
    } catch (error: any) {
      dispatch({
        type: types.SIGNUP_FAILED,
        payload: error.message.toString()
      });

      if (error.code === "auth/email-already-in-use") {
        Alert.alert("That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("That email address is invalid!");
      } else {
        Alert.alert("Error occurred during signup!");
      }
    }
  };
};

export function handleSignOut() {
  return async (dispatch: any) => {
    try {
      auth().signOut();
      ToastAndroid.show("Logout success!", ToastAndroid.SHORT);
      dispatch({ type: types.LOGOUT });
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
}

export const loginSuccess = (token: string) => {
  // Simpan token ke AsyncStorage untuk menjaga status login
  AsyncStorage.setItem("@token", token);

  // Dispatch action untuk menyimpan token ke Redux state
  return { type: types.LOGIN_SUCCESS, payload: { token } };
};
