import { types } from "../../../constans/auth.constan";

// Definisikan tipe state
interface AuthState {
  signIn: {
    token: string | undefined;
    error: string | null;
    isLoading: boolean;
  };
  signUp: {
    data: boolean;
    error: string | null;
    isLoading: boolean;
  };
}

// Inisialisasi state awal
const initialState: AuthState = {
  signIn: {
    token: undefined,
    error: null,
    isLoading: false
  },
  signUp: {
    data: false,
    error: null,
    isLoading: false
  }
};
// Reducer untuk mengelola state autentikasi
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        signIn: {
          token: undefined,
          isLoading: true, // Menandakan bahwa proses login sedang berlangsung
          error: null // Menghapus pesan kesalahan
        }
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        signIn: {
          token: action.payload, // Memperbarui informasi pengguna setelah berhasil login
          error: null, // Menghapus pesan kesalahan
          isLoading: false // Menandakan bahwa proses login selesai
        }
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        signIn: {
          token: undefined,
          error: action.payload, // Menyimpan pesan kesalahan saat login gagal
          isLoading: false // Menandakan bahwa proses login gagal
        }
      };
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        signUp: {
          isLoading: true,
          error: null,
          data: false
        }
      };
    case types.SIGNUP_SUCCESS: {
      return {
        ...state,
        signUp: {
          data: action.payload,
          isLoading: false,
          error: null
        }
      };
    }
    case types.SIGNUP_FAILED: {
      return {
        ...state,
        signUp: {
          error: action.payload,
          isLoading: false,
          data: false
        }
      };
    }
    case types.LOGOUT:
      return {
        ...state,
        signIn: {
          token: null, // Menghapus informasi pengguna saat logout
          error: null
        }
      };
    default:
      return state;
  }
};

export default authReducer;
