import { types } from "../../../constans/application.constan";
import { ToastAndroid, Alert, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UpdateData {
  calendarDate: string;
  progress: string;
  selectedStatus: number;
}
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
