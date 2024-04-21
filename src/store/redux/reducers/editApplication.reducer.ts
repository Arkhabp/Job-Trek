import { types } from "../../../constans/editApplication.constan";

// Definisikan tipe state
interface onFocusState {
  data: boolean;
  error: string | null;
  isLoading: boolean;
}

// Inisialisasi state awal
const initialState: onFocusState = {
  data: false,
  error: null,
  isLoading: false
};

// Reducer untuk mengelola state autentikasi
const editApplicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ON_FOUCUS_STATE_TRUE:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: true
      };
    case types.ON_FOUCUS_STATE_FALSE:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: false
      };

    default:
      return state;
  }
};

export default editApplicationReducer;
