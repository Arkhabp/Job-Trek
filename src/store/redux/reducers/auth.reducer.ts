import { types } from "../../../constans/auth.constan";

// Definisikan tipe state
interface AuthState {
  signIn: {
    token: string | null;
    error: string | null;
    isLoading: boolean;
  };
  signUp: {
    data: any;
    error: string | null;
    isLoading: boolean;
  };
}

// Inisialisasi state awal
const initialState: AuthState = {
  signIn: {
    token: null,
    error: null,
    isLoading: false
  },
  signUp: {
    data: null,
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
          error: action.payload, // Menyimpan pesan kesalahan saat login gagal
          isLoading: false // Menandakan bahwa proses login gagal
        }
      };
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        signUp: {
          isLoading: true,
          error: null
        }
      };
    case types.SIGNUP_SUCCESS: {
      return {
        ...state,
        signUp: {
          data: action.payload,
          isLoading: false
        }
      };
    }
    case types.SIGNUP_FAILED: {
      return {
        ...state,
        signUp: {
          error: action.payload,
          isLoading: false
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
