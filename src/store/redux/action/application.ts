import { Alert } from "react-native";
import { types } from "../../../constans/application.constan";
import { editDataProps, UpdateData } from "./types.props.action";
import { NavigationProp } from "@react-navigation/native";

export function handleUpdateApplication(data: UpdateData) {
  return async (dispatch: any) => {
    dispatch({ type: types.UPDATE_APPLICATION_REQUEST });
    try {
      dispatch({
        type: types.UPDATE_APPLICATION_SUCCESS,
        payload: {
          data
        }
      });
      console.log("Data Update:", data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleEditApplication(data: editDataProps, navigation: any) {
  return async (dispatch: any) => {
    dispatch({ type: types.UPDATE_APPLICATION_REQUEST });
    try {
      dispatch({
        type: types.UPDATE_APPLICATION_SUCCESS,
        payload: {
          data
        }
      });
      console.log("Data Update:", data);
      Alert.alert("Data Was Edited");
      navigation.goBack();
    } catch (error) {
      dispatch({ type: types.UPDATE_APPLICATION_FAILED });
      console.log(error);
    }
  };
}
export function handleDeleteApplication(data: editDataProps, navigation: any) {
  return async (dispatch: any) => {
    dispatch({ type: types.DELETE_APPLICATION_REQUEST });
    try {
      dispatch({
        type: types.DELETE_APPLICATION_SUCCESS,
        payload: {
          data
        }
      });
      console.log("Data Delete:", data);
      Alert.alert("Data Was Deleted");
      navigation.goBack();
    } catch (error) {
      dispatch({ type: types.DELETE_APPLICATION_FAILED });
      console.log(error);
    }
  };
}
